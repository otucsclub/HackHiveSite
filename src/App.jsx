import React from "react";
import Hero from "./components/Hero";
import Sponsors from "./components/Sponsors";
import Form from "./components/Form";
export default function App(){
  return (
    <div className="app">
      <Hero />
      <Sponsors />
      <Form />
    </div>
  );
}
