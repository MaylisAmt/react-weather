import { useEffect, useState } from "react";
import loader from "./assets/loader.svg"
import browser from "./assets/browser.svg"
import "./App.css"
//Pour que la key soit dans un fichier à part, non visible sur le repo
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  //Quand de base on n'a pas les données on les fait démarrer à null
  const[weatherData, setWeatherData] = useState(null)
  const[errorInfo, setErrorInfo] = useState(null)

  //On crée le useEffect avec la fonction callback et en 2ème argument le tableau des dépendances
  useEffect(() => {

    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
    .then(response => {
      console.log("json", response)
      //La méthode fetch ne catche pas toutes les erreurs donc il y en a qu'on doit gérer manuellement :
      //400 - 499 : erreurs client
      //500 - 599 : erreurs serveur
      if(!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)
      return response.json()
    })
    .then(data => {
      setWeatherData({
        city: data.data.city,
        country: data.data.country,
        iconId: data.data.current.weather.ic,
        temperature: data.data.current.weather.tp
      })
    })
    .catch(err => {
      console.log("err", err)
      setErrorInfo(err.message)
    })

  }, [])
 
  return (
      <>
      <main>
        {/* Ajoute la class active seulement quand weatherData est false */}
        <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
          <img src={loader} alt="loading icon" />
        </div>

        {weatherData && (
          <>
            <p className="city-name">{weatherData.city}</p>
            <p className="country-name">{weatherData.country}</p>
            <p className="temperature">{weatherData.temperature}°C</p>
            <div className="info-icon-container">
             <img className="info-icon" src={`/icons/${weatherData.iconId}.svg`} alt="weather icon" />
            </div>
          </>
        )}

        {(errorInfo && !weatherData) && (
          <>
            <p className="error-information">{errorInfo}</p>
            <img src={browser} alt="error icon" />
          </>
        )}
        
      </main>
      </>
  
  );
}

export default App;
