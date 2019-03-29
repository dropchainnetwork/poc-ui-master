'use strict';

import authData from '../../../dropchain-poc/authData.json';

class AuthAPI {
  authorizeUser(role) {
    return authData[role];
  }
}

export default new AuthAPI();