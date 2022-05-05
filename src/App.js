import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Products from './pages/Products'

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

        await fetch(`${process.env.API_URL_LOCATION}zip=${zip}&country=${country}`)
          .then(res=>res.json())
          .then(result => {
            setCity(result.name)
            console.log(city)
          })

      console.log("Latitude is: ", lat)
      console.log("Longitude is: ", lon)
      }
       fetch(`${process.env.API_URL_WEATHER}?lat=${lat}&lon=${lon}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res=>res.json())
        .then(result => {
          setForecast(result)
          console.log(result)
          console.log(`${process.env.REACT_APP_API_URL}?lat=${lat}&lon=${lon}$units=imperial&APPID=${process.env.REACT_API_KEY}`)
        })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          //handle error here
        }
      })
      return () => {
        controller.abort();
      }
      }
    
    fetchData();
    
  }, [lat, lon]);


function App() {
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
