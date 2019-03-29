'use strict';

import {action, observable, computed, runInAction} from 'mobx';

import DropChainAPI from 'api/dropChain';

class DropChainStore {
  constructor(dropChainAPI) {
    this.dropChainAPI = dropChainAPI;
  }

  @observable participantAddress = '';
  @observable participantRole = '';

  @observable participants = {
    'brand': {
      registered: false,
      name: '',
      balance: '-',
      allowance: '-',
    },
    'distributor-1': {
      registered: false,
      name: '',
      balance: '-',
      allowance: '-',
    },
    'distributor-2': {
      registered: false,
      name: '',
      balance: '-',
      allowance: '-',
    },
    'smb': {
      registered: false,
      name: '',
      balance: '-',
      allowance: '-',
    },
  };

  @observable createUnitEvents = [];
  @observable createOrderEvents = [];
  @observable checkInOrderEvents = [];
  @observable deactivateOrderEvents = [];
  @observable createCustomOrderEvents = [];
  @observable receiveOrderEvents = [];

  @computed get units() {
    return this.createUnitEvents.map(e => {
      const ordersContainingThisUnit = this.orders.filter(order => order.unitIds.some(unitId => unitId === e.id));
      const order = ordersContainingThisUnit.length && ordersContainingThisUnit[ordersContainingThisUnit.length - 1];

      return {
        ...e,
        orderId: order ? order.id : 0,
      };
    });
  }

  @computed get participantUnits() {
    return this.units.filter(unit => {
      if (unit.orderId) {
        const order = this.orders.find(order => order.id === unit.orderId);

        return (order.ownerAddress.toLowerCase() === this.participantAddress.toLowerCase());
      } else {
        return (unit.brandAddress === this.participantAddress);
      }
    });
  }

  @computed get availableUnits() {
    return this.units.filter(unit => {
      if (unit.orderId) {
        const order = this.orders.find(order => order.id === unit.orderId);

        return ((order.ownerAddress.toLowerCase() === this.participantAddress.toLowerCase()) &&
          (order.status === 'DEACTIVATED'));
      }
    });
  }

  @computed get orders() {
    const orders = this.createOrderEvents.map(e => ({
      ...e,
      ownerAddress: e.participantAddress,
      status: 'PENDING',
    }));

    const customOrders = this.createCustomOrderEvents.map(e => ({
      ...e,
      ownerAddress: e.participantAddress,
      status: 'PENDING',
    }));

    const allOrders = [...orders, ...customOrders];

    this.checkInOrderEvents.forEach(e => {
      const orderIdx = allOrders.findIndex(order => order.id === e.id);

      allOrders[orderIdx].ownerAddress = e.ownerAddress;
    });

    this.deactivateOrderEvents.forEach(e => {
      const orderIdx = allOrders.findIndex(order => order.id === e.id);
      allOrders[orderIdx] = {
        ...allOrders[orderIdx],
        ownerAddress: e.ownerAddress,
        status: 'DEACTIVATED',
      };
    });

    this.receiveOrderEvents.forEach(e => {
      const orderIdx = allOrders.findIndex(order => order.id === e.id);
      allOrders[orderIdx] = {
        ...allOrders[orderIdx],
        ownerAddress: e.ownerAddress,
        status: 'RECEIVED',
      };
    });

    return allOrders;
  }

  @computed get participantOrders() {
    return this.orders.filter(order => {
      if (this.participantRole === 'brand') {
        return order.participantAddress.toLowerCase() === this.participantAddress.toLowerCase();
      }

      if (order.status && order.status === 'DEACTIVATED') {
        return false;
      }

      const isOwner = order.ownerAddress.toLowerCase() === this.participantAddress.toLowerCase();
      const notCreator = order.participantAddress.toLowerCase() !== this.participantAddress.toLowerCase();

      return isOwner && notCreator;
    });
  }

  @computed get availableOrders() {
    return this.orders.filter(order => {
      if (order.status && (order.status === 'DEACTIVATED' || order.status === 'RECEIVED')) {
        return false;
      }

      return order.ownerAddress.toLowerCase() !==
        this.participantAddress.toLowerCase();
    });
  }

  @computed get deactivatedOrders() {
    return this.orders.filter(order => {
      const isDeactivated = (order.status && order.status === 'DEACTIVATED');
      const belongsToParticipant = order.ownerAddress.toLowerCase() === this.participantAddress.toLowerCase();

      return isDeactivated && belongsToParticipant;
    });
  }

  @computed get customOrders() {
    return this.orders.filter(order => {
      if (order.status && order.status === 'DEACTIVATED') {
        return false;
      }

      return order.participantAddress.toLowerCase() === this.participantAddress.toLowerCase();
    });
  }

  @computed get receivedOrders() {
    return this.orders.filter(order => (order.status === 'RECEIVED') &&
      (order.ownerAddress.toLowerCase() === this.participantAddress.toLowerCase()));
  }

  // Auth

  loadCreateParticipantEvents = async () => {
    const rawEvents = await this.dropChainAPI.getCreateParticipantEvents();

    return rawEvents.map(e => ({
      participantAddress: e.returnValues.participantAddress,
      role: e.returnValues.role,
      name: e.returnValues.name,
    }));
  };

  eventMatchesParticipant(event, role) {
    const addressMatch = event.participantAddress.toLowerCase() ===
      this.dropChainAPI.getParticipantAddress(role).toLowerCase();

    return addressMatch && this.checkRole(role, event.role);
  }

  checkRole = (role, roleCode) => {
    return (role === 'brand' && roleCode === '1')
      || (role.startsWith('distributor') && roleCode === '2')
      || (role === 'smb' && roleCode === '3');
  };

  @action
  authUser = async (role) => {
    const createParticipantEvents = await this.loadCreateParticipantEvents();
    const event = createParticipantEvents.find(e => this.eventMatchesParticipant(e, role));

    if (event) {
      runInAction(() => {
        this.participants[role].registered = true;
        this.participants[role].name = event.name;
        this.participantRole = role;
        this.participantAddress = event.participantAddress;
      });

      await this.getTokenBalance();
      await this.getAllowance();
    }
  };

  @action
  checkAuthenticatedUsers = async () => {
    const createParticipantEvents = await this.loadCreateParticipantEvents();

    Object.keys(this.participants).forEach(role => {
      const event = createParticipantEvents.find(e => this.eventMatchesParticipant(e, role));

      if (event) {
        runInAction(() => {
          this.participants[role].registered = true;
          this.participants[role].name = event.name;
        });
      }
    });
  };

  // Participants

  @action
  registerBrand = async (name) => {
    await this.dropChainAPI.createBrand(name);
  };

  @action
  registerDistributor = async (name, role) => {
    await this.dropChainAPI.createDistributor(name, role);
  };

  @action
  registerSMB = async (name) => {
    await this.dropChainAPI.createSMB(name);
  };

  // Token

  @action
  getTokenBalance = async () => {
    const balance = await this.dropChainAPI.getTokenBalance(
      this.participantAddress);

    runInAction(() => {
      this.participants[this.participantRole].balance = balance;
    });
  };

  @action
  getAllowance = async () => {
    const allowance = await this.dropChainAPI.getAllowance(
      this.participantAddress);

    runInAction(() => {
      this.participants[this.participantRole].allowance = allowance;
    });
  };

  @action
  approveTokens = async (quantity = this.participants[this.participantRole].balance) => {
    await this.dropChainAPI.approve(this.participantAddress, quantity);
    await this.getAllowance();
  };

  // Create Unit

  createUnit = async (payload) => {
    await this.dropChainAPI.createUnit(payload, this.participantAddress);

    return this.loadCreateUnitEvents();
  };

  @action
  loadCreateUnitEvents = async () => {
    const events = await this.dropChainAPI.getCreateUnitEvents();

    runInAction(() => this.createUnitEvents = events.map(e => ({
      id: e.returnValues.unitId,
      payload: e.returnValues.payload,
      brandAddress: e.returnValues.brandAddress,
    })));
  };

  // Create Order

  createOrder = async (unitIds, payload = 'Some payload') => {
    if (unitIds.length > 0) {
      await this.dropChainAPI.createOrder(unitIds, payload,
        this.participantAddress);

      return this.loadCreateOrderEvents();
    } else {
      alert('Order should contain at least on Unit');
    }
  };

  @action
  loadCreateOrderEvents = async () => {
    const rawEvents = await this.dropChainAPI.getCreateOrderEvents();
    const events = rawEvents.map(e => {
      return {
        id: e.returnValues.orderId,
        unitIds: e.returnValues.unitIds,
        payload: e.returnValues.payload,
        participantAddress: e.returnValues.participantAddress,
      };
    });

    runInAction(() => {
      this.createOrderEvents = events;
    });
  };

  // CheckIn Order

  checkInOrder = async (orderId) => {
    await this.dropChainAPI.checkInOrder(orderId, this.participantRole);

    return this.loadCheckInOrderEvents();
  };

  @action
  loadCheckInOrderEvents = async () => {
    const rawEvents = await this.dropChainAPI.getCheckInOrderEvents();
    const events = rawEvents.map(e => {
      return {
        id: e.returnValues.orderId,
        ownerAddress: e.meta.txOrigin,
      };
    });

    runInAction(() => {
      this.checkInOrderEvents = events;
    });
  };

  // Deactivate Order

  @action
  deactivateOrder = async (orderId) => {
    await this.dropChainAPI.deactivateOrder(orderId, this.participantRole);

    return this.loadDeactivateOrderEvents();
  };

  @action
  loadDeactivateOrderEvents = async () => {
    const rawEvents = await this.dropChainAPI.getDeactivateOrderEvents();
    const events = rawEvents.map(e => {
      return {
        id: e.returnValues.orderId,
        ownerAddress: e.returnValues.diactivatedBy,
      };
    });

    runInAction(() => {
      this.deactivateOrderEvents = events;
    });
  };

  // Custom Order

  createCustomOrder = async (unitIds, payload = 'Some payload') => {
    await this.dropChainAPI.createCustomOrder(unitIds, payload, this.participantAddress);

    return this.loadCreateCustomOrderEvents();
  };

  @action
  loadCreateCustomOrderEvents = async () => {
    const rawEvents = await this.dropChainAPI.getCreateCustomOrderEvents();

    const events = rawEvents.map(e => {
      return {
        id: e.returnValues.orderId,
        unitIds: e.returnValues.unitIds,
        payload: e.returnValues.payload,
        participantAddress: e.returnValues.participantAddress,
      };
    });

    runInAction(() => {
      this.createCustomOrderEvents = events;
    });
  };

  // Receive order

  receiveOrder = async (orderId) => {
    await this.dropChainAPI.receiveOrder(orderId, this.participantAddress);
  };

  @action
  loadReceiveOrderEvents = async () => {
    const rawEvents = await this.dropChainAPI.getReceiveOrderEvents();

    const events = rawEvents.map(e => {
      return {
        id: e.returnValues.orderId,
        ownerAddress: e.meta.txOrigin,
      };
    });

    runInAction(() => {
      this.receiveOrderEvents = events;
    });
  };
}

export default new DropChainStore(DropChainAPI);
