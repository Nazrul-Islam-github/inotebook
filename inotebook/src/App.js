import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import About from './components/About'
import NoteState from "./context/notes/NotesState";
import Login from './components/Login';
import Alert from './components/Alert'
import Signup from './components/Signup'
import Navbar from "./components/Navbar";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>



        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Switch>


            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>

          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
