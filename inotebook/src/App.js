import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import About from './components/About'
import NoteState from "./context/notes/NotesState";
function App() {
  return (
    <>
      <NoteState>



        <Router>
          <Switch>


            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>


          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
