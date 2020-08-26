import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import "./styles.css";
import home from "./home.jpeg"

var ngrok = "http://07c766e1c53b.ngrok.io"

const fetchBooks = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get('http://localhost:4001/books/all')
      .then(response => {

      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
  }
const updateBookCreate = () => {
    // Send POST request to 'books/create' endpoint
    axios
      .put('http://localhost:4001/books/update',{id:1})
      .then(res => {
        console.log(res.data)
        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchBooks()
      })
      //.catch(error => console.error(`There was an error creating the ${title} book: ${error}`))
  }

  //sends notification to the application that a master degree is issued
 const  sendMasterDegreeNotification = async  ()  =>  {
  console.log("sending notfi")
  const res = await fetch(ngrok+ '/webhook', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      "message_type": "MasterDegree_offer"
    }),
  });

}
axios.defaults.baseURL = 'http://localhost:3002/';
export class postGraduate extends Component {
     
    state = {
        qr_open: false,
        qr_placeholder: "",
        invite_url: "",
        disabled: false
    };

    componentDidMount() {
        
      } 

        

      onGetTranscript = () => {
        sendMasterDegreeNotification()
         this.setState({ disabled: true });
      }
      //ui of post graduate page
    render() {
      return (
            <div className='postGradute' >
                {/* The AppBar */}
                <AppBar position="static">
                    <Toolbar style={{paddingLeft:300, backgroundColor: 'primary',}}>
                        <img style={{}}/>
                        <Typography style ={{paddingRight:300}} variant="h4"> 
                        Ain Shams University 

                        </Typography>
                        
                        <div style={{flexGrow: 1}}></div> 
                    </Toolbar>
                </AppBar>

                <div >
                <img
                    className = "home"
                    src={home}
                />
                </div>
                <div style ={{paddingLeft:300, paddingTop:30}}>
                    <div style={{ marginBottom : 20}}>
                                <Typography variant="h4"  color="black"   style={{flexGrow: 1}}>
                                   <b>Click here to add your master degree to your credential</b> 
                                </Typography>
                    </div>
                    

                    <div style={{marginBottom : 20}}>
                       
                        <Button  disabled={this.state.disabled} size ="large" variant="contained" color="primary" onClick={() => this.onGetTranscript() } >
                            Get Transcript
                        </Button>
                    </div>         
                </div> 
            </div>
        )
    }    
}

export default postGraduate;