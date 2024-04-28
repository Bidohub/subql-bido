import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "bevm-mainnet-starter",
  description:
    "This project can be use as a starting point for developing your new BEVM Mainnet Network project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for BEVM this is 11501
     * https://chainlist.org/chain/11501
     */
    chainId: "11501",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["wss://rpc-mainnet-e4229e41-625b-4226-8c6d-dfdee34d3318-bsc.bevm.io/ws"],
  },
  dataSources: [{
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 156104,
    options: {
      abi: 'StBTC',
      address: '0x26bda683F874e7AE3e3A5d3fad44Bcb82a7c107C',
    },
    assets: new Map([['StBTC', {file: './abis/stBTC.json'}]]),
    mapping: {
      file: './dist/index.js',
      handlers: [
  {
    handler: "handleStakedStBTCLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Staked(address,uint256,address)"
      ]
    }
  },
  {
    handler: "handleTransferStBTCLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Transfer(address,address,uint256)"
      ]
    }
  },
  {
    handler: "handleUnStakedStBTCLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "UnStaked(address,uint256)"
      ]
    }
  }
]
    }
  },],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
