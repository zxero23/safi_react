import React,{useState} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input/input';
import Title from '../components/Title/title';
import Label from '../components/Label/label';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://192.168.0.15:5000/users";
const cookies = new Cookies();

const  Login=()=> {

    const [user,setUser]=useState('');
    const [pass,setPass]=useState('');

    function handleChange(name,value){
        if (name=='usuario'){
                setUser(value);                
        }else if (name=='contrasenia'){
            setPass(value);
        }
    }

    function match(username,password){
        return username===user && password===pass;
    }


    async function  iniciarSesion(){
        await axios.get(baseUrl, {params: {nombre_usuario: user, clave_acceso: pass}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0 ){
                var respuesta=response[0];
                if ( match(respuesta.nombre_usuario,respuesta.clave_acceso)){
                        cookies.set('usuario', respuesta.nombre_usuario, {path: "/"});
                        cookies.set('contrasenia', respuesta.clave_acceso, {path: "/"});                    
                        alert(`Bienvenido ${respuesta.nombre_usuario} ${respuesta.clave_acceso}`);
                        window.location.href="./menu";
                }else{
                    alert('El usuario o la contraseña no son correctos');
                }
                
            }else{
                alert('Error');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    function  handleSubmit(){
        iniciarSesion();
    }

    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">  
            <div className="form-group">          
                <Title text={'SAFI REACT'}/>
                <Label text={'Ingrese el nombre de usuario'}/>
                
                <Input 
                    className="form-control"
                    atributte={{
                        id:'usuario',
                        name:'usuario',
                        type:'text',
                        placeholder:'Ingrese su usuario'
                    }}
                    handleChange={handleChange}
                />
                <Label text={'Ingrese la Contraseña'}/>
                <Input 
                    className="form-control"
                    atributte={{
                        id:'contrasenia',
                        name:'contrasenia',
                        type:'password',
                        placeholder:'Ingrese su Contraseña'
                    }}
                    handleChange={handleChange}                    
                />  
                <button className="btn btn-primary" onClick={handleSubmit}>Ingresar</button>        
            </div>            
        </div>

      </div>
    );
  }
  
  export default Login;