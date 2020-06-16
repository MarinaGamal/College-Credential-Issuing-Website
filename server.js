var http = require('http');
var parser = require('body-parser');
var cors = require('cors');
var path = require('path');
var { createTerminus } = require('@godaddy/terminus');
var express = require('express');
var ngrok = require('ngrok');
var cache = require('./model');
var axios = require('axios');




require('dotenv').config();

const { AgencyServiceClient, Credentials } = require("@streetcred.id/service-clients");
const client = new AgencyServiceClient(new Credentials(process.env.ACCESSTOK, process.env.SUBKEY));

var app = express();
//const booksRouter = require('./studentsRoute')

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'build')))
//app.use('/books', booksRouter)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});




            //const attribs = cache.get(req.body.data.ConnectionId)
            //if (attribs) {
                //var param_obj = JSON.parse(attribs);
                
                
// WEBHOOK ENDPOINT
app.post('/webhook', async function (req, res) {
    try {
        console.log("got webhook" + req + "   type: " + req.body.message_type);
        if (req.body.message_type === 'new_connection') {
                    console.log("new connection notif");

            // var params =
            // {
            //     credentialOfferParameters: {
            //         definitionId: process.env.CRED_DEF_ID,
            //         connectionId: req.body.object_id
            //     }
            // }
            // await client.createCredential(params);
        }
        else if (req.body.message_type === 'credential_request') {    
            console.log("cred request notif ");
            console.log(cache.get("credentialId"));
            console.log(cache.get("connectionId"));
            var params = {};

                
            const fetchStudents = async () => {
                // Send GET request to 'books/all' endpoint
                axios
                  .get('http://localhost:4001/students/all')
                  .then(response => {
                    // Update the books state
                    params=response.data
                    // Update loading state
                    //console.log("hi")
                    console.log(params[0].Name)
                     client.issueCredential(cache.get("credentialId"),{
                        body: {
                            "Name" : params[0].Name,
                            "GPA": params[0].GPA.toString(),
                            "Year" : params[0].Year.toString(),
                            "Type": params[0].Type  }
                    });
                    
                    
                  })
                  .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
              }

            //const attribs = cache.get(req.body.data.ConnectionId)
            //if (attribs) {
                //var param_obj = JSON.parse(attribs);
                fetchStudents();
                

               
            
        }
    }
    catch (e) {
        console.log(e.message || e.toString());
    }
});

//FRONTEND ENDPOINT
app.post('/api/issue', cors(), async function (req, res) {
    const invite = await getInvite();
    const attribs = JSON.stringify(req.body);
    //console.log("hi")

    //console.log(params[0].Name)

    cache.add("connectionId", invite.connectionId);
    cache.list();
    res.status(200).send({ invite_url: invite.invitation });
});

// app.post('/api/definition', cors(), async function (req, res) {

//     const Definition = await createCertificateCredentialDefinition();
//     const attribs = JSON.stringify(req.body);
//     //console.log(Definition.definitionId+"Definition")
//     // //var newDefinitionId=Definition.definitionId;
//    // cache.add("definitionId", Definition.definitionId);
//     cache.list();
//    // const offer= await createCertificateOffer();

//     //cache.add("credentialId", offer.credentialId);
//     //res.status(200).send({ invite_url: invite.invitation });
// }); 

app.post('/api/offer', cors(), async function (req, res) {

    const offer= await createCertificateOffer();
    console.log(offer.credentialId+"hena");
    cache.add("credentialId", offer.credentialId);
    //cache.add("offer",offer);
    // res.status(200).send({ invite_url: invite.invitation });
});


const getInvite = async () => {
    try {
        var result = await client.createConnection({
            connectionInvitationParameters: {"name": "Ain Shams University"}
        });
        return result;
    } catch (e) {
        console.log(e.message || e.toString());
    }
} 

const createCertificateCredentialDefinition = async () => {
    try {
        var credentialDefinition = await client.createCredentialDefinition({
            credentialDefinitionFromSchemaParameters: {
                name: "Computer Bachelor Degree",
                version: "1.0",
                attributes: ["Name", "GPA", "Year","Type"],
                supportRevocation: false,
                tag: "19971997test1aaaaa"
            }
        });
        //console.log("OPaAAA" +result)
        return result;
    } catch (e) {
        console.log("OPa"+cache.get("definitionId"))
        console.log(e.message || e.toString());
    }
}
const createCertificateOffer = async () => {
    try {
        console.log("hi"+cache.get("definitionId"),)
        var credentialOffer = await client.createCredential({
            credentialOfferParameters:{
            definitionId: "WqHxTAtrKbPsEqkhHDEJK:3:CL:110010:msaidm19971997said12123",
            connectionId: cache.get("connectionId")
            }
        });
        return credentialOffer;
    } catch (e) {
        console.log("OPa 2"+cache.get("connectionId"))
        console.log(e.message || e.toString());
    }
}

const createCertificateSchema= async () => {
    try {
        var credentialOffer = await client.createSchema({
            schemaParameters: {
                name: "Employee Badge",
                version: "1.0",
                attrNames: [
                    "Name",
                    "GPA",
                    "Year",
                    "Type"
                ]
            }
        });
        return result;
    } catch (e) {
        console.log("OPa 2")
        console.log(e.message || e.toString());
    }
}

// for graceful closing
var server = http.createServer(app);

async function onSignal() {
    var webhookId = cache.get("webhookId");
    const p1 = await client.removeWebhook(webhookId);
    return Promise.all([p1]);
}
createTerminus(server, {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: {},
    onSignal
});

const PORT = process.env.PORT || 3002;
var server = server.listen(PORT, async function () {
    const url_val = await ngrok.connect(PORT);
    console.log("============= \n\n" + url_val + "\n\n =========");
    var response = await client.createWebhook({
        webhookParameters: {
            url: "http://45660c45.ngrok.io/webhook",  // process.env.NGROK_URL
            type: "Notification"
        }
    });
    
    cache.add("webhookId", response.id);
    console.log('Listening on port %d', server.address().port);
});