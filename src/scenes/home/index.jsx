'use strict';

import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {observer, inject} from 'mobx-react';

import DropChainStore from 'stores/DropChainStore';
import NavMenu from './components/NavMenu';
import Brand from 'scenes/brand';
import Distributor from 'scenes/distributor';
import SMB from 'scenes/smb';
import {Container, Content} from './styles';

const Greeting = () => (
  <section>
    <h1>Welcome to DropChain POC!</h1>
    <h3>Choose your role in nav bar on left.</h3>
  </section>
);

@withRouter
@inject('DropChainStore')
@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () =>  {
    const dropChain = this.props.DropChainStore;

    await dropChain.checkAuthenticatedUsers();
    await dropChain.loadCreateUnitEvents();
    await dropChain.loadCreateOrderEvents();
    await dropChain.loadCreateCustomOrderEvents();
    await dropChain.loadCheckInOrderEvents();
    await dropChain.loadDeactivateOrderEvents();
    await dropChain.loadReceiveOrderEvents();
  };

  render() {
    return (
      <Container>
        <NavMenu/>

        <Content>
          <Switch>
            <Route path="/brand" component={Brand}/>
            <Route path="/distributor/:id" component={Distributor}/>
            <Route path="/smb" component={SMB}/>
            <Route exact path="/" component={Greeting}/>
          </Switch>
        </Content>
      </Container>
    );
  }
}
