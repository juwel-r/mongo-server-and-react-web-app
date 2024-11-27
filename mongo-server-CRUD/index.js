const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // get data
    app.get("/user", async (req, res) => {
      const cursor = userData.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //get single data
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userData.findOne(query);
      res.send(user);
    });

    //create data
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userData.insertOne(newUser);
      res.send(result);
    });

    //Update data
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUserData = {
        $set: {
          name: updatedData.name,
          email: updatedData.email,
        },
      };
      const result = await userData.updateOne(filter, updatedUserData, options);
      res.send(result)
      // console.log(result);
    });

    // delete data
    app.delete("/user/:id", async (req, res) => {
      const currentId = req.params.id;
      const query = { _id: new ObjectId(currentId) };
      const result = await userData.deleteOne(query);
      res.send(result);
      // console.log(currentId)
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
