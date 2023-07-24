import "./App.css";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = "791ee0783d264ce08ab230111230507";

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  };

  const fetchWeatherData = () => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=5`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.forecast.forecastday);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  return (
    <>
      <section className="overlay">
        <div className="main">
          <div className="title">
            <h1 className="title">Weather Info App</h1>{" "}
            <div className="inputdata">
              {searchResults.length === 0 ? (
                <form onSubmit={handleFormSubmit}>
                  <div className="cityname">
                    <input
                      type="search"
                      placeholder="Search by City name , State , Country Code..."
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    ></input>
                  </div>
                </form>
              ) : (
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="mySwiper"
                >
                  {searchResults.map((result, index) => (
                    <>
                      <SwiperSlide key={index}>
                        <h2>Date :{result.date}</h2>
                        <br />
                        <h2>Moon Phase: {result.astro.moon_phase}</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <h2>Max Temp: {result.day.maxtemp_c}°C</h2>
                        <br />
                        <h2>Min Temp: {result.day.mintemp_c}°C</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <br />
                        <br></br>
                        <br />
                        <h2>Pressure: {result.day.avgvis_km} km</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <br />
                        <br />
                        <br></br>
                        <h2>Clouds: {result.day.avghumidity}%</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <h2>Wind Degree: {result.day.maxwind_degree}°</h2>
                        <br />{" "}
                        <h2>Wind Speed: {result.day.maxwind_kph} km/h</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <h2>Sunrise: {result.astro.sunrise}</h2>
                        <br />
                        <h2> Sunset: {result.astro.sunset}</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <h2>Moonset: {result.astro.moonset}</h2>
                        <br />
                        <h2>Moon-rise: {result.astro.moonrise}</h2>
                      </SwiperSlide>
                      <SwiperSlide>
                        <h2>
                          <br></br>Total Precipitate:{" "}
                          {result.day.totalprecip_mm}
                        </h2>
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
