import { getClient } from './client.js';

class Working {
    register(data) {
        (async() => {
            let client = await getClient()
            console.log(client)
        })();
    }
    get_password(data) {

    }
}

let obj = new Working();
obj.register();
