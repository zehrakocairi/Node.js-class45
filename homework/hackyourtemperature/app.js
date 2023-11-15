import express from "express";
import keys from "./sources/keys.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`hello from backend to frontend!`);
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(404).send({ weatherText: "City is not found!" });
  }

  const cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`);

  if (cityData.status == 404) {
    return res.status(404).send({ weatherText: "Where is this city. Are you sure it's on the planet?" });
  }

  const modifiedCityData = await cityData.json();
  const todaysWeather = { cityName: cityName, temperature: modifiedCityData.main.temp };
  return res.status(200).send(todaysWeather);
});

export default app;
