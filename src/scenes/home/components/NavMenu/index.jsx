'use strict';

import React from 'react';
import {observer, inject} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';

import {Navigation, Button, Logo} from './styles';

@withRouter
@inject('DropChainStore')
@observer
export default class NavMenu extends React.Component {
  render() {
    const dropChain = this.props.DropChainStore;

    return (
      <Navigation>
        <Logo/>

        {Object.keys(dropChain.participants).map(participant => {
          const participantUrl = `/${participant.replace('-', '/')}`;

          return (
            <Link to={participantUrl} key={participant}>
              <Button
                active={location.pathname.includes(participantUrl)}
                onClick={() => dropChain.authUser(participant)}
              >
                {
                  dropChain.participants[participant].registered
                    ? dropChain.participants[participant].name
                    : participant
                }
              </Button>
            </Link>
          );
        })}
      </Navigation>
    );
  }
}
