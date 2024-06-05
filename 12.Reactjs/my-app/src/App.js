import logo from "./logo.svg"; //hay que importar los archivos con import y no con la ruta como en otros
import "./App.css";

import HolaMundo from "./HolaMundo";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import Container from "./components/container/Container";
import Footer from "./components/footer/Footer";
import { Fragment } from "react";

function App() {
  let objHeader = {
    title: "Mi primer sitio en Bootstrap 4",
    subtitle: "este sitio es responsivo",
  }

  const fecha = new Date().getFullYear();
  return (
    <Fragment>
      <Header title={objHeader.title} 
              subtitle={objHeader.subtitle} 
      />
      <Nav />
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="row">
          <Sidebar />
          <Container />
        </div>
      </div>
      <Footer date={fecha}/>
    </Fragment>
  );
}

export default App;
