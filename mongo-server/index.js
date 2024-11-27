const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

//run server
app.listen(port, () => {
  console.log(`Server is running on- ${port}`);
});

//api's actions
app.get("/", (req, res) => {
  res.send("server is running fine!");
});

const uri =
  "mongodb+srv://juweljem:8ctoLoa13Wf0w9Z1@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userDB");
    const userData = database.collection("userInfo");
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userData.insertOne(newUser);
      res.send(result);
      console.log(
        `successfully inserted ${result} - data - ${result.insertedCount} - ID ${result.insertedId}`
      );
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
