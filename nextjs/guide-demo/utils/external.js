import { MongoClient } from "mongodb";

export const fetch_collection = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://username:password@clusterforreact.th81rp3.mongodb.net/nextjs?retryWrites=true&w=majority",
  );
  const db = client.db();
  const collection = db.collection("nextjs");
  return [collection, client];
};
