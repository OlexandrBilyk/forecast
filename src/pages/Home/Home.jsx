import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import News from "../../components/News/News";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import Nature from "../../components/Nature/Nature";
import Footer from "../../components/Footer/Footer";
import Burger from "../../components/Burger/Burger";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header setIsOpen={setIsOpen}></Header>
      <Hero></Hero>
      <WeatherInfo></WeatherInfo>
      <News></News>
      <Nature></Nature>
      <Footer></Footer>
      <Burger isOpen={isOpen}></Burger>
    </>
  );
}
