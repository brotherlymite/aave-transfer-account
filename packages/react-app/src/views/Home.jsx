import { ethers } from "ethers";
import React, { useEffect } from "react";
import { Steps, Button, Divider, Row, Col, Typography } from 'antd';
import { Contract, Provider } from 'ethers-multicall';
import { Transactor } from "../helpers";
import { TOKEN_LIST, CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { CheckOutlined, RedoOutlined } from "@ant-design/icons";
const { Step } = Steps;
const { Title } = Typography;

function Home({ userSigner, provider, gasPrice }) {

  const [current, setCurrent] = React.useState(0);
  const [latestAddress, setLatestAddress] = React.useState();
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [aTokenBalances, setATokenBalances] = React.useState([{}]);
  const [stableDebtBalances, setStableDebtBalances] = React.useState([{}]);
  const [variableDebtBalances, setVariableDebtBalances] = React.useState([{}]);

  const [flag, setFlag] = React.useState(false);
  const [updateATokenAllowancesFlag, setUpdateATokenAllowancesFlag] = React.useState(false);
  const [updateStableDebtAllowancesFlag, setUpdateStableDebtAllowancesFlag] = React.useState(false);
  const [updateVariableDebtAllowancesFlag, setUpdateVariableDebtAllowancesFlag] = React.useState(false); 

  async function approveToken(tokenAddress, amount, spender) {
    const tokenAbi = [
    'function approve(address spender, uint256 amount)'
    ];
    const contract = new ethers.Contract(tokenAddress, tokenAbi, userSigner);
    const params = [spender, amount];
    const action = 'approve';
    const unsignedRawTx = await contract.populateTransaction[action](...params);
    console.log('approve unsignedRawTx: ', unsignedRawTx);
    const tx = Transactor(provider, gasPrice);
    tx(unsignedRawTx, await updateATokenAllowances(address1));
  }

  async function approveDelegationToken(tokenAddress, amount, delegatee) {
    const tokenAbi = [
    'function approveDelegation(address delegatee, uint256 amount)'
    ];
    let amountInBigNumber = ethers.BigNumber.from(amount);
    if(amountInBigNumber.lte(100)) {
      amountInBigNumber = amountInBigNumber.mul(2);
    } else {
      amountInBigNumber = amountInBigNumber.add(amountInBigNumber.div(20));
    }
    const contract = new ethers.Contract(tokenAddress, tokenAbi, userSigner);
    const params = [delegatee, amountInBigNumber.toString()];
    const action = 'approveDelegation';
    const unsignedRawTx = await contract.populateTransaction[action](...params);
    console.log('approveDelegation unsignedRawTx: ', unsignedRawTx);
    const tx = Transactor(provider, gasPrice);
    tx(unsignedRawTx);
  }

  async function getATokenBalances(address1) {
    const ethcallProvider = new Provider(provider, 42);
    const erc20Abi = [
      'function balanceOf(address account) view returns (uint256)'
    ];
    let callList = [];
    const aTokenList = [];
    for (let i=0; i< TOKEN_LIST.length; i++) {
      aTokenList.push(TOKEN_LIST[i].aTokenAddress);
    }

    for (let i=0; i<aTokenList.length; i++) {
      const tokenContract = new Contract(aTokenList[i], erc20Abi);
      const tokenBalanceCall = tokenContract.balanceOf(address1);
      callList.push(tokenBalanceCall);
    }
    const aTokenBalancesHex = await ethcallProvider.all(callList);

    const aTokenBalancesList = [];
    for(let i=0; i< aTokenBalancesHex.length; i++) {
      if(!aTokenBalancesHex[i].eq(0)) {
        let newBalance = ethers.BigNumber.from(aTokenBalancesHex[i]);
        if (newBalance.lt(100000)) {
          console.log('Balance too low to be stored');
          newBalance = ethers.BigNumber.from('0');
        } else {
          newBalance = newBalance.sub(newBalance.div(100000));
        }

        aTokenBalancesList.push({
          'Symbol': 'a'+ TOKEN_LIST[i].symbol,
          'ContractAddress': TOKEN_LIST[i].aTokenAddress,
          'tokenAddress': TOKEN_LIST[i].tokenAddress,
          'Balance': newBalance.toString(),
          'Allowance': undefined,
          'balanceInTokenDecimals': ethers.utils.formatUnits(newBalance, TOKEN_LIST[i].decimals)
        });
      }
    }
    console.log('aTokenBalances: ', aTokenBalancesList);
    setATokenBalances(aTokenBalancesList);
  }

  async function getStableDebtBalances(address1) {
    const ethcallProvider = new Provider(provider, 42);
    const erc20Abi = [
      'function balanceOf(address account) view returns (uint256)'
    ];
    let callList = [];
    const stableDebtList = [];
    for (let i=0; i< TOKEN_LIST.length; i++) {
      stableDebtList.push(TOKEN_LIST[i].stableDebtTokenAddress);
    }

    for (let i=0; i<stableDebtList.length; i++) {
      const tokenContract = new Contract(stableDebtList[i], erc20Abi);
      const tokenBalanceCall = tokenContract.balanceOf(address1);
      callList.push(tokenBalanceCall);
    }
    const stableDebtBalancesHex = await ethcallProvider.all(callList);

    const stableDebtBalancesList = [];
    for(let i=0; i< stableDebtBalancesHex.length; i++) {
      if(!stableDebtBalancesHex[i].eq(0)) {
        stableDebtBalancesList.push({
          'Symbol': 'stableDebt'+ TOKEN_LIST[i].symbol,
          'ContractAddress': TOKEN_LIST[i].stableDebtTokenAddress,
          'tokenAddress': TOKEN_LIST[i].tokenAddress,
          'Balance': stableDebtBalancesHex[i].toString(),
          'borrowAllowance': undefined,
          'balanceInTokenDecimals': ethers.utils.formatUnits(stableDebtBalancesHex[i], TOKEN_LIST[i].decimals)
        });
      }
    }
    console.log('stableDebtBalances: ', stableDebtBalancesList);
    setStableDebtBalances(stableDebtBalancesList);
  }

  async function getVariableDebtBalances(address1) {
    const ethcallProvider = new Provider(provider, 42);
    const erc20Abi = [
      'function balanceOf(address account) view returns (uint256)'
    ];
    let callList = [];
    const variableDebtList = [];
    for (let i=0; i< TOKEN_LIST.length; i++) {
      variableDebtList.push(TOKEN_LIST[i].variableDebtTokenAddress);
    }

    for (let i=0; i<variableDebtList.length; i++) {
      const tokenContract = new Contract(variableDebtList[i], erc20Abi);
      const tokenBalanceCall = tokenContract.balanceOf(address1);
      callList.push(tokenBalanceCall);
    }
    const variableDebtBalancesHex = await ethcallProvider.all(callList);

    const variableDebtBalancesList = [];
    for(let i=0; i< variableDebtBalancesHex.length; i++) {
      if(!variableDebtBalancesHex[i].eq(0)) {
        variableDebtBalancesList.push({
          'Symbol': 'variableDebt'+ TOKEN_LIST[i].symbol,
          'ContractAddress': TOKEN_LIST[i].variableDebtTokenAddress,
          'tokenAddress': TOKEN_LIST[i].tokenAddress,
          'Balance': variableDebtBalancesHex[i].toString(),
          'borrowAllowance': undefined,
          'balanceInTokenDecimals': ethers.utils.formatUnits(variableDebtBalancesHex[i], TOKEN_LIST[i].decimals)
        });
      }
    }
    console.log('variableDebtBalances: ', variableDebtBalancesList);
    setVariableDebtBalances(variableDebtBalancesList);
  }

  async function getAllBalances(address1) {
    await getATokenBalances(address1);
    await getStableDebtBalances(address1);
    await getVariableDebtBalances(address1);
  }

  async function getAddressAndBalances() {
    let address = await userSigner.getAddress();
    setAddress1(address);
    getAllBalances(address);
  }

  async function updateATokenAllowances(address1) {
    if (provider && aTokenBalances.length > 0 && userSigner) {
      provider = userSigner;
      const ethcallProvider = new Provider(provider, 42);
      const allowanceAbi = [
        'function allowance(address owner, address spender) view returns (uint256)'
      ];
      let callList = [];
      for (let i=0; i<aTokenBalances.length; i++) {
        const tokenContract = new Contract(aTokenBalances[i].ContractAddress, allowanceAbi);
        const tokenBalanceCall = tokenContract.allowance(address1, CONTRACT_ADDRESS);
        callList.push(tokenBalanceCall);
      }
      const resultList = await ethcallProvider.all(callList);
      const updatedATokenBalances = aTokenBalances;
      for(let i=0;i <resultList.length; i++) {
        updatedATokenBalances[i].Allowance = resultList[i].toString();
      }
      console.log('aToken allowances: ', updatedATokenBalances);
      setUpdateATokenAllowancesFlag(true);
      setATokenBalances([...updatedATokenBalances]);
    }
  }

  async function updateStableDebtAllowances(address2) {
    if (provider && stableDebtBalances.length > 0 && address2 !== '' && updateStableDebtAllowancesFlag===false) {
      console.log('updateStableDebtAllowances');
      const ethcallProvider = new Provider(provider, 42);
      const allowanceAbi = [
        'function borrowAllowance(address fromUser, address toUser) view returns (uint256)'
      ];
      let callList = [];
      for (let i=0; i<stableDebtBalances.length; i++) {
          const tokenContract = new Contract(stableDebtBalances[i].ContractAddress, allowanceAbi);
          const tokenBalanceCall = tokenContract.borrowAllowance(address2, CONTRACT_ADDRESS);
          callList.push(tokenBalanceCall);
      }
      const resultList = await ethcallProvider.all(callList);
      console.log('stableBorrowAllowance: ', resultList);
      const updatedStableDebtBalances = stableDebtBalances;
      for(let i=0;i <resultList.length; i++) {
        updatedStableDebtBalances[i].borrowAllowance = resultList[i].toString();
      }
      setUpdateStableDebtAllowancesFlag(true);
      setStableDebtBalances([...updatedStableDebtBalances]);
    }
  }

  async function updateVariableDebtAllowances(address2) {
    if (provider && variableDebtBalances.length > 0 && address2 !== '' && updateVariableDebtAllowancesFlag===false) {
      console.log('updateVariableDebtAllowances');
      const ethcallProvider = new Provider(provider, 42);
      const allowanceAbi = [
        'function borrowAllowance(address fromUser, address toUser) view returns (uint256)'
      ];
      let callList = [];
      for (let i=0; i<variableDebtBalances.length; i++) {
          const tokenContract = new Contract(variableDebtBalances[i].ContractAddress, allowanceAbi);
          const tokenBalanceCall = tokenContract.borrowAllowance(address2, CONTRACT_ADDRESS);
          callList.push(tokenBalanceCall);
      }
      const resultList = await ethcallProvider.all(callList);
      console.log('variableBorrowAllowance: ', resultList);
      const updatedVariableDebtBalances = variableDebtBalances;
      for(let i=0;i <resultList.length; i++) {
        updatedVariableDebtBalances[i].borrowAllowance = resultList[i].toString();
      }
      setUpdateVariableDebtAllowancesFlag(true);
      setVariableDebtBalances(updatedVariableDebtBalances);
    }
  }

  function checkATokensApprovalAndMoveToNextStep() {
    if (aTokenBalances.length > 0 && current === 1 && address1) {
      console.log('checkATokensApprovalAndMoveToNextStep');
      for (let i=0; i<aTokenBalances.length; i++) {
        if (aTokenBalances[i].Allowance === undefined) return;
        if (parseFloat(aTokenBalances[i].Allowance) < parseFloat(aTokenBalances[i].Balance)) {
          setCurrent(1);
          return;
        }
      }
      setCurrent(2);
    }
  }

  function checkDebtTokensApprovalAndMoveToNextStep() {
    console.log('checkDebtTokensApprovalAndMoveToNextStep');
    if ((stableDebtBalances.length > 0 || variableDebtBalances.length) > 0 && current===2) {
      if (stableDebtBalances.length > 0) {
        for (let i=0; i<stableDebtBalances.length; i++) {
          if (stableDebtBalances[i].borrowAllowance === undefined) return;
          if (parseFloat(stableDebtBalances[i].borrowAllowance) < parseFloat(stableDebtBalances[i].Balance)) {
            setCurrent(2);
            return;
          }
        }
      }
      if (variableDebtBalances.length > 0) {
        for (let i=0; i<variableDebtBalances.length; i++) {
          if (variableDebtBalances[i].borrowAllowance === undefined) return;
          if (parseFloat(variableDebtBalances[i].borrowAllowance) < parseFloat(variableDebtBalances[i].Balance)) {
            setCurrent(2);
            return;
          }
        }
      }
      setCurrent(3);
    }
  }

  async function checkForAddress2() {
    if (flag && userSigner) {
      const currentAddress = await userSigner.getAddress();
      if(currentAddress !== address1 && address1 !== '' && address1 && currentAddress) {
        console.log('currentAddress: ', currentAddress);
        console.log('address1: ', address1);
        setAddress2(currentAddress);
        updateStableDebtAllowances(currentAddress);
        updateVariableDebtAllowances(currentAddress);
      }
    }
  }

  async function refresh() {
    setUpdateStableDebtAllowancesFlag(false);
    setUpdateVariableDebtAllowancesFlag(false);
    await updateStableDebtAllowances(address2);
    await updateVariableDebtAllowances(address2);
    await checkDebtTokensApprovalAndMoveToNextStep();
  }

  async function executeTransfer() {
    const DebtTokenBalance = [];
    if ((variableDebtBalances.length > 0 || stableDebtBalances.length > 0) && variableDebtBalances.length > 0 && address1 !== '' && address2 !== '') {

      if (stableDebtBalances.length > 0) {
        for(let i=0;i<stableDebtBalances.length;i++) {
          const balance = {
            tokenAddress: stableDebtBalances[i].tokenAddress,
            stableDebtTokenBalance: stableDebtBalances[i].Balance,
            variableDebtTokenBalance: '0'
          }
          DebtTokenBalance.push(balance);
        }
      }

      if (variableDebtBalances.length > 0) {
  
        for(let i=0; i<variableDebtBalances.length; i++) {
          let isUpdated = false;
          for(let j=0; j<DebtTokenBalance.length; j++) {
            if(variableDebtBalances[i].tokenAddress === DebtTokenBalance[j].tokenAddress) {
              DebtTokenBalance[j].variableDebtTokenBalance = variableDebtBalances[i].Balance;
              isUpdated = true;
            }
          }
          if(isUpdated === false) {
            const balance = {
              tokenAddress: variableDebtBalances[i].tokenAddress,
              stableDebtTokenBalance: '0',
              variableDebtTokenBalance: variableDebtBalances[i].Balance
            }
            DebtTokenBalance.push(balance);
          }
        }
  
      }
      console.log('DebtTokenBalance:: ', DebtTokenBalance);
    }
    const ATokenBalance = [];
    for(let i=0; i<aTokenBalances.length; i++) {
      ATokenBalance.push({
        'Token': aTokenBalances[i].tokenAddress,
        'aTokenAddress': aTokenBalances[i].ContractAddress,
        'aTokenBalance': aTokenBalances[i].Balance,
      });
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, userSigner);
    const params = [address2, DebtTokenBalance, ATokenBalance];
    console.log('transferAccount params: ', params);
    const action = 'transferAccount';
    const unsignedRawTx = await contract.populateTransaction[action](...params);
    console.log('unsignedRawTx transferAccount: ', unsignedRawTx);
    const tx = Transactor(provider, gasPrice);
    tx(unsignedRawTx);
  }

  async function getLatestAddress() {
    const addr = await userSigner.getAddress();
    setLatestAddress(addr);
  }

  useEffect(() => {
    if(userSigner) {
      if (!flag) {
        setFlag(true);
        getAddressAndBalances();
        setCurrent(1);
      }
      aTokenBalances.length > 0 && address1 && updateATokenAllowancesFlag===false ? updateATokenAllowances(address1) : <></>;
      checkATokensApprovalAndMoveToNextStep();
      if (current === 2) checkForAddress2();
      getLatestAddress();
    }
  },[userSigner, aTokenBalances, stableDebtBalances, variableDebtBalances, current]);

  return ( 
    <div style={{ margin: 40}}>
      <Divider></Divider>
      <Steps current={current} status="success">
        <Step title="Get Balances" description="Connect your Account 1 and get Balances of tokens" />
        <Step title="Approve aTokens" description="From your Account 1 approve all aTokens" />
        <Step title="Approve Debt Position" description="Connect Account 2 and approve all Debt Positions" />
        <Step title="Execute Transfer" description="Connect Account 1 and execute the transfer" />
      </Steps>
      <Divider></Divider>

      {!flag && current===0 ? <div style={{textAlign: "center", margin: 35}}>Please Connect your Account 1</div> : 
        <div>
        <Title level={5} style={{textAlign: "center", margin: 35}}>Transfer Positions from account: {address1}</Title>
        { (current === 2 || current === 3) && address2 !== '' ? <Title level={5} style={{textAlign: "center", margin: 35}}>Transfer Positions to account: {address2}</Title> : <></>}
        { current === 2 && address2 === '' ? 
          <Title level={5} style={{textAlign: "center", margin: 35}}>Please Connect your Account 2</Title> : <></>
        }
        </div>
      }
      <Divider></Divider>

      {/* STEP 1: Approve aTokens */}
      { 
        aTokenBalances.length > 0 && current===1 ? 
        <div>
          <Row>
            <Title style={{margin: "auto", padding: 30}} level={3}>Approve aTokens</Title>
          </Row>
          <Row>
            <Col span={8}>
            <Title level={4} style={{textAlign: "center"}}>aToken</Title>
            </Col>
            <Col span={8}>
            <Title level={4} style={{textAlign: "center"}}>Balance</Title>
            </Col>
            <Col span={8}>
            <Title level={4} style={{textAlign: "center"}}>Approval</Title>
            </Col>
          </Row>
          {
            aTokenBalances.map((item, index) => (
              <div>
                <Divider></Divider>
                <Row>
                <Col span={8} style={{ padding: 20}}>
                  <div style={{textAlign: "center" }}>{item.Symbol}</div>
                </Col>
                <Col span={8} style={{ padding: 20}}>
                  <div style={{textAlign: "center" }}>
                    {item.balanceInTokenDecimals}
                  </div>
                </Col>
                <Col span={8} style={{ padding: 20}}>
                  { parseFloat(aTokenBalances[index].Allowance) < parseFloat(aTokenBalances[index].Balance) ? 
                    <div style={{textAlign: "center" }}>
                      <Button onClick={() => approveToken(
                      aTokenBalances[index].ContractAddress,
                      aTokenBalances[index].Balance,
                      CONTRACT_ADDRESS
                      )}>Approve
                      </Button>
                    </div> : 
                      item.Symbol ?
                      <div style={{textAlign: "center" }}><Button icon={<CheckOutlined/>} status='success'>Approved</Button></div> :
                      console.log()
                  }
                </Col>
                </Row>
                <Divider></Divider>
              </div>  
            ))
          }
          {/* Refresh Button */}
          <Row>
            <Col span={24} style={{textAlign: "center"}}>
              <Button  icon={<RedoOutlined />} onClick={() => {updateATokenAllowances(address1); checkATokensApprovalAndMoveToNextStep()}}>Refresh</Button>
            </Col>
          </Row>
        </div>
        : current===1 ? <div style={{textAlign: "center"}}>No Deposits on AAVE on this address</div> : <></>
      }

      {/* STEP 2: Approve Borrow Positions */}
      {
        current===2 && address2 !== '' ? 
        <div>
          <Row>
            <Title style={{margin: "auto"}} level={3}>Approve Debt Positions</Title>
          </Row>
          <Row>
            <Col span={12}>
              <Title level={4} style={{textAlign: "center", margin: 35}}>Stable Debt</Title>
              {
                stableDebtBalances.length > 0 ? 
                <div>
                <Row>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>debtToken</Title>
                  </Col>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>Balance</Title>
                  </Col>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>Approval</Title>
                  </Col>
                </Row>
                {stableDebtBalances.map((item, index) => (
                  <div>
                    <Divider></Divider>
                    <Row>
                    <Col span={8} style={{ padding: 20}}>
                      <div style={{textAlign: "center" }}>{item.Symbol}</div>
                    </Col>
                    <Col span={8} style={{ padding: 20}}>
                      <div style={{textAlign: "center" }}>{item.balanceInTokenDecimals}</div>
                    </Col>
                    <Col span={8} style={{ padding: 20}}>
                      { stableDebtBalances[index].borrowAllowance && parseFloat(stableDebtBalances[index].borrowAllowance) < parseFloat(stableDebtBalances[index].Balance) ? 
                        <div style={{textAlign: "center" }}>
                          <Button onClick={() => approveDelegationToken(
                          stableDebtBalances[index].ContractAddress,
                          stableDebtBalances[index].Balance,
                          CONTRACT_ADDRESS
                          )}>Approve Delegation
                          </Button>
                        </div> : 
                          item.Symbol && stableDebtBalances[index].borrowAllowance ?
                          <div style={{textAlign: "center" }}><Button icon={<CheckOutlined/>} status='success'>Approved</Button></div> : <></>
                      }
                    </Col>
                    </Row>
                    <Divider></Divider>
                  </div>
                ))}
                </div>
                : <div style={{textAlign: "center" }}>No stable Debt</div>
              }
            </Col>
            <Col span={12}>
              <Title level={4} style={{textAlign: "center", margin: 35}}>Variable Debt</Title>
              {
                variableDebtBalances.length > 0 ?
                <div>
                <Row>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>debtToken</Title>
                  </Col>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>Balance</Title>
                  </Col>
                  <Col span={8}>
                  <Title level={4} style={{textAlign: "center"}}>Approval</Title>
                  </Col>
                </Row>
                {variableDebtBalances.map((item, index) => (
                  <div>
                    <Divider></Divider>
                    <Row>
                    <Col span={8} style={{ padding: 20}}>
                      <div style={{textAlign: "center" }}>{item.Symbol}</div>
                    </Col>
                    <Col span={8} style={{ padding: 20}}>
                      <div style={{textAlign: "center" }}>{item.balanceInTokenDecimals}</div>
                    </Col>
                    <Col span={8} style={{ padding: 20}}>
                      { variableDebtBalances[index].borrowAllowance && parseFloat(variableDebtBalances[index].borrowAllowance) < parseFloat(variableDebtBalances[index].Balance) ? 
                        <div style={{textAlign: "center" }}>
                          <Button onClick={() => approveDelegationToken(
                          variableDebtBalances[index].ContractAddress,
                          variableDebtBalances[index].Balance,
                          CONTRACT_ADDRESS
                          )}>Approve Delegation
                          </Button>
                        </div> : 
                          item.Symbol && variableDebtBalances[index].borrowAllowance ?
                          <div style={{textAlign: "center" }}><Button icon={<CheckOutlined/>} status='success'>Approved</Button></div> : <></>
                      }
                    </Col>
                    </Row>
                    <Divider></Divider>
                  </div>
                ))} 
                </div>
                : <div style={{textAlign: "center" }}>No Variable Debt</div>
              }
            </Col>
          </Row>
          {/* Refresh Button */}
          <Row>
            <Col span={24} style={{textAlign: "center"}}>
              <Button  icon={<RedoOutlined />} onClick={() => {refresh()}}>Refresh</Button>
            </Col>
          </Row>
        </div> : <></>
      }

      {/* STEP 3: Execute Transfer */}
      {
        current===3 ? 
        latestAddress === address1 ? 
        <div style={{textAlign: "center" }}>
          <Button onClick={() => executeTransfer()}>
            Execute Transfer
          </Button>
          </div> : 
          <div style={{textAlign: "center" }}>Please connect Account 1</div>
        : <></>
      }
      
    </div>
  );
}

export default Home;