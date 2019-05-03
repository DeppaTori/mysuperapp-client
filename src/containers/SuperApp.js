import React,{Component} from 'react'
import axios from 'axios'

class SuperApp extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        axios.get(`https://mysuperapp-tommytoban.herokuapp.com/simpledata`)
     //  axios.get(`http://localhost:8080/simpledata`)
            .then(response => response.data)
            .then((json) =>{
               // let j = {...json}
              
                this.setState({
                    
                        ...this.state,
                        data:json
                   
                })
            }
                
            )
    }

    

    render(){
        const {data} = this.state
        console.log(data)
        return (
            <div>
            <h1>Daftar Buah: </h1>
            <ul>
            {
                data.length===0?(<p>Loading...</p>):(<p></p>)
            }
            {
                  data.map((rec) => (
                      <li>{rec.nama}</li>
                  ))
            }
            </ul>
                     
            </div>
           
        )
    }
}

export default SuperApp