import React  from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Mapa from '../pages/MapView';

function routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />   
            <Route exact path="/menu" component={Menu}/>  
            <Route exact path="/mapa" component={Mapa}/>       
        </Switch>
    </BrowserRouter>
  );
}

export default routes;
