import { fetch_collection } from "../../utils/external";

// API url for /api/new
const createHandler = async (req, resp) => {
  if (req.method === "POST") {
    const data = req.body;

    const [collection, client] = await fetch_collection();
    const rslt = await collection.insertOne({ data });
    // log printed out at server side
    console.log(rslt);
    client.close();

    resp.status(201).json({ message: "Entry added succesfully." });
  }
};

export default createHandler;
