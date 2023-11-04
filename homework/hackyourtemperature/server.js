import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const message = "hello from backend to frontend!";
  res.send(message);
});

app.post("/weather", (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      throw new Error("City name doesn't exist");
    }
    res.send(`City: ${cityName}`);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
