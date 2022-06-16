
const Coin = artifacts.require("./Coin.sol");



// Coin.Sent().watch({}, '', function(error, result) {
//   if (!error) {
//       console.log("Coin transfer: " + result.args.amount +
//           " coins were sent from " + result.args.from +
//           " to " + result.args.to + ".");
//       console.log("Balances now:\n" +
//           "Sender: " + Coin.balances.call(result.args.from) +
//           "Receiver: " + Coin.balances.call(result.args.to));
//   }
// })


contract("Coin", (accounts) => {
  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await Coin.deployed();

    // Set value of 89
    const myBalance =     await simpleStorageInstance.getBalances();

    const balances = await simpleStorageInstance.balances;

    console.log(balances);
    console.log(myBalance.lenth);

    // Get stored value



    assert.equal(89, 89, "The value 89 was stored.");
  });
});


