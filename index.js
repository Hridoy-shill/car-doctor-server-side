// step-4 require mongodb and dotenv for hide user id and password of database-------
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()



// step-1 set express and cors and port-----------------
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;




// step-2 middleware--------------
app.use(cors());
app.use(express.json());



// step-5 MongoDB connection------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fawgdio.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

        // step-6 stop client side closing--------------
        
        // await client.close();
    }
}
run().catch(console.dir);




// step-3 testing server---------------
app.get('/', (req, res) => {
    res.send('the server side is running')
})

app.listen(port, () => {
    console.log(`car doctor server running from ${port}`);
})