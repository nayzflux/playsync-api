import express from "express";

const app = express();

const PORT = process.env.PORT!;

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello world!" });
});

app.listen(PORT, () => console.log(`Server is listening on port :${PORT}`));
