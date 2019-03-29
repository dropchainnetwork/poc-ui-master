'use strict';

import React, {Fragment} from 'react';
import DevTools from 'mobx-react-devtools';
import {Provider, observer} from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';

import config from 'config';
import Home from 'scenes/home';
import DropChainStore from 'stores/DropChainStore';

@observer
export default class AppLoader extends React.Component {
  render() {
    const stores = {
      DropChainStore
    };

    return (
      <BrowserRouter>
        <Provider {...stores}>
          <Fragment>
            <Home/>
            {config.displayDevTools && <DevTools/>}
          </Fragment>
        </Provider>
      </BrowserRouter>
    );
  }
}
