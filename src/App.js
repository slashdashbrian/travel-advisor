import React, { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from "./api";

import { CssBaseline, Grid } from "@material-ui/core";
const App = () => {
  const [places, setPlaces] = useState([]);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coords, setCoords] = useState({});

  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(false);

  const [loading, setLoading] = useState(false);

  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("");

  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne && type) {
      setLoading(true);
      getWeatherData(coords.lat, coords.lng).then((data) => {
        setWeatherData(data);
      });
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [bounds, type]);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Map
            setBounds={setBounds}
            setCoordinates={setCoords}
            coordinates={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
