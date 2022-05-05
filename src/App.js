import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Products from './pages/Products'
import React, { useEffect, useState } from 'react';


function App() {

  let weatherUrl = '/api/weather?';

  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [errors, setErrors] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [forecast, setForecast] = useState('');

//get location via browser geolocation
useEffect(() => {
  const controller = new AbortController();
  
      const fetchData = async () => {
      if (!navigator.geolocation) {
        setErrors(errors => [...errors, "Location not supported"]);
      } else {
          navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
          });
          
          console.log(`${weatherUrl}latitude=${lat}&longitude=${lon}`);
          await fetch(`${weatherUrl}latitude=${lat}&longitude=${lon}`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then(res=>res.json())
          .then(result => {
            setForecast(result)
            console.log(result)
            // console.log(`${process.env.API_URL_WEATHER}latitude=${lat}&longitude=${lon}`)
          })
          
          // await fetch(`${process.env.API_URL_LOCATION}zip=${zip}&country=${country}`)
          //   .then(res=>res.json())
          //   .then(result => {
          //     setCity(result.name)
          //     console.log(city)
          //   })
  
        console.log("Latitude is: ", lat)
        console.log("Longitude is: ", lon)
        }
        //  fetch(`${process.env.API_URL_WEATHER}latitude=${lat}&longitude=${lon}`)
        //   .then(res=>res.json())
        //   .then(result => {
        //     setForecast(result)
        //     console.log(result)
        //     console.log(`${process.env.API_URL_WEATHER}latitude=${lat}&longitude=${lon}`)
        //   })
        // .catch((err) => {
        //   if (err.name === 'AbortError') {
        //     console.log('successfully aborted');
        //   } else {
        //     //handle error here
        //   }
        // })
        return () => {
          controller.abort();
        }
        }
      
      fetchData();
      
    }, [lat, lon]);

  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/reports' component={Reports} />
        <Route path='/products' component={Products} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
