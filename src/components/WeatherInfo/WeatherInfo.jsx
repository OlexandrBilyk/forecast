import CitiesCard from "./CitiesCard/CitiesCard";
import styles from "./WeatherInfo.module.scss";

export default function WeatherInfo() {
  return (
    <section className={styles.weatherInfo}>
      <CitiesCard></CitiesCard>
    </section>
  );
}
