import * as Client from 'hello_world';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CDSD3YGNHRJFBLCWU7JTX6WON7QPH5MGQKXNO43O55GVESNUZZFNGYTH',
  rpcUrl,
  publicKey: undefined,
});
