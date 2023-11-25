## How to use
```
import cursusdb from 'cursusdb-node'

cursusdb.Connect("0.0.0.0", "7681", "username", "password").then(async (cluster) => {
    const results = await cursusdb.Query("select * from users;")

    console.log(results)

    // Close whenever
    cursusdb.Close()

}).catch((err) => {
    console.log(err)
})

```