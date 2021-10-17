import { DataProvider } from "./components/data-provider/DataProvider";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import CityPage from "./components/CityPage";
import './App.css';

function App() {
  return (
    <div className="aqi">
      <DataProvider>
        <Router>
          <Switch>
            <Route path="/city/:city" component={CityPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
