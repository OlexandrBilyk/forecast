import CitiesCards from "./CitiesCards/CitiesCards";
import CityInfo from "./CityInfo/CityInfo";
import styles from "./WeatherInfo.module.scss";
import { useState } from "react";

export default function WeatherInfo() {
  const [type, setType] = useState(null);

  return (
    <section className={styles.weatherInfo}>
      <CitiesCards setType={setType}></CitiesCards>
      <CityInfo type={type}></CityInfo>
    </section>
  );
}
