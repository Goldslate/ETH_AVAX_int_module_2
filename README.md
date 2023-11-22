# DecenMessage

This Solidity program encapsulates the code for an decentralized messaging system, where anyone can send an anonymous message to a
particular address, and they can read the message.

## Description

This solidity program offers anyone to write a message to a particular wallet address on the same blockchain anonymously,and then the user,
to whom the messgage was sent, can read the message.

### Getting Started

To interact with the contract, you can start-off by cloning this repo and running

```
npm i
```

in the terminal to install all the dependencies required.

To compile the code, run:

```
npx hardhat compile
```

To deploy the code locally on the harhdat network, run:

```
npx hardhat node
```

and then run:

```
npx hardhat run --network localhost scripts/deploy.js
```

and then open another terminal to interact with the Token smart contract, type in the terminal

```
npm run dev
```

to launch the front-end.

### Authhors

Parth Verma

### License

This project is licensed under the MIT License - see the LICENSE.md file for details
