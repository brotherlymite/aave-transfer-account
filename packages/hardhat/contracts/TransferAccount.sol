// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.1;

import "./aave/FlashLoanReceiverBaseV2.sol";
import "./../interfaces/ILendingPoolAddressesProviderV2.sol";
import "./../interfaces/ILendingPoolV2.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TransferAccount is FlashLoanReceiverBaseV2, Withdrawable {
    using SafeMath for uint256;
    constructor(address _addressProvider)
        FlashLoanReceiverBaseV2(_addressProvider)
    {}

    /**
     * @dev This function must be called only be the LENDING_POOL and takes care of repaying
     * active debt positions, migrating collateral and incurring new V2 debt token debt.
     *
     * @param assets The array of flash loaned assets used to repay debts.
     * @param amounts The array of flash loaned asset amounts used to repay debts.
     * @param premiums The array of premiums incurred as additional debts.
     * @param initiator The address that initiated the flash loan, unused.
     * @param params The byte array containing, in this case, the arrays of aTokens and aTokenAmounts.
     */
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {

        // Approve and Repay 500 DAI loan of Account 1
        IERC20(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD).approve(address(LENDING_POOL), 500 ether);
        LENDING_POOL.repay(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD, 500 ether, 1, 0xA72967b831d637617c728a057682b1436eba19F8);

        // aBTC Balance
        uint256 balance = IERC20(0x62538022242513971478fcC7Fb27ae304AB5C29F).balanceOf(0xA72967b831d637617c728a057682b1436eba19F8);
        
        // Transfer aBTC from Account 1 to Account 2
        IERC20(0x62538022242513971478fcC7Fb27ae304AB5C29F).transferFrom(0xA72967b831d637617c728a057682b1436eba19F8, 0x946037d2E4225C74443e0220B390EacaCC64EA89, balance);

        // Contract Borrowing 500 DAI + premiums to pay the flash loan fees 
        uint256 borrowAmount = 500 ether;
        borrowAmount = borrowAmount.add(premiums[0]);
        LENDING_POOL.borrow(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD, borrowAmount, 1, 0, 0x946037d2E4225C74443e0220B390EacaCC64EA89);

        // Approve the LendingPool contract allowance to *pull* the owed amount
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }

        return true;
    }

    function _flashloan(address[] memory assets, uint256[] memory amounts)
        internal
    {
        address receiverAddress = address(this);

        address onBehalfOf = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        uint256[] memory modes = new uint256[](assets.length);

        // 0 = no debt (flash), 1 = stable, 2 = variable
        for (uint256 i = 0; i < assets.length; i++) {
            modes[i] = 0;
        }

        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );
    }

    /*
     *  Flash multiple assets
     */
    function flashloan(address[] memory assets, uint256[] memory amounts)
        public onlyOwner
    {
        _flashloan(assets, amounts);
    }

    /*
     *  Flash loan 100000000000000000 wei (0.1 ether) worth of `_asset`
     */
    function flashloan(address _asset) public onlyOwner {
        // bytes memory data = "";
        uint256 amount = 100000000000000000;

        address[] memory assets = new address[](1);
        assets[0] = _asset;

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;

        _flashloan(assets, amounts);
    }

    function transferAccount() public onlyOwner {
        address[] memory assets = new address[](1);
        assets[0] = 0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD;

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 500 ether;
        _flashloan(assets, amounts);
    }
}