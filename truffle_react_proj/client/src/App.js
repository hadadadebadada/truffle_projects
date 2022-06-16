import React, { Component, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import * as THREE from "three";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, value: "adsd"};



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

    //THREE JS 


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#c"), antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;


    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();


  };

  handleChange(e){
    console.log('handle change called')
   this.setState({value:e});

  }


  handleClick = async () => {
    const { accounts, contract, value } = this.state;

    console.log(value);

    await contract.methods.setString(value).send({from:accounts[0]});

    const myValueFromContract = await contract.methods.getString().call();

    this.setState({value: myValueFromContract})
  }



  runExample = async () => {
    const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(6).send({ from: accounts[0] });
//  // Get the value from the contract to prove it worked.
//  const response = await contract.methods.get().call();

//    //const setter = await contract.methods.set(7).send({ from: accounts[0] });

//     await contract.methods.setString("huashausasuh").send({from:accounts[0]});


//     const myStringResponse = await contract.methods.getString().call();

    
//     console.log(myStringResponse.tx);

    await contract.methods.doubleInput(7,"new input from client").send({from:accounts[0]});

    const doubleOutput = await contract.methods.doubleOutput().call();



    // await contract.methods.setString(value).send({from:accounts[0]});

    // const myValueFromContract = await contract.methods.getString().call();

    // console.log(doubleOutput.tx)

   

    // Update state with the result.
    this.setState({ storageValue: doubleOutput[0], value: doubleOutput[1] });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <h1>{this.state.value}</h1>
        <canvas id='c'></canvas>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>

        {/* <input value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick.bind(this)}>Change Input</button> */}

<input
        type="text"
        defaultValue={this.state.value}
        //onChange={(e) => this.setState({value: e.target.value})}
        onChange= {(e) => this.handleChange(e.target.value)}
      />
<button onClick={this.handleClick.bind(this)}>Change Input</button> 
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>

        <canvas id='c'></canvas>

      </div>
    );
  }
}

export default App;
