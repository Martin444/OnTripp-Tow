import React from 'react'
import './PrimaryView.scss'
import { isAbsolute } from 'path';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const API = 'http://31.220.59.183:8080/locations?filter=';

class inputChanges extends React.Component {

    constructor(...props) {
        super(...props);
        this.state = { valDestino: '', valOrigen: '', Estilo_des: {},
        Estilo_org: {}, Estilo_select: {}, Loc: null , OrLoc: null, Hidden_lok: {} };
    
    }

    handleChange = (event) => {
        let Style1 = {}
        let Style2 = {}
        let valor = (event.target.value)
        if(valor.length >=1){
            Style1 = {
                top: '5px',
                left: '40px',
                color: '#ffaa3b',
                fontSize: '15px',
                fontWeight: 'bold',
                transition: '.2s easy all'
            }
        }else {
            Style1 = {
                position: 'absolute',
                pointerEvents: 'none',
                top: '9%',
                color: '#504f4e3f',
                fontSize: '20px',
            }

        }

        if(valor.length >=5){
            Style2 = {
                
                visibility: 'visible' ,
                transition: '.5s easy all'
            }
        }else {
            Style2 = {
                visibility: 'hidden',
                transition: '.2 easy all'
            }
        }

            
        

        this.setState({ valOrigen: valor, Estilo_org: Style1, Hidden_lok: Style2 })
    }

    //funcion que va a guardar el valor que digite el usuario.
    hdchange = (event) => {
        let StyleSelect = {}
        let Style = {}
        if (event.target.value.length >= 1) {
            console.log('estado');
           Style = {
                top: '55px',
                position: isAbsolute,
                left: '40px',
                marginBotton: '5px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#ffaa3b',
                transition: '.2s all'
            };
        } else {
            Style = {
             
                position: 'absolute',
                top: '70px',
                left: '40px',
                color: '#504f4e3f',
                fontSize: '20px'
            };
        }
        if(event.target.value.length >=5){
            StyleSelect = {
                visibility: 'visible'
            }
        }else {
            StyleSelect = {
                visibility: 'hidden'
            }
        }
        this.setState({ valDestino: event.target.value, Estilo_des: Style, Estilo_select: StyleSelect });
    }

    //para hacer peticiones a la API
    getValue() {
        return this.state.value1;
    };

   

   

    render() { 
        this.state.valOrigen.length >= 3 ?
            fetch(API + this.state.valOrigen)
            .then((resp)=>{
                resp.json()
                .then((resp)=>{
                    resp === 3 ?
                    console.log(resp.data):
                    this.setState({OrLoc:resp.data})
                })
            })
        :
        console.log(this.state.value)


        this.state.valDestino.length >= 3 ?
            fetch(API + this.state.valDestino)
            .then((res)=>{
                res.json()
                .then((res)=>{
                    res === 3 ?
                    console.log(res.data):
                    console.warn(res.responseText)
                    this.setState({Loc:res.data}) 
                })
            }) 
        :
        console.log(this.state.value)

        return(
        <div className="place">
            <input className="origen"
            list="browser"
            onChange= {this.handleChange}
            value={this.state.valOrigen}
            />
            <label 
            className="label1"
            style={this.state.Estilo_org}
            >ORIGEN</label>
            <div>
                <datalist id="browser">
                    {
                        this.state.OrLoc ?
                        this.state.OrLoc.map ((items)=>
                        <React.Fragment>
                            <option className="lista" value={(items.name) + ", " + (items.address.countryName)}/>
                        </React.Fragment>
                        )
                    :null
                    }
                    

                </datalist>
            </div>
            <br></br>
            
            <div className="aparecer" style={this.state.Hidden_lok}>
                <input className="destino"
                list="browsers"
                onChange={this.hdchange} 
                value={this.state.valDestino}/>

                <label className="labDes" 
                style={this.state.Estilo_des}>DESTINO</label>
                <div>
                    <datalist id="browsers">
                                            {
                        this.state.Loc ?
                        this.state.Loc.map((items)=>
                            <React.Fragment>
                                <option className="lista" value={(items.name) + ", " + (items.address.countryName)}
                                onClick={this.onAlert}/>
                
                            </React.Fragment>
                            )
                            :null
                        }
                    </datalist>     
                </div>
            </div>
            <div className="Selector-pasajeros" style={this.state.Estilo_select}>
                <form onSubmit={this.handleSubmit}>
                    <label className="pass">
                        Pax. mayores de 18 años.
                     </label>
                    <select className="cell" value={this.state.value}>
              
                        <option className="op" value="0">0</option>
                        <option className="op" value="1">1</option>
                        <option className="op" value="2">2</option>
                        <option className="op" value="3">3</option>  
                    </select>
                    <label className="pass">
                        Pax. menores de 18 años.
                     </label>
                    <select className="cell" value={this.state.value}>
              
                        <option className="op" value="0">0</option>
                        <option className="op" value="1">1</option>
                        <option className="op" value="2">2</option>
                        <option className="op" value="3">3</option>  
                    </select>
         
                </form>
                <div className="calendar-contenedor">
            <DatePicker
            
            className="calendar"
            selected = {this.state.StartDate}
            isClearable = {true}
            dateFormat = "DD/MM/YYYY"
            name = {this.state.name}
            minDate={moment()}
            maxDate={moment().add(5, "months")}
            showDisabledMonthNavigation
            
            />
            <label style= {this.state.Estilo}
            onClick={this.onClick}>DESDE</label>
          </div>
            </div>
            

        </div>
);

}
}

export default inputChanges;