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
  } else {
    const cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`);
    const modifiedCityData = await cityData.json();

    const lat = modifiedCityData.coord.lat;
    const lon = modifiedCityData.coord.lon;

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keys.API_KEY}`);
    const weatherData = await weather.json();

    const todaysWeather = { cityName: cityName, temperature: weatherData.main.temp };

    return res.status(200).send(todaysWeather);
  }
});

export default app;
