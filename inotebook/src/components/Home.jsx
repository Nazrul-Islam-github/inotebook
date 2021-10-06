import React from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
import Notes from "./Notes";


const Home = ({showAlert}) => {
  return (
    <>
      
      <div className="container my-3">
  

        <Notes showAlert={showAlert} />
      </div>
    </>
  );
};

export default Home;
