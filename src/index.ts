import RPCClient from '@ctsy/rpc-client';
declare let require: any;
const ws = require('isomorphic-ws')
export default class RPC extends RPCClient {
    constructor(URL: string, Name: string) {
        super(URL, Name, ws)
    }
}