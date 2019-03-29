'use strict';

// Std modules
import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import injectGlobalStyles from 'css/globalStyles';

// Styles
import 'css/main.css';

// Components
import AppLoader from 'components/AppLoader';

// Allow modity MobX store only by using @actions
useStrict(true);

// Apply global styles
injectGlobalStyles();

// Render app
ReactDOM.render(
  <AppLoader/>,
  document.getElementById('root'),
);

// Init Application
