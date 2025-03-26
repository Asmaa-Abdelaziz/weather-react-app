import PropTypes from "prop-types";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Card } from "react-bootstrap";

// Weather descriptions and icons
const weatherDescriptions = {
  0: { desc: "Clear sky", icon: "☀️" },
  1: { desc: "Mainly clear", icon: "🌤" },
  2: { desc: "Partly cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Fog", icon: "🌫" },
  48: { desc: "Depositing rime fog", icon: "🌫" },
  51: { desc: "Drizzle: Light", icon: "🌦" },
  53: { desc: "Drizzle: Moderate", icon: "🌦" },
  55: { desc: "Drizzle: Dense", icon: "🌦" },
  71: { desc: "Snowfall: Light", icon: "❄️" },
  73: { desc: "Snowfall: Moderate", icon: "❄️" },
  75: { desc: "Snowfall: Heavy", icon: "❄️" },
  80: { desc: "Rain showers: Light", icon: "🌦️" },
  81: { desc: "Rain showers: Moderate", icon: "🌦" },
  82: { desc: "Rain showers: Violent", icon: "🌦" },
  95: { desc: "Thunderstorm: Light", icon: "⛈" },
  96: { desc: "Thunderstorm: Moderate", icon: "⛈" },
  99: { desc: "Thunderstorm: Heavy", icon: "⛈" },
};

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long", day: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
}

// WeatherCards component
function WeatherCards({ weatherData }) {
  const firstFiveDates = weatherData.time.slice(0, 5);
  const firstFiveMax = weatherData.temperature_2m_max.slice(0, 5);
  const firstFiveMin = weatherData.temperature_2m_min.slice(0, 5);
  const firstFiveCodes = weatherData.weathercode.slice(0, 5);

  return (
    <Row>
      {firstFiveDates.map((date, index) => (
        <DayCard
          key={date}
          date={formatDate(date)} // Formatting the date
          max={firstFiveMax[index]}
          min={firstFiveMin[index]}
          code={firstFiveCodes[index]}
        />
      ))}
    </Row>
  );
}

// To format eslint error using propTypes
WeatherCards.propTypes = {
  weatherData: PropTypes.shape({
    time: PropTypes.array.isRequired,
    temperature_2m_max: PropTypes.array.isRequired,
    temperature_2m_min: PropTypes.array.isRequired,
    weathercode: PropTypes.array.isRequired,
  }).isRequired,
};

// DayCard component
function DayCard({ date, max, min, code }) {
  const weatherDescription = weatherDescriptions[code] || {
    desc: "Unknown",
    icon: "❓",
  };

  return (
    <Col xs={12} md={6} lg={4}>
      <Card className="my-2 py-0">
        <Card.Title className="bg-primary text-white py-1 rounded">
          {date}
        </Card.Title>
        <Card.Body>
          <p>
            {weatherDescription.icon} {weatherDescription.desc}
          </p>
          <p>Max: {max}&deg;C</p>
          <p>Min: {min}&deg;C</p>
        </Card.Body>
      </Card>
    </Col>
  );
}

// To format eslint error using propTypes
DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  code: PropTypes.number.isRequired,
};

export default WeatherCards;
