import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Coin from "./contracts/Coin.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const coinInstance = new web3.eth.Contract(
        Coin.abi,
        deployedNetwork && deployedNetwork.address,
      );


      let senderAddress = "0x50040DFDcAf05A5c082887C8f2f7D4C12bfa382A";
      let amount = 200;
      await coinInstance.methods.send(senderAddress,amount).call();
    //  await coinInstance.methods.send(senderAddress,amount).call(function (err, res) {
    //     if (err) {
    //       console.log("An error occured", err)
    //       return
    //     }
    //     console.log("The balance is: ", res)
    //   })

      
      await coinInstance.methods.getBalances().call();



    //   Coin.Sent().watch({}, '', function(error, result) {
    //     if (!error) {
    //         console.log("Coin transfer: " + result.args.amount +
    //             " coins were sent from " + result.args.from +
    //             " to " + result.args.to + ".");
    //         console.log("Balances now:\n" +
    //             "Sender: " + Coin.balances.call(result.args.from) +
    //             "Receiver: " + Coin.balances.call(result.args.to));
    //     }
    // })

 

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
