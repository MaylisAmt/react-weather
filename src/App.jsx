import loader from "./assets/loader.svg"

function App() {
 
  return (
      <>
      <main>
        <div className="loader-container">
          <img src={loader} alt="loading icon" />
        </div>
        <p className="city-name">Miami</p>
        <p className="country-name">USA</p>
        <p className="temperature">27°C</p>
        <div className="info-icon-container">
          <img src="../public/icons/02d.svg" alt="weather icon" />
        </div>
      </main>
      </>
  
  );
}

export default App;
