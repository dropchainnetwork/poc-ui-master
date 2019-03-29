'use strict';

import React, {Fragment} from 'react';
import {observer, inject} from 'mobx-react';

import DropChainStore from 'stores/DropChainStore';
import RegisterParticipant from 'components/RegisterParticipant';

import SMBInfo from './components/SMBInfo';
import OrdersPanel from './components/OrdersPanel';

import {SMBDashboard} from './styles';
import Overlay from '../../components/Overlay/index';
import Spinner from 'components/Spinner';


@inject('DropChainStore')
@observer
class SMB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smbName: '',
      loading: false
    };
  }

  componentDidMount = async () => {
    await this.props.DropChainStore.authUser('smb');

    this.setState({
      smbName: this.props.DropChainStore.participants['smb'].name,
    });
  };

  registerSMB = async () => {
    this.setState({loading: true});
    await this.props.DropChainStore.registerSMB(this.state.smbName);
    await this.props.DropChainStore.authUser('smb');
    this.setState({loading: false});
  };

  changeName = (event) => {
    this.setState({smbName: event.target.value});
  };

  receiveOrder = async (orderId) => {
    this.setState({loading: true});
    await this.props.DropChainStore.receiveOrder(orderId);
    await this.props.DropChainStore.getTokenBalance();
    await this.props.DropChainStore.loadReceiveOrderEvents();
    this.setState({loading: false});
  };

  render() {
    const dropChain = this.props.DropChainStore;

    return (
      <SMBDashboard>
        {dropChain.participants['smb'].registered
          ? (
            <Fragment>
              <SMBInfo
                name={dropChain.participants.smb.name}
                address={dropChain.participantAddress}
                balance={dropChain.participants.smb.balance / Math.pow(10, 18)}
              />

              <OrdersPanel
                heading={'Orders available for receive'}
                orders={dropChain.availableOrders}
                btnText={'Receive'}
                btnAction={this.receiveOrder}
              />

              <OrdersPanel
                heading={'Received orders'}
                orders={dropChain.receivedOrders}
              />
            </Fragment>
          ) : (
            <RegisterParticipant
              participant={'smb'}
              name={this.state.smbName}
              changeName={this.changeName}
              register={this.registerSMB}
            />
          )
        }
        {this.state.loading && <div>
          <Overlay/>
          <Spinner/>
        </div>}
      </SMBDashboard>
    );
  }
}

export default SMB;