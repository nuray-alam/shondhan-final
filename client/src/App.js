import './App.css';
import React from "react";
import logo from './logo.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Blood from './components/Blood/Blood';
import Missing from './components/Missing/Missing';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <div className="App">
      <Router>
        <div className='header'>
          <div className="title-section">
            <div className="group">
              <img src={logo} alt="" />
              <h1>Shondhan</h1>
            </div>

          </div>

          <nav>
            <Link to="/home">Home</Link>
            <Link to="/blood_donors">Blood Donors</Link>
            <Link to="/missing_post">Missing Post</Link>
          </nav>
        </div>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/blood_donors'>
            <Blood></Blood>
          </Route>
          <Route exact path='/missing_post'>
            <Missing></Missing>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
