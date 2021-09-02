import React from "react";
import heroPic from "./Components/images/mexicanfood.png";
import "./App.css";
import EnhancedTable from "./Components/MaterialUI/tables";
import Logo from "./Components/logo";
import GitHubIcon from "@material-ui/icons/GitHub";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={heroPic} className="heroPic" alt="logo" />
      </header>
      <section className="tableSect">
        <EnhancedTable />
      </section>
      <section className="Logo">
        <Logo />
      </section>
    </div>
  );
}

export default App;
