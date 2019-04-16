import RPCClient from '@ctsy/rpc-client';
import { RPC, RPCType } from '@ctsy/rpc';
declare let require: any;
const ws = require('isomorphic-ws')
export default class WSRPC extends RPCClient {
    url: string = ""
    ws: WebSocket;
    _waiting = [];
    _logined = false;
    constructor(url: string, Name: string) {
        super(Name);
        this.url = url;
    }
    create() {
        this._logined = false;
        this.ws = new ws(this.url)
        this.ws.binaryType = 'arraybuffer'
        this.ws.onopen = (ev) => {
            this.onopen();
        }
        this.ws.onmessage = (ev) => {
            this.onmessage(ev.data, this.ws);
        }
        this.ws.onclose = (ev) => {
            setTimeout(() => {
                this.create()
            }, 1000)
        }
        this.ws.onerror = (ev) => {
            setTimeout(() => {
                this.create()
            }, 1000)
        }
    }
    async send(rpc: RPC) {
        if (this.ws.readyState == this.ws.OPEN) {
            this.ws.send(rpc.encode())
        } else {
            this._waiting.push(rpc)
        }
    }
    async onopen() {
        try {
            await this.request('', '', { Type: RPCType.Login, Timeout: 10 })
        } catch (error) {
            this.ws.close()
        }
    }
}