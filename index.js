const express = require("express");
const app = express();

app.get("/reward", (req, res) => {
  const { user_id, reward_amount, transaction_id } = req.query;

  // Log reward
  console.log(`User ${user_id} earned ${reward_amount} points. TxID: ${transaction_id}`);

  // TODO: Update points in your database (like Firebase) here

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
