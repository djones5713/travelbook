import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TravelBook from './Components/TravelBook/TravelBook';
import SignUp from './Components/TravelBook/SignUp/SignUp';
import About from './Components/TravelBook/About/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <TravelBook />
    <Switch>
        <Route path="/" />
        <Route path="/signup" component={SignUp} />
        <Route path="/how-it-works" component={About} />
        <Route path='*'
        render={() => {
          return <div>PAGE NOT FOUND</div>
        }} />
    </Switch>
    </div>
 
  );
}

export default App;
