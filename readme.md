## How to use
```
import cursusdb from 'cursusdb-node'

// cluster host, cluster port, db user username, db user password, tls enabled
cursusdb.Connect("0.0.0.0", "7681", "username", "password", false).then(async (cluster) => {
    const results = await cursusdb.Query("select * from users;")

    console.log(results)

    // Close whenever
    cursusdb.Close()

}).catch((err) => {
    console.log(err)
})

```