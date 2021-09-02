import React, { Component } from "react";
import heroPic from "./Components/images/mexicanfood.png";
import "./App.css";
import EnhancedTable from "./Components/MaterialUI/tables";
import Logo from "./Components/logo";
import Axios from "axios";


export default class react extends Component {

  state = {
    recipes: []
  }

  async componentDidMount() {
    let recipes = [];
    try {
      const { data } = await Axios.get('/recipes.json');
      recipes = data.results;
      this.setState({ recipes });
    } catch (error) {
      console.error('something went wrong!', error);
    }

  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={heroPic} className="heroPic" alt="logo" />
        </header>
        <section className="tableSect">
          <EnhancedTable rows={recipes} />
        </section>
        <section className="Logo">
          <Logo />
        </section>
      </div>
    );
  }
}
