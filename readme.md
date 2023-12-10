## CursusDB Node.JS Native Client Module

## How to use
```
import { cluster } from 'cursusdb-node'

// cluster host, cluster port, db user username, db user password, tls enabled
cluster.connect("0.0.0.0", "7681", "username", "password", false).then(async (cluster) => {
    const results = await cluster.query("select * from users;")

    console.log(results)

    // Always close up shop
    cluster.close()

}).catch((err) => {
    console.log(err)
})

```