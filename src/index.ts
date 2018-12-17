import RPCClient from '../../castle-rpc-client/dist/index';
declare let require: any;
const ws = require('isomorphic-ws')
export default class RPC extends RPCClient {
    constructor(URL: string, Name: string) {
        super(URL, Name, ws)
    }
    registServiceByObject(pathSuffix: string, obj: any) {

    }
}