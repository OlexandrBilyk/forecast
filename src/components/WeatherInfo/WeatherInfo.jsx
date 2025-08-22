import CitiesCards from "./CitiesCards/CitiesCards";
import CityInfo from "./CityInfo/CityInfo";
import MoreInfo from "./MoreInfo/MoreInfo";
import styles from "./WeatherInfo.module.scss";
import { useState } from "react";

export default function WeatherInfo() {
  const [type, setType] = useState(null);
  const [name, setName] = useState("");

  return (
    <section className={styles.weatherInfo}>
      <CitiesCards setType={setType} setName={setName}></CitiesCards>
      <MoreInfo name={name}></MoreInfo>
      <CityInfo type={type}></CityInfo>
    </section>
  );
}
