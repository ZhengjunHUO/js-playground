import { MongoClient } from "mongodb";

// API url for /api/new
const createHandler = async (req, resp) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://firelouis:Y91NfR2lb5mPa5qV@clusterforreact.th81rp3.mongodb.net/nextjs?retryWrites=true&w=majority",
    );
    const db = client.db();
    const collection = db.collection("nextjs");
    const rslt = await collection.insertOne({ data });
    // log printed out at server side
    console.log(rslt);
    client.close();

    resp.status(201).json({ message: "Entry added succesfully." });
  }
};

export default createHandler;
