'use strict';

import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import RegisterParticipant from 'components/RegisterParticipant';
import Spinner from 'components/Spinner';
import BrandInfo from './components/BrandInfo';
import BrandUnits from './components/Units';
import BrandOrders from './components/Orders/index';

import {BrandDashboard} from './styles';
import Overlay from '../../components/Overlay/index';

@inject('DropChainStore')
@observer
class Brand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brandName: '',
      unitName: '',
      selectedUnits: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.props.DropChainStore.authUser('brand');

    this.setState({
      brandName: this.props.DropChainStore.participants['brand'].name,
    });
  };

  registerBrand = async () => {
    this.setState({loading: true});
    await this.props.DropChainStore.registerBrand(this.state.brandName);
    await this.props.DropChainStore.authUser('brand');
    this.setState({loading: false});
  };

  changeBrandName = (event) => {
    this.setState({brandName: event.target.value});
  };

  changeUnitName = (event) => {
    this.setState({unitName: event.target.value});
  };

  createUnit = async () => {
    this.setState({
      unitName: '',/*,
      loading: true*/
    });
    await this.props.DropChainStore.createUnit(this.state.unitName);
    await this.props.DropChainStore.getTokenBalance();
    await this.props.DropChainStore.getAllowance();
    /*this.setState({loading: false});*/
  };

  pickUnit = (unitId) => {
    this.setState({selectedUnits: [...this.state.selectedUnits, unitId]});
  };

  formOrder = async () => {
    this.setState({loading: true});

    await this.props.DropChainStore.createOrder(this.state.selectedUnits);

    this.setState({
      selectedUnits: [],
      loading: false,
    });
  };

  render() {
    const dropChain = this.props.DropChainStore;

    return (
      <BrandDashboard>
        {dropChain.participants['brand'].registered
          ? (
            <Fragment>
              <BrandInfo
                brandName={dropChain.participants['brand'].name}
                balance={dropChain.participants['brand'].balance}
                address={dropChain.participantAddress}
                approved={dropChain.participants['brand'].allowance}
                approve={() => dropChain.approveTokens()}
              />

              <BrandUnits
                units={dropChain.units}
                unitName={this.state.unitName}
                changeUnitName={this.changeUnitName}
                createUnit={this.createUnit}
              />

              <BrandOrders
                units={dropChain.participantUnits}
                pickUnit={this.pickUnit}
                selectedUnits={this.state.selectedUnits}
                orders={dropChain.participantOrders}
                formOrder={this.formOrder}
              />
            </Fragment>
          ) : (
            <RegisterParticipant
              participant={'brand'}
              name={this.state.brandName}
              changeName={this.changeBrandName}
              register={this.registerBrand}
            />
          )
        }
        {this.state.loading && <div>
          <Overlay/>
          <Spinner/>
        </div>}
      </BrandDashboard>
    );
  }
}

export default Brand;