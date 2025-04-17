const express = require("express");
const admin = require("firebase-admin");
const app = express();
require("dotenv").config();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
  databaseURL: process.env.FIREBASE_DB
});

const db = admin.database();

app.get("/reward", async (req, res) => {
  const { user_id, reward_amount, transaction_id } = req.query;

  if (!user_id || !reward_amount) return res.status(400).send("Missing parameters");

  try {
    const ref = db.ref(`users/${user_id}/points`);
    const snapshot = await ref.once("value");
    const currentPoints = snapshot.val() || 0;
    const updatedPoints = parseInt(currentPoints) + parseInt(reward_amount);

    await ref.set(updatedPoints);

    console.log(`Updated points for ${user_id} to ${updatedPoints}`);
    res.status(200).send("Reward updated");
  } catch (e) {
    console.error("Error updating points:", e);
    res.status(500).send("Error updating points");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
