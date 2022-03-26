export const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

export const ALCHEMY_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  polygon: {
    name: "polygon",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.polygon.technology/",
    blockExplorer: "https://mumbai.polygonscan.com/",
  },
  localArbitrum: {
    name: "localArbitrum",
    color: "#50a0ea",
    chainId: 153869338190755,
    blockExplorer: "",
    rpcUrl: `http://localhost:8547`,
  },
  localArbitrumL1: {
    name: "localArbitrumL1",
    color: "#50a0ea",
    chainId: 44010,
    blockExplorer: "",
    rpcUrl: `http://localhost:7545`,
  },
  rinkebyArbitrum: {
    name: "Arbitrum Testnet",
    color: "#50a0ea",
    chainId: 421611,
    blockExplorer: "https://rinkeby-explorer.arbitrum.io/#/",
    rpcUrl: `https://rinkeby.arbitrum.io/rpc`,
  },
  arbitrum: {
    name: "Arbitrum",
    color: "#50a0ea",
    chainId: 42161,
    blockExplorer: "https://explorer.arbitrum.io/#/",
    rpcUrl: `https://arb1.arbitrum.io/rpc`,
    gasPrice: 0,
  },
  localOptimismL1: {
    name: "localOptimismL1",
    color: "#f01a37",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":9545",
  },
  localOptimism: {
    name: "localOptimism",
    color: "#f01a37",
    chainId: 420,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    gasPrice: 0,
  },
  kovanOptimism: {
    name: "kovanOptimism",
    color: "#f01a37",
    chainId: 69,
    blockExplorer: "https://kovan-optimistic.etherscan.io/",
    rpcUrl: `https://kovan.optimism.io`,
    gasPrice: 0,
  },
  optimism: {
    name: "optimism",
    color: "#f01a37",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: `https://mainnet.optimism.io`,
  },
  localAvalanche: {
    name: "localAvalanche",
    color: "#666666",
    chainId: 43112,
    blockExplorer: "",
    rpcUrl: `http://localhost:9650/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  fujiAvalanche: {
    name: "fujiAvalanche",
    color: "#666666",
    chainId: 43113,
    blockExplorer: "https://cchain.explorer.avax-test.network/",
    rpcUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  mainnetAvalanche: {
    name: "mainnetAvalanche",
    color: "#666666",
    chainId: 43114,
    blockExplorer: "https://cchain.explorer.avax.network/",
    rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  testnetHarmony: {
    name: "testnetHarmony",
    color: "#00b0ef",
    chainId: 1666700000,
    blockExplorer: "https://explorer.pops.one/",
    rpcUrl: `https://api.s0.b.hmny.io`,
    gasPrice: 1000000000,
  },
  mainnetHarmony: {
    name: "mainnetHarmony",
    color: "#00b0ef",
    chainId: 1666600000,
    blockExplorer: "https://explorer.harmony.one/",
    rpcUrl: `https://api.harmony.one`,
    gasPrice: 1000000000,
  },
  fantom: {
    name: "fantom",
    color: "#1969ff",
    chainId: 250,
    blockExplorer: "https://ftmscan.com/",
    rpcUrl: `https://rpcapi.fantom.network`,
    gasPrice: 1000000000,
  },
  testnetFantom: {
    name: "testnetFantom",
    color: "#1969ff",
    chainId: 4002,
    blockExplorer: "https://testnet.ftmscan.com/",
    rpcUrl: `https://rpc.testnet.fantom.network`,
    gasPrice: 1000000000,
    faucet: "https://faucet.fantom.network/",
  },
};

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};

export const TOKEN_LIST = [
  {
    symbol: 'AAVE',
    tokenAddress: '0xB597cd8D3217ea6477232F9217fa70837ff667Af',
    aTokenAddress: '0x6d93ef8093F067f19d33C2360cE17b20a8c45CD7',
    stableDebtTokenAddress: '0x72d2Aea8aCcD3277D90093a974eFf3e1945871D7',
    variableDebtTokenAddress: '0x5aF7bAC415D9c249176ea233E92646E5c9288b92'
  },
  {
    symbol: 'BAT',
    tokenAddress: '0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738',
    aTokenAddress: '0x28f92b4c8Bdab37AF6C4422927158560b4bB446e',
    stableDebtTokenAddress: '0x07a0B32983ab8203E8C3493F0AbE5bFe784fAa15',
    variableDebtTokenAddress: '0xcE271C229576605bdabD0A3D664685cbC383f3a6'
  },
  {
    symbol: 'BUSD',
    tokenAddress: '0x4c6E1EFC12FDfD568186b7BAEc0A43fFfb4bCcCf',
    aTokenAddress: '0xfe3E41Db9071458e39104711eF1Fa668bae44e85',
    stableDebtTokenAddress: '0x597c5d0390E7e995d36F2e49F9eD979697723bE9',
    variableDebtTokenAddress: '0xB85eCAd7a9C9F09749CeCF84122189A7908eC934'
  },
  {
    symbol: 'DAI',
    tokenAddress: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
    aTokenAddress: '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',
    stableDebtTokenAddress: '0x3B91257Fe5CA63b4114ac41A0d467D25E2F747F3',
    variableDebtTokenAddress: '0xEAbBDBe7aaD7d5A278da40967E62C8c8Fe5fAec8'
  },
  {
    symbol: 'ENJ',
    tokenAddress: '0xC64f90Cd7B564D3ab580eb20a102A8238E218be2',
    aTokenAddress: '0x1d1F2Cb9ED46A8d5bf0254E5CE400514D62d55F0',
    stableDebtTokenAddress: '0x8af08B5874380E1F1816e30bE12d773f4EB70e67',
    variableDebtTokenAddress: '0xc11e09B03634144a1862E14ef7569DbEb4b7F3a2'
  },
  {
    symbol: 'KNC',
    tokenAddress: '0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8',
    aTokenAddress: '0xdDdEC78e29f3b579402C42ca1fd633DE00D23940',
    stableDebtTokenAddress: '0x7f4E5bA1eE5dCAa4440371ec521cBc130De12E5e',
    variableDebtTokenAddress: '0x196d717b2D8a5694572C2742343C333EA27B8288'
  },
  {
    symbol: 'LINK',
    tokenAddress: '0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789',
    aTokenAddress: '0xeD9044cA8F7caCe8eACcD40367cF2bee39eD1b04',
    stableDebtTokenAddress: '0x0DBEE55AB73e3C14421d3f437a218ea99A520556',
    variableDebtTokenAddress: '0xcCead10A3BA54b1FA6D107b63B7D5e5e2f9888D8'
  },
  {
    symbol: 'MANA',
    tokenAddress: '0x738Dc6380157429e957d223e6333Dc385c85Fec7',
    aTokenAddress: '0xA288B1767C91Aa9d8A14a65dC6B2E7ce68c02DFd',
    stableDebtTokenAddress: '0xd4aEcF57cbcfeA373565DE75537aAc911EAF1759',
    variableDebtTokenAddress: '0xaEE5AA094B55b6538388A4E8CBAe9E81Bfe815e6'
  },
  {
    symbol: 'MKR',
    tokenAddress: '0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA',
    aTokenAddress: '0x9d9DaBEae6BcBa881404A9e499B13B2B3C1F329E',
    stableDebtTokenAddress: '0xC37AadA7758e10a49bdECb9078753d5D096A4649',
    variableDebtTokenAddress: '0xB86a93aA1325e4F58E3dbA7CE9DA251D83374fA2'
  },
  {
    symbol: 'REN',
    tokenAddress: '0x5eebf65A6746eed38042353Ba84c8e37eD58Ac6f',
    aTokenAddress: '0x01875ee883B32f5f961A92eC597DcEe2dB7589c1',
    stableDebtTokenAddress: '0xc66a5fd3Bd3D0329895ceE5755e161FD89c2EecD',
    variableDebtTokenAddress: '0x75f318b9B40c5bEb0EEAdab5294C4108A376a22d'
  },
  {
    symbol: 'SNX',
    tokenAddress: '0x7FDb81B0b8a010dd4FFc57C3fecbf145BA8Bd947',
    aTokenAddress: '0xAA74AdA92dE4AbC0371b75eeA7b1bd790a69C9e1',
    stableDebtTokenAddress: '0x14B7a7Ab57190aEc3210303ef1cF29088535B329',
    variableDebtTokenAddress: '0x7dF2a710751cb9f1FD392107187e4Aed0Ae867b0'
  },
  {
    symbol: 'sUSD',
    tokenAddress: '0x99b267b9D96616f906D53c26dECf3C5672401282',
    aTokenAddress: '0x9488fF6F29ff75bfdF8cd5a95C6aa679bc7Cd65c',
    stableDebtTokenAddress: '0xB155258d3c18dd5D41e8838c8b45CaE1B17a11D9',
    variableDebtTokenAddress: '0xf3B942441Bd9d335E64413BeA6b76a49A5853C54'
  },
  {
    symbol: 'TUSD',
    tokenAddress: '0x016750AC630F711882812f24Dba6c95b9D35856d',
    aTokenAddress: '0x39914AdBe5fDbC2b9ADeedE8Bcd444b20B039204',
    stableDebtTokenAddress: '0x082576C4CfC2eE1e0b8088B84d50CEb97CD84E49',
    variableDebtTokenAddress: '0xC0cFab5E4A9D8DA2Bc98D0a2b3f9dc20f7eec19C'
  },
  {
    symbol: 'USDC',
    tokenAddress: '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
    aTokenAddress: '0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0',
    stableDebtTokenAddress: '0x252C017036b144A812b53BC122d0E67cBB451aD4',
    variableDebtTokenAddress: '0xBE9B058a0f2840130372a81eBb3181dcE02BE957'
  },
  {
    symbol: 'USDT',
    tokenAddress: '0x13512979ADE267AB5100878E2e0f485B568328a4',
    aTokenAddress: '0xFF3c8bc103682FA918c954E84F5056aB4DD5189d',
    stableDebtTokenAddress: '0xf3DCeaDf668607bFCF565E84d9644c42eea518cd',
    variableDebtTokenAddress: '0xa6EfAF3B1C6c8E2be44818dB64E4DEC7416983a1'
  },
  {
    symbol: 'WBTC',
    tokenAddress: '0xD1B98B6607330172f1D991521145A22BCe793277',
    aTokenAddress: '0x62538022242513971478fcC7Fb27ae304AB5C29F',
    stableDebtTokenAddress: '0x45b85733E2609B9Eb18DbF1315765ddB8431e0B6',
    variableDebtTokenAddress: '0x9b8107B86A3cD6c8d766B30d3aDD046348bf8dB4'
  },
  {
    symbol: 'WETH',
    tokenAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    aTokenAddress: '0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347',
    stableDebtTokenAddress: '0x1F85D0dc45332D00aead98D26db0735350F80D18',
    variableDebtTokenAddress: '0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2'
  },
  {
    symbol: 'YFI',
    tokenAddress: '0xb7c325266ec274fEb1354021D27FA3E3379D840d',
    aTokenAddress: '0xF6c7282943Beac96f6C70252EF35501a6c1148Fe',
    stableDebtTokenAddress: '0x7417855ed88C62e610e612Be52AeE510703Dff04',
    variableDebtTokenAddress: '0xfF682fF79FEb2C057eC3Ff1e083eFdC66f9b37FB'
  },
  {
    symbol: 'ZRX',
    tokenAddress: '0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C',
    aTokenAddress: '0xf02D7C23948c9178C68f5294748EB778Ab5e5D9c',
    stableDebtTokenAddress: '0x7488Eb7fce7e31b91eB9cA4158d54D92e4BB03D7',
    variableDebtTokenAddress: '0x7a1C28e06bcb4b1fF4768BC2CB9cd33b7622cD62'
  },
  {
    symbol: 'UNI',
    tokenAddress: '0x075A36BA8846C6B6F53644fDd3bf17E5151789DC',
    aTokenAddress: '0x601FFc9b7309bdb0132a02a569FBd57d6D1740f2',
    stableDebtTokenAddress: '0x7A43B2653FF42BDE048e3b14fB42028956a7B6b1',
    variableDebtTokenAddress: '0x10339d6562e8867bB93506572fF8Aea94B2fF656'
  },
  {
    symbol: 'AMPL',
    tokenAddress: '0x3E0437898a5667a4769B1Ca5A34aAB1ae7E81377',
    aTokenAddress: '0xb8a16bbab34FA7A5C09Ec7679EAfb8fEC06897bc',
    stableDebtTokenAddress: '0x9157d57DC97A7AFFC7b0a78E78fe25e1401B1dCc',
    variableDebtTokenAddress: '0xb7b7AF565495670713C92B8848fC8A650a968F81'
  }
];

export const CONTRACT_ADDRESS = '0x9214F14A2e371E4dDACa3687b186C24bb57969A8';

export const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_addressProvider","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_assetAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"ADDRESSES_PROVIDER","outputs":[{"internalType":"contract ILendingPoolAddressesProviderV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LENDING_POOL","outputs":[{"internalType":"contract ILendingPoolV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"assets","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256[]","name":"premiums","type":"uint256[]"},{"internalType":"address","name":"initiator","type":"address"},{"internalType":"bytes","name":"params","type":"bytes"}],"name":"executeOperation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipientAccount","type":"address"},{"components":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"stableDebtTokenBalance","type":"uint256"},{"internalType":"uint256","name":"variableDebtTokenBalance","type":"uint256"}],"internalType":"struct TransferAccount.DebtTokenBalance[]","name":"_DebtTokenBalance","type":"tuple[]"},{"components":[{"internalType":"address","name":"Token","type":"address"},{"internalType":"address","name":"aTokenAddress","type":"address"},{"internalType":"uint256","name":"aTokenBalance","type":"uint256"}],"internalType":"struct TransferAccount.aTokenBalance[]","name":"_aTokenBalance","type":"tuple[]"}],"name":"transferAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_assetAddress","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];