import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import News from "../../components/News/News";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import Nature from "../../components/Nature/Nature";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <WeatherInfo></WeatherInfo>
      <News></News>
      <Nature></Nature>
    </>
  );
}
