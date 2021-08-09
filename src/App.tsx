import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Catalogo from "./pages/Catalogo/Catalogo";
import Producto from "./pages/Producto/Producto";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/catalogo" component={Catalogo} />
          <Route exact path="/producto/:id" component={Producto} />
        </Switch>
      </Router>
    
  );
}

export default App;
