export default function WeatherIcon({ icon, className }) {
  const url = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return <img src={url} alt="weather" className={className}/>;
}
