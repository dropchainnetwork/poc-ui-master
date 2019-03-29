'use strict';

import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {DistributorDashboard} from './styles';
import RegisterParticipant from 'components/RegisterParticipant';
import OrdersPanel from './components/OrdersPanel';
import DistributorInfo from './components/DistributorInfo';
import DeactivatedOrdersPanel from './components/DeactivatedOrdersPanel';
import Overlay from '../../components/Overlay/index';
import Spinner from 'components/Spinner';

const extractRoleFromLocation = (pathname) => pathname.includes(
  'distributor') && pathname.includes('1') ? 'distributor-1' : 'distributor-2';

@withRouter
@inject('DropChainStore')
@observer
class Distributor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distributorName: '',
      selectedOrderId: null,
      loading: false,
    };
  }

  componentDidMount = async () => {
    const dropChain = this.props.DropChainStore;
    const distributor = extractRoleFromLocation(location.pathname);

    await dropChain.authUser(distributor);

    this.setState({brandName: dropChain.participants[distributor].name});
  };

  registerDistributor = async () => {
    this.setState({loading: true});
    const distributor = extractRoleFromLocation(location.pathname);
    await this.props.DropChainStore.registerDistributor(
      this.state.distributorName, distributor);
    await this.props.DropChainStore.authUser(distributor);
    this.setState({loading: false});
  };

  changeDistributorName = (event) => {
    this.setState({distributorName: event.target.value});
  };

  checkInOrder = async (orderId) => {
    this.setState({loading: true});
    await this.props.DropChainStore.checkInOrder(orderId);
    await this.props.DropChainStore.getTokenBalance();
    this.setState({loading: false});
  };

  deactivateOrder = async (orderId) => {
    this.setState({loading: true});
    await this.props.DropChainStore.deactivateOrder(orderId);
    this.setState({loading: false});
  };

  createCustomOrder = async (unitIds) => {
    this.setState({loading: true});
    await this.props.DropChainStore.createCustomOrder(unitIds);
    this.setState({loading: false});
  };

  render() {
    const dropChain = this.props.DropChainStore;
    const distributor = extractRoleFromLocation(location.pathname);
    const participant = dropChain.participants[distributor];

    return (
      <DistributorDashboard>
        {participant.registered && (
          <DistributorInfo
            name={dropChain.participants[distributor].name}
            address={dropChain.participantAddress}
            balance={dropChain.participants[distributor].balance / Math.pow(10, 18)}
          />
        )}

        {participant.registered
          ? (
            <Fragment>
              <OrdersPanel
                heading={'Orders available for check in'}
                orders={dropChain.availableOrders}
                btnText={'Check In'}
                btnAction={this.checkInOrder}
              />

              <OrdersPanel
                heading={'Checked in Orders'}
                orders={dropChain.participantOrders}
                btnText={'Deactivate'}
                btnAction={this.deactivateOrder}
              />

              <DeactivatedOrdersPanel
                units={dropChain.availableUnits}
                orders={dropChain.deactivatedOrders}
                formOrder={this.createCustomOrder}
              />

              <OrdersPanel
                heading={'Your orders'}
                orders={dropChain.customOrders}
              />
            </Fragment>
          ) : (
            <RegisterParticipant
              participant={distributor}
              name={this.state.distributorName}
              changeName={this.changeDistributorName}
              register={this.registerDistributor}
            />
          )
        }
        {this.state.loading && <div>
          <Overlay/>
          <Spinner/>
        </div>}
      </DistributorDashboard>
    );
  }
}

export default Distributor;