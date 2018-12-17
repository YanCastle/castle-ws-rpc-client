import RPC from './index';
import { ClientEvent } from '../../castle-rpc-client/dist/index';
const rpc = new RPC('ws://192.168.31.22:9090/', 'abc')
rpc.on(ClientEvent.LOGINED, async () => {
    console.log('logined')
    let i = 1;
    while (i > 0) {
        console.log(i)
        try {
            let t = Date.now()
            console.log(await rpc.request('Test/test', {}), Date.now() - t)
        } catch (error) {
            console.log(error)
        }
        // await timeout()
        i++
    }
})
function timeout(time = 100) {
    return new Promise((s) => {
        setTimeout(s, time)
    })
}