'use strict'

const { db  } = require('./server/db')
const app = require('./server')
const PORT = 1337

async function SyncDb(){

	await db.sync()

    console.log('db synced')
    app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
}

SyncDb()
