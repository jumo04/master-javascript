import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
//componente de login
import Login from './components/login/Login';

//componentes fijos
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
//componentes dinamicos
import Admin from './components/contents/admin/Admin';
import Slide from './components/contents/slide/Slide';
import Gallery from './components/contents/gallery/Gallery';
import Articles from './components/contents/articles/Articles';
import Users from './components/contents/users/Users';
import Error404 from './components/contents/404/Error404';


function App() {
  const auth = getAccessToken();

  if (!auth) {
    return (<Login />);
  }

  return (  
    <div className="wrapper">
      <Header />

      <Sidebar />

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route exact path="/slide" component={Slide} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/users" component={Users} />
          <Route  component={Error404} />
        </Switch>
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}


function getAccessToken() {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const id = localStorage.getItem('ID');
  const username = localStorage.getItem('USUARIO');
  if (!token  || token === 'null'|| !username || username === 'null' || !id  || id === 'null' ) {
    return false;
  }
  const decode = jwtDecode(token);
  if (!decode.admin) {
    return false;
  }
  //validamos que el token coincida
  if(isExpired(token) || decode.admin._id !== id || decode.admin.username !== username) {
    return false;
  }else{
    return true;
  }
}

//funcion para verificar fecha de exp del token
const isExpired = (token) => {
  const decode = jwtDecode(token);
  const now = (Date.now()+60 )/ 1000;
  const expires = decode.exp;
  return expires < now;
}

export default App;
