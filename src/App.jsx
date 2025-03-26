import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import WeatherCards from "./components/weatherCards";

function App() {
  const [location, setLocation] = useState("cairo");
  const [displayLocation, setDisplayLocation] = useState("");
  const [locationError, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  function handleWrite(e) {
    setLocation(e.target.value);
  }
  useEffect(
    () =>
      async function fetchingWeatherData() {
        try {
          setError("");
          setWeatherData(null);
          setLoading(true);

          // 1. Get coordinates for written location
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          if (!geoData.results || geoData.results.length === 0)
            throw new Error("Location not found");
          // 2. Get weather data
          const { latitude, longitude, timezone, name, country_code } =
            geoData.results[0];
          setDisplayLocation(name);
          // console.log(latitude, longitude, timezone, name, country_code);
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&days=5`
          );
          const weatherData = await weatherRes.json();
          setWeatherData(weatherData.daily);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      },
    [location]
  );
  return (
    <main className="text-center">
      <div className="header text-white">
        <i className="fa-solid fa-cloud-moon me-1"></i>
        Weather App
      </div>
      <Container>
        <Form.Control
          type="text"
          placeholder="Search for location...."
          className="mt-3"
          value={location}
          onChange={(e) => handleWrite(e)}
        />
        {isLoading && <p className="loader">Loading...</p>}

        {!isLoading && !locationError && weatherData && (
          <>
            <p className="text-white mb-0">{displayLocation}</p>
            <WeatherCards weatherData={weatherData} />
          </>
        )}
        {locationError && location && (
          <p className="text-danger mt-5">{locationError}</p>
        )}
        {locationError && location === "" && (
          <p className="text-warning mt-5">Write location to search for... </p>
        )}
      </Container>
    </main>
  );
}

export default App;
