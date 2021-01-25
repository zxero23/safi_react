import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from '../components/Table/table';

import M from  'materialize-css/dist/js/materialize.min.js';

const cookies = new Cookies();

class Menu extends Component {

    state={
        form:{
            descripcion: ''
            
        }
    }

    cerrarSesion=()=>{        
        cookies.remove('usuario', {path: "/"});
        cookies.remove('contrasenia', {path: "/"});
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
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
           
        });
    }
    
    

    render() {
           
        console.log('nombre: '+cookies.get('usuario'));
        console.log('username: '+cookies.get('contrasenia'));
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
                    type="text"
                    placeholder="Descripción"
                    className="form-control"
                    name="username"                   
                    onChange={this.handleChange}
                    />
                  <button className = "btn btn-primary" onClick={()=>this.cerrarSesion()}>Buscar</button>  
                  <button className = "btn btn-primary" onClick={()=>this.cerrarSesion()}>Actualizar</button>          
                  </div>
              </div>
            </div>
            </div>
            
            <div className="col s7">
              <Table/>
            </div>
            </div>
        </div>
        );
    }
}

export default Menu;