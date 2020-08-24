import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import QRcode from 'qrcode.react';
import "./styles.css";
import home from "./home.jpeg"
import {BrowserRouter as Router,Link } from 'react-router-dom';

var ngrok = "http://b42e2d162c0c.ngrok.io" //public url for connecting with the server

const fetchBooks = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get('http://localhost:4001/books/all')
      .then(response => {
        // Update the books state
        
        // Update loading state
       
      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
  }
const handleBookCreate = () => {
  console.log("insterded")
    // Send POST request to 'books/create' endpoint
    axios
      .post('http://localhost:4001/students/create', {
        Name: 'Mohammed Said',
        GPA: 2.95,
        Year: 2018,
        Type: 'Bachelor Degree',
        MasterDegree: false ,
        MasterDegreeYear: 2020
      })
      .then(res => {
        console.log(res.data)
        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchBooks()
      })
      //.catch(error => console.error(`There was an error creating the ${title} book: ${error}`))
  }


axios.defaults.baseURL = 'http://localhost:3002/';

//sends credential offer notification to the application
const sendCredOfferNotification = async  ()  =>  {
  const res = await fetch(ngrok+'/webhook', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      "message_type": "Cred_offer"
    }),
  });
  res.json().then(console.log(JSON.stringify(res)))

}

export class App extends Component {

   
    state = {
        qr_open: false,
        qr_placeholder: "",
        invite_url: "",
        disabled: false
    };

    componentDidMount() {

        axios.post('/api/issue').then((response) => {
            console.log(response);
            this.setState({invite_url: "https://web.cloud.streetcred.id/link/?c_i=" + response.data.invite_url});
        });
        this.setState({
          qr_open: false,
          qr_placeholder: this.state,
        })
        
      }
      //sends credential offer upon pressing get transcript
      onGetTranscript = () => {
        axios.post('/api/offer').then((response) => {
            console.log(response);
         });

         sendCredOfferNotification();
         console.log("ana ba3at cred offer notifi")
         this.setState({ disabled: true });
      }

      onPostGradute = () => {
        console.log("redirect")
        
      }
      //ui for the college website
    render() {
      return (
        <Router>
          {/* <Route path="/postGradute" exact  component={postGraduate}/> */}
            <div className='myBackgrounds' >
                {/* The AppBar */}
                <AppBar position="static">
                    <Toolbar style={{paddingLeft:300, backgroundColor: 'primary',}}>
                        <img style={{}}/>
                        <Typography style ={{paddingRight:300}} variant="h4"> 
                            Ain Shams University 
                        </Typography>
                        {/* <Button  size ="large" variant="contained" color="defult" onClick={() => this.onPostGradute() } >
                            For Post Graduteds
                        </Button> */}
                        <Link to="/postGraduate" style={{ textDecoration: 'none' ,color:"white" }}>Post Graduate</Link>
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
                                   <b>Connect to Ainshams University</b> 
                                </Typography>
                    </div>
                    <div style={{marginBottom : 20}}>

                                <Typography variant="h6"  color="textPrimary"  style={{flexGrow: 1}}>
                                First you need to scan the QR code with your mobile agent from your phone to form a connection with Ainshams University. 
                                </Typography>
                                <QRcode size="200" value={this.state.invite_url} style={{margin: "0 auto", padding: "10px"}} />
                                
                    </div>

                    <div style={{marginBottom : 20}}>
                        <Typography variant="h6"  color="textPrimary"  style={{flexGrow: 1}}>
                        Once you have accepted the connection from your mobile agent, click the button below to get you transcript!
                        </Typography>
                        <Button  disabled={this.state.disabled} size ="large" variant="contained" color="primary" onClick={() => this.onGetTranscript() } >
                            Get Transcript
                        </Button>
                    </div>         
                </div> 
            </div>
        </Router>
        )
    }    
}
