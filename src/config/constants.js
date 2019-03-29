'use strict';

const ADDRESS_TO_PARTICIPANT = {
  '0x14e5486c5fcaa8f0495fc055f1ee9b38e7a226e2': 'brand',
  '0xa054fb92b2aa41dab47abdb1b449f3c553df5858': 'distributor-1',
  '0xdd313d6d4d80aeee75cf13c1db8a70fb5b56eece': 'distributor-2',
  '0x5e5e62c2f218b358c4adb009b17fe32dc2a91578': 'smb'
};

const PARTICIPANT_ROLE_TO_ADDRESS = {
  'brand': '0x14e5486c5fcaa8f0495fc055f1ee9b38e7a226e2',
  'distributor-1': '0xa054fb92b2aa41dab47abdb1b449f3c553df5858',
  'distributor-2': '0xdd313d6d4d80aeee75cf13c1db8a70fb5b56eece',
  'smb': '0x5e5e62c2f218b358c4adb009b17fe32dc2a91578'
};

export default {
  ADDRESS_TO_PARTICIPANT,
  PARTICIPANT_ROLE_TO_ADDRESS
}