import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from '../components/Table/table';
import Footer from './layout/Footer';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import M from  'materialize-css/dist/js/materialize.min.js';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

  

class Menu extends Component {

    
    state = {
        descripcion: '',
        visible:false
       }

       

    cerrarSesion=()=>{        
        cookies.remove('usuario', {path: "/"});
        cookies.remove('contrasenia', {path: "/"});
        cookies.remove('usuario', {path: "/menu"});
        cookies.remove('contrasenia', {path: "/menu"});
        window.location.href='./';
    }

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
        if(!cookies.get('usuario')){
            window.location.href="./";
        }
    }

    handleChange=async e=>{
        await this.setState({
            descripcion:
                 e.target.value   ,          
                visible:false
           
        });

    }

    
    
       

    
   
    

    
    
    

    render() {
           
        
        return (
            <div>
                <nav className='blue' >
                    <div className="container">
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li>  <button className = "btn btn-primary" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button></li>
                        </ul>
                    </div>
                </nav>

                {/* valores menu lateral en mobiles papu  */}
                <ul id="slide-out" className="sidenav">
                    <li><a href="#item1">Item 1</a></li>
                    <li><a href="#item2">Item 2</a></li>
                    <li><a href="#item3">Item 3</a></li>
                </ul>
            
                
            
            <div className="container">
            <div className="row">
              <div className="col s7">
                <div className="card">
                  <div className="card-content">
                  <input
                    className={useStyles.inputMaterial}               
                    type="text"
                    placeholder="Descripción"
                    className="form-control"
                    name="descripcion"                   
                   onChange={this.handleChange}
                    />
                  <button className = "btn btn-primary" onClick={()=>this.setState({visible:true})}>Buscar</button>  
                  <button className = "btn btn-primary" onClick={()=>this.setState({descripcion: '',visible:false })}>Actualizar</button>          
                  </div>
              </div>
            </div>
            </div>
            
            <div className="col s7">
              {this.state.visible? <Table  descripcion={this.state.descripcion}/>:<div></div>}
            </div>
            </div>
            <div>

            </div>
        
        </div>
        );
    }
}

export default Menu;