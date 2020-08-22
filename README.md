# Ain Shams University Website

This is a small website for "Ain Shams University",developed using ReactJs built on top of Hyperldger Indy's Blockchain using Hyperldger Aries and trinsic.
It is aimed to complete the the "College Certificate Project on top of the Blockchain" and acts as a the issuer entity, where the graduate comes here to request his college credential or certificate (either Bachelor or Masters Degree). It it then issued using the credential schema and credential definition stored on the blockchain.

# Prerequisites:
- [npm](https://www.npmjs.com/get-npm)

## To use this project you need to do the following:

Edit the file called ".env-template" to ".env" and add the following in it:

ACCESSTOK='1EttW4CmYNfwUcv93z6Dbff54jp5i8OSg-Xt0ZCMns4' <br />                                                                     SUBKEY='d9cce2ec9adb4741b0b85279031d614b'  <br />  

#------------- Credential Definition ----------------- #       <br />                                                            CRED_DEF_ID='Mp2F7q7czjX3MjwMQMNLhB:3:CL:84162:Default'      <br />  

#------------- Sovrin Staging Schema ------------------- #    <br />                                                            SCHEMA_ID='NGZRy3B7HgE4RpBJpzjM5y:2:business-card:1.0'    <br />  

#------------- BCovrin Schema -------------------------- #       <br />                                                                    #SCHEMA_ID='5ZtmDq3BwF7vVLcWTejb3M:2:business card:1.0'    <br />  

SKIP_PREFLIGHT_CHECK=true



## Then run the following commands:

    npm install .
    npm install i @streetcred.id/service-clients
    npm start
    
    
## Now you are ready to run the application:
After running the wallet project, you just need to Scan the QR (conection invitation) with your mobile wallet a connection will be established.
On pressing the Get Transcript button a credential offer will be sent to your mobile application,if you accepted the offer a webhook is received here in the college website and the credential is issued using the specefied definition id from the blockchain. 
Same in the post Graduate Page, a button is pressed and a Master Degree is then issued to the wallet.
All the values values in the credentials is retreived from a database.
    
## Finally use the following 2 projects to continue the Isuuing credential and verifying it scenario.
1- Job Website:   <br />                                                                                                                      https://github.com/MarinaGamal/Job-Web <br />                                                                                                                     2- Student Wallet (Mobile Application)               <br />                                                                                                    https://github.com/MarinaGamal/Mobile-React-Native-Course


