## CursusDB Node.JS Native Client Package
cursusdb-node is the official CursusDB Native Client package for Node.JS

https://cursusdb.com

## npm
https://www.npmjs.com/package/cursusdb-node

## How to use
The Client class takes a cluster fqdn or ip, port, db user username, db user password, and whether you want TLS true or false(cluster must have tls enabled).

```
import Client from 'cursusdb-node'

(async function() {
    const client = new Client("0.0.0.0", "7681", "username", "password", false)

    client.Connect().then((res) => {
        console.log(res)

            client.Query(`ping;`).then((res) => {
                console.log(res)
                client.Close()
            })
    }).catch((err) => {
        console.error(err)
    })
})()

```