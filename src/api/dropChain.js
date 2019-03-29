import {thorify} from "thorify";
import Web3 from "web3";
import orderManager from "../../../dropchain-poc/build/contracts/OrderManager.json";
import buzzToken from "../../../dropchain-poc/build/contracts/BuzzToken.json";
import addressRegistry from "../../../dropchain-poc/build/addressRegistry.json";
import authData from "../../../dropchain-poc/authData.json";

const web3 = thorify(new Web3(), "http://localhost:8669");

class DropChainAPI {
  constructor() {
    this.balances = {};
    this.contract = new web3.eth.Contract(orderManager.abi, addressRegistry.orderManager);
    this.wallet = new web3.eth.Contract(buzzToken.abi, addressRegistry.buzzToken);

    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(authData['brand'].PK));
    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(authData['distributor-1'].PK));
    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(authData['distributor-2'].PK));
    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(authData['smb'].PK));
    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(authData['dropchain'].PK));
  }

  // Participants

  createBrand(name) {
    this.balances['brand'] = 0;
    return this.contract.methods.createBrand(authData.brand.address, name).send({from: authData.dropchain.address});
  }

  createDistributor = (name, role) => {
    this.balances[role] = 0;
    return this.contract.methods.createDistributor(authData[role].address, name).send({from: authData.dropchain.address});
  };

  createSMB(name) {
    this.balances['smb'] = 0;
    return this.contract.methods.createSmb(authData.smb.address, name).send({from: authData.dropchain.address});
  }

  getCreateParticipantEvents() {
    return this.contract.getPastEvents('NewParticipant');
  }

  // Token

  getTokenBalance(address) {
    return this.wallet.methods.balanceOf(address).call({from: address});
  }

  getAllowance(from) {
    return this.wallet.methods.allowance(from, addressRegistry.orderManager).call({from: authData.dropchain.address});
  }

  getParticipantAddress(participant) {
    return authData[participant].address;
  }

  approve(from, quantity) {
    return this.wallet.methods.approve(addressRegistry.orderManager, quantity).send({from});
  }

  // Create Unit

  createUnit(payload, brandAddress) {
    return this.contract.methods.createUnit(payload).send({from: brandAddress});
  }

  getCreateUnitEvents() {
    return this.contract.getPastEvents('CreateUnit');
  }

  // Create Order

  createOrder(unitIds, payload, brandAddress) {
    return this.contract.methods.createOrder(unitIds, payload).send({from: brandAddress});
  }

  getCreateOrderEvents() {
    return this.contract.getPastEvents('CreateOrder');
  }

  // Check In

  checkInOrder(orderId, role) {
    return this.contract.methods.checkInOrder(orderId).send({from: authData[role].address})
  }

  getCheckInOrderEvents() {
    return this.contract.getPastEvents('CheckInOrder');
  }

  // Deactivate

  deactivateOrder(orderId, role) {
    return this.contract.methods.deactivateOrder(orderId).send({from: authData[role].address})
  }

  getDeactivateOrderEvents() {
    return this.contract.getPastEvents('DeactivateOrder');
  }

  // Custom Order

  createCustomOrder(unitIds, payload, address) {
    return this.contract.methods.createCustomOrder(unitIds, payload).send({from: address});
  }

  getCreateCustomOrderEvents() {
    return this.contract.getPastEvents('CreateCustomOrder');
  }

  // Receive Order

  receiveOrder(orderId, address) {
    return this.contract.methods.receiveOrder(orderId).send({from: address});
  }

  getReceiveOrderEvents() {
    return this.contract.getPastEvents('ReceiveOrder');
  }

}

export default new DropChainAPI();