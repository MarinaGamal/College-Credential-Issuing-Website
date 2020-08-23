# Ain Shams University Website

This is a small website for "Ain Shams University", developed using ReactJs built on top of Hyperldger Indy's Blockchain using Hyperldger Aries and Trinsic.
It is aimed to complete  the "College Certificate Project on top of the Blockchain" and acts as a the issuer entity, where the graduate comes here to request his college credential or certificate (either Bachelor or Masters Degree). It is then issued using the credential schema and credential definition stored on the blockchain.

# Prerequisites:
- [npm](https://www.npmjs.com/get-npm)

## To use this project you need to do the following:

Create a file in your project called ".env" and add the following in it:

ACCESSTOK= (to be requested from the developers) <br />                                                                     SUBKEY=(to be requested from the developers) <br />  

#------------- Credential Definition ----------------- #       <br />                                                            CRED_DEF_ID='Mp2F7q7czjX3MjwMQMNLhB:3:CL:84162:Default'      <br />  

#------------- Sovrin Staging Schema ------------------- #    <br />                                                            SCHEMA_ID='NGZRy3B7HgE4RpBJpzjM5y:2:business-card:1.0'    <br />  

#------------- BCovrin Schema -------------------------- #       <br />                                                                    #SCHEMA_ID='5ZtmDq3BwF7vVLcWTejb3M:2:business card:1.0'    <br />  

SKIP_PREFLIGHT_CHECK=true



## Then run the following commands:

    npm install .
    npm install i @streetcred.id/service-clients
    npm start
    Finally, go to the project's directory, open terminal and run nodde server.js
    
## Now you are ready to run the application:
After running the wallet project, you just need to Scan the QR (conection invitation) with your mobile wallet and a connection will be established.
On pressing the Get Transcript button a credential offer will be sent to your mobile application, if you accepted the offer a webhook is received here in the college website and the credential is issued using the specefied definition ID from the blockchain. 
Same in the postgraduate page, a button is pressed and a Master Degree is then issued to the wallet.
All the values in the credentials are retreived from a database.
    
## Finally use the following 2 projects to continue the Isuuing credential and verifying it scenario.
1- Job Website:   <br />                                                                                                                      https://github.com/MarinaGamal/Job-Web <br />                                                                                                                     2- Student Wallet (Mobile Application)               <br />                                                                                                    https://github.com/MarinaGamal/Mobile-React-Native-Course


