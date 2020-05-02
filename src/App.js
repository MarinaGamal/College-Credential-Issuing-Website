import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import QRcode from 'qrcode.react';
import "./styles.css";
import home from "./home.jpeg"

axios.defaults.baseURL = 'http://localhost:3002/';
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

      onGetTranscript = () => {
        axios.post('/api/offer').then((response) => {
            console.log(response);
         });
         this.setState({ disabled: true });
      }

    render() {
      return (
            <div className='myBackgrounds' >
                {/* The AppBar */}
                <AppBar position="static">
                    <Toolbar style={{paddingLeft:300, backgroundColor: 'primary',}}>
                        <img style={{}}/>
                        <Typography variant="h4"> 
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
        )
    }    
}
