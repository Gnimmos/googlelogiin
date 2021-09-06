require('dotenv').config()

const { google } = require('googleapis');
const express = require('express')
const OAuth2Data = require('./google_key.json')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const location = require('location-href')
const { htmlToText } = require('html-to-text');
const simpleParser = require('mailparser').simpleParser;
var URLSafeBase64 = require('urlsafe-base64');
var w1 = require('./wolf1.js');
var w2 = require('./wolf2.js');
var w3 = require('./wolf3.js');
var w4 = require('./wolf4.js');
var w5 = require('./wolf5.js');
var w6 = require('./wolf6.js');
var w7 = require('./wolf7.js');
var w8 = require('./wolf8.js');
var w9 = require('./wolf9.js');
var w10 = require('./wolf10.js');
var w11 = require('./wolf11.js');
var w12 = require('./wolf12.js');

const base64 = require('js-base64').Base64;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

const fs = require('fs');
const path = require('path');
const { json } = require('express');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(  cors({
    origin: 'https://wolvestalk.commedia.wiki/#/',//http://wolvestalk.commedia.wiki/
    credentials: false,
    methods: "Fetch",
  }));
  
  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin: *');
  //   res.header('Access-Control-Allow-Methods: *');
  //   res.header('Access-Control-Allow-Headers: *');
  //   next();
  // });
  // app.all('/', function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   next()
  // });


app.get('/',  (req, res) => {
    if (authed) {
        res.redirect('/profile')
    }
    else{
    res.render('index')
    }

})
app.get('/login', checkAuthenticated, (req,res)=>{
    res.render('login');
})
app.post('/login', (req,res)=>{ 
    console.log('i am in post') 
        async function verify() {
            if (authed) {
                res.cookie('session-token');
                console.log("redirecting");
                        location()
                        //=> http://the/current/location
                        location.set('https://still-island-25722.herokuapp.com/profile')
                        //=> browser transitions to new location
                res.end('success')   
            }
          }
          verify()
            .then(()=>{
                if (!authed) {
                res.cookie('session-token');
                console.log("redirecting")
                res.redirect('/login')
                next();
                }
            })
            .catch(console.error);     
    })



app.use('/wolf1',w1);
app.use('/wolf2',w2);
app.use('/wolf3',w3);
app.use('/wolf4',w4);
app.use('/wolf5',w5);
app.use('/wolf6',w6);
app.use('/wolf7',w7);
app.use('/wolf8',w8);
app.use('/wolf9',w9);
app.use('/wolf10',w10);
app.use('/wolf11',w11);
app.use('/wolf12',w12);

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})

app.get('/profile', async(req,res, next)=>{

    var counter = 0;
    //wolf1
        async function getit(){
            let wolf="Your", says="Saying";
            let body = [wolf,says];

            const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
            return  gmail.users.messages.list({
            'userId': 'me',
            'labelIds': 'Label_1117765360743766898',
            'maxResults': 100
        }, (err, res) => {
                if (err) return console.log('The API returned an error: in first ' + err);
                const  msgs = res.data.messages;
                if (msgs.length == 0) {
                    console.log('No labels found.');

                } else {
                    console.log('Messages:');
                    the_format = 'full';
                    console.log("WE have "+ msgs.length)

                    var msg = msgs;
                    return  msg.map(async(mail)=>{
                        gmail.users.messages.get({
                            auth: oAuth2Client,
                            userId: 'me',
                            id: mail.id,
                            payload:mail.payload,
                            format: the_format,
                        }, async(err, response)=> {
                            if (err) {
                            console.log('The API returned an error: ' + err);
                            return;
                            }
                            else{
                                var someURLSafeBase64 =
                                response.data.payload.parts[0].body.data;
                              const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                              var bodyData = response.data.payload.parts[0].body.data;
                              // Simplified code: you'd need to check for multipart.
            
                              var tosave = base64.decode(
                                bodyData.replace(/-/g, "+").replace(/_/g, "/")
                              );
                              var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                              var rem1 = remlink.replace("The message response is", "");
                              var wow =  rem1.split("\n").slice(1).join("\n");

                              var rem2 = wow.replace(
                                "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                                ""
                              );
                              wolf = rem2.split("\n")[5];
                              var rest = rem2.split("\n").slice(5).join("\n");
                              says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                              body.push({ wolf, says }); //add some data
                              console.log("Body:");
            
                              console.log(body);
                              var filtered = body.filter(function (el) {
                                return el != null;
                              });
                              let json = JSON.stringify(filtered); //convert it back to json
                              fs.writeFile('wolf1.json', json, 'utf8',function wirtecallback (err) {
                                      if (err)  console.log(err);
                                          }); // write it back 
                              
            
                              return body;

                            }
                        });
                    })
                }


            });         

        }

// wolf 2
    async function getit2(){
        let wolf="Your", says="Saying";
        let body = [wolf,says];

        const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
        return  gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'Label_3436832503742850609',
        'maxResults': 100
    }, (err, res) => {
            if (err) return console.log('The API returned an error: in first ' + err);
            const  msgs = res.data.messages;
            if (msgs.length == 0) {
                console.log('No labels found.');

            } else {
                console.log('Messages:');
                the_format = 'full';
                console.log("WE have "+ msgs.length)

                var msg = msgs;
                return  msg.map(async(mail)=>{
                    gmail.users.messages.get({
                        auth: oAuth2Client,
                        userId: 'me',
                        id: mail.id,
                        payload:mail.payload,
                        format: the_format,
                    }, async(err, response)=> {
                        if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                        }
                        else{
                            var someURLSafeBase64 =
                            response.data.payload.parts[0].body.data;
                          const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                          var bodyData = response.data.payload.parts[0].body.data;
                          // Simplified code: you'd need to check for multipart.
        
                          var tosave = base64.decode(
                            bodyData.replace(/-/g, "+").replace(/_/g, "/")
                          );
                          var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                          var rem1 = remlink.replace("The message response is", "");
                          var wow =  rem1.split("\n").slice(1).join("\n");

                          var rem2 = wow.replace(
                            "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                            ""
                          );
                          wolf = rem2.split("\n")[5];
                          var rest = rem2.split("\n").slice(5).join("\n");
                          says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                          body.push({ wolf, says }); //add some data
                          console.log("Body:");
        
                          console.log(body);
                          var filtered = body.filter(function (el) {
                            return el != null;
                          });
                          let json = JSON.stringify(filtered); //convert it back to json
                          fs.writeFile('wolf2.json', json, 'utf8',function wirtecallback (err) {
                                  if (err)  console.log(err);
                                      }); // write it back 
                          
        
                          return body;

                        }
                    });
                })
            }


        });         

    }
    // wolf 3
    async function getit3(){
        let wolf="Your", says="Saying";
        let body = [wolf,says];

        const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
        return  gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'Label_8277595715476275420',
        'maxResults': 100
    }, (err, res) => {
            if (err) return console.log('The API returned an error: in first ' + err);
            const  msgs = res.data.messages;
            if (msgs.length == 0) {
                console.log('No labels found.');

            } else {
                console.log('Messages:');
                the_format = 'full';
                console.log("WE have "+ msgs.length)

                var msg = msgs;
                return  msg.map(async(mail)=>{
                    gmail.users.messages.get({
                        auth: oAuth2Client,
                        userId: 'me',
                        id: mail.id,
                        payload:mail.payload,
                        format: the_format,
                    }, async(err, response)=> {
                        if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                        }
                        else{
                            var someURLSafeBase64 =
                            response.data.payload.parts[0].body.data;
                          const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                          var bodyData = response.data.payload.parts[0].body.data;
                          // Simplified code: you'd need to check for multipart.
        
                          var tosave = base64.decode(
                            bodyData.replace(/-/g, "+").replace(/_/g, "/")
                          );
                          var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                          var rem1 = remlink.replace("The message response is", "");
                          var wow =  rem1.split("\n").slice(1).join("\n");

                          var rem2 = wow.replace(
                            "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                            ""
                          );
                          wolf = rem2.split("\n")[5];
                          var rest = rem2.split("\n").slice(5).join("\n");
                          says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                          body.push({ wolf, says }); //add some data
                          console.log("Body:");
        
                          console.log(body);
                          var filtered = body.filter(function (el) {
                            return el != null;
                          });
                          let json = JSON.stringify(filtered); //convert it back to json
                          fs.writeFile('wolf3.json', json, 'utf8',function wirtecallback (err) {
                                  if (err)  console.log(err);
                                      }); // write it back 
                          
        
                          return body;

                        }
                    });
                })
            }


        });         

    }

    // wolf 4
    async function getit4(){
        let wolf="Your", says="Saying";
        let body = [wolf,says];

        const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
        return  gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'Label_8547338681805910582',
        'maxResults': 100
    }, (err, res) => {
            if (err) return console.log('The API returned an error: in first ' + err);
            const  msgs = res.data.messages;
            if (msgs.length == 0) {
                console.log('No labels found.');

            } else {
                console.log('Messages:');
                the_format = 'full';
                console.log("WE have "+ msgs.length)

                var msg = msgs;
                return  msg.map(async(mail)=>{
                    gmail.users.messages.get({
                        auth: oAuth2Client,
                        userId: 'me',
                        id: mail.id,
                        payload:mail.payload,
                        format: the_format,
                    }, async(err, response)=> {
                        if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                        }
                        else{
                            var someURLSafeBase64 =
                            response.data.payload.parts[0].body.data;
                          const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                          var bodyData = response.data.payload.parts[0].body.data;
                          // Simplified code: you'd need to check for multipart.
        
                          var tosave = base64.decode(
                            bodyData.replace(/-/g, "+").replace(/_/g, "/")
                          );
                          var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                          var rem1 = remlink.replace("The message response is", "");
                          var wow =  rem1.split("\n").slice(1).join("\n");

                          var rem2 = wow.replace(
                            "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                            ""
                          );
                          wolf = rem2.split("\n")[5];
                          var rest = rem2.split("\n").slice(5).join("\n");
                          says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                          body.push({ wolf, says }); //add some data
                          console.log("Body:");
        
                          console.log(body);
                          var filtered = body.filter(function (el) {
                            return el != null;
                          });
                          let json = JSON.stringify(filtered); //convert it back to json
                          fs.writeFile('wolf4.json', json, 'utf8',function wirtecallback (err) {
                                  if (err)  console.log(err);
                                      }); // write it back 
                          
        
                          return body;

                        }
                    });
                })
            }


        });         

    }
  // wolf 5
  async function getit5(){
    let wolf="Your", says="Saying";
    let body = [wolf,says];

    const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
    return  gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'Label_7012632672525189018',
    'maxResults': 100
}, (err, res) => {
        if (err) return console.log('The API returned an error: in first ' + err);
        const  msgs = res.data.messages;
        if (msgs.length == 0) {
            console.log('No labels found.');

        } else {
            console.log('Messages:');
            the_format = 'full';
            console.log("WE have "+ msgs.length)

            var msg = msgs;
            return  msg.map(async(mail)=>{
                gmail.users.messages.get({
                    auth: oAuth2Client,
                    userId: 'me',
                    id: mail.id,
                    payload:mail.payload,
                    format: the_format,
                }, async(err, response)=> {
                    if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                    }
                    else{
                        var someURLSafeBase64 =
                        response.data.payload.parts[0].body.data;
                      const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                      var bodyData = response.data.payload.parts[0].body.data;
                      // Simplified code: you'd need to check for multipart.
    
                      var tosave = base64.decode(
                        bodyData.replace(/-/g, "+").replace(/_/g, "/")
                      );
                      var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                      var rem1 = remlink.replace("The message response is", "");
                      var wow =  rem1.split("\n").slice(1).join("\n");

                      var rem2 = wow.replace(
                        "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                        ""
                      );
                      wolf = rem2.split("\n")[5];
                      var rest = rem2.split("\n").slice(5).join("\n");
                      says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                      body.push({ wolf, says }); //add some data
                      console.log("Body:");
    
                      console.log(body);
                      var filtered = body.filter(function (el) {
                        return el != null;
                      });
                      let json = JSON.stringify(filtered); //convert it back to json
                      fs.writeFile('wolf5.json', json, 'utf8',function wirtecallback (err) {
                              if (err)  console.log(err);
                                  }); // write it back 
                      
    
                      return body;

                    }
                });
            })
        }


    });         
}
  // wolf 6
  async function getit6(){
    let wolf="Your", says="Saying";
    let body = [wolf,says];

    const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
    return  gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'Label_8451598925756406203',
    'maxResults': 100
}, (err, res) => {
        if (err) return console.log('The API returned an error: in first ' + err);
        const  msgs = res.data.messages;
        if (msgs.length == 0) {
            console.log('No labels found.');

        } else {
            console.log('Messages:');
            the_format = 'full';
            console.log("WE have "+ msgs.length)

            var msg = msgs;
            return  msg.map(async(mail)=>{
                gmail.users.messages.get({
                    auth: oAuth2Client,
                    userId: 'me',
                    id: mail.id,
                    payload:mail.payload,
                    format: the_format,
                }, async(err, response)=> {
                    if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                    }
                    else{
                        var someURLSafeBase64 =
                        response.data.payload.parts[0].body.data;
                      const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                      var bodyData = response.data.payload.parts[0].body.data;
                      // Simplified code: you'd need to check for multipart.
    
                      var tosave = base64.decode(
                        bodyData.replace(/-/g, "+").replace(/_/g, "/")
                      );
                      var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                      var rem1 = remlink.replace("The message response is", "");
                      var wow =  rem1.split("\n").slice(1).join("\n");

                      var rem2 = wow.replace(
                        "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                        ""
                      );
                      wolf = rem2.split("\n")[5];
                      var rest = rem2.split("\n").slice(5).join("\n");
                      says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                      body.push({ wolf, says }); //add some data
                      console.log("Body:");
    
                      console.log(body);
                      var filtered = body.filter(function (el) {
                        return el != null;
                      });
                      let json = JSON.stringify(filtered); //convert it back to json
                      fs.writeFile('wolf6.json', json, 'utf8',function wirtecallback (err) {
                              if (err)  console.log(err);
                                  }); // write it back 
                      
    
                      return body;

                    }
                });
            })
        }


    });         

}
//wolf7
async function getit7(){
    let wolf="Your", says="Saying";
    let body = [wolf,says];

    const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
    return  gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'Label_3078807677308612708',
    'maxResults': 100
}, (err, res) => {
        if (err) return console.log('The API returned an error: in first ' + err);
        const  msgs = res.data.messages;
        if (msgs.length == 0) {
            console.log('No labels found.');

        } else {
            console.log('Messages:');
            the_format = 'full';
            console.log("WE have "+ msgs.length)

            var msg = msgs;
            return  msg.map(async(mail)=>{
                gmail.users.messages.get({
                    auth: oAuth2Client,
                    userId: 'me',
                    id: mail.id,
                    payload:mail.payload,
                    format: the_format,
                }, async(err, response)=> {
                    if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                    }
                    else{
                        var someURLSafeBase64 =
                        response.data.payload.parts[0].body.data;
                      const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                      var bodyData = response.data.payload.parts[0].body.data;
                      // Simplified code: you'd need to check for multipart.
    
                      var tosave = base64.decode(
                        bodyData.replace(/-/g, "+").replace(/_/g, "/")
                      );
                      var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                      var rem1 = remlink.replace("The message response is", "");
                      var wow =  rem1.split("\n").slice(1).join("\n");

                      var rem2 = wow.replace(
                        "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                        ""
                      );
                      wolf = rem2.split("\n")[5];
                      var rest = rem2.split("\n").slice(5).join("\n");
                      says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                      body.push({ wolf, says }); //add some data
                      console.log("Body:");
    
                      console.log(body);
                      var filtered = body.filter(function (el) {
                        return el != null;
                      });
                      let json = JSON.stringify(filtered); //convert it back to json
                      fs.writeFile('wolf7.json', json, 'utf8',function wirtecallback (err) {
                              if (err)  console.log(err);
                                  }); // write it back 
                      
    
                      return body;

                    }
                });
            })
        }


    });         

}

// wolf 8
async function getit8(){
let wolf="Your", says="Saying";
let body = [wolf,says];

const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
return  gmail.users.messages.list({
'userId': 'me',
'labelIds': 'Label_3874502132030929126',
'maxResults': 100
}, (err, res) => {
    if (err) return console.log('The API returned an error: in first ' + err);
    const  msgs = res.data.messages;
    if (msgs.length == 0) {
        console.log('No labels found.');

    } else {
        console.log('Messages:');
        the_format = 'full';
        console.log("WE have "+ msgs.length)

        var msg = msgs;
        return  msg.map(async(mail)=>{
            gmail.users.messages.get({
                auth: oAuth2Client,
                userId: 'me',
                id: mail.id,
                payload:mail.payload,
                format: the_format,
            }, async(err, response)=> {
                if (err) {
                console.log('The API returned an error: ' + err);
                return;
                }
                else{
                    var someURLSafeBase64 =
                    response.data.payload.parts[0].body.data;
                  const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                  var bodyData = response.data.payload.parts[0].body.data;
                  // Simplified code: you'd need to check for multipart.

                  var tosave = base64.decode(
                    bodyData.replace(/-/g, "+").replace(/_/g, "/")
                  );
                  var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                  var rem1 = remlink.replace("The message response is", "");
                  var wow =  rem1.split("\n").slice(1).join("\n");

                  var rem2 = wow.replace(
                    "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                    ""
                  );
                  wolf = rem2.split("\n")[5];
                  var rest = rem2.split("\n").slice(5).join("\n");
                  says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                  body.push({ wolf, says }); //add some data
                  console.log("Body:");

                  console.log(body);
                  var filtered = body.filter(function (el) {
                    return el != null;
                  });
                  let json = JSON.stringify(filtered); //convert it back to json
                  fs.writeFile('wolf8.json', json, 'utf8',function wirtecallback (err) {
                          if (err)  console.log(err);
                              }); // write it back 
                  

                  return body;

                }
            });
        })
    }


});         

}
// wolf 9
async function getit9(){
let wolf="Your", says="Saying";
let body = [wolf,says];

const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
return  gmail.users.messages.list({
'userId': 'me',
'labelIds': 'Label_2883578332127557155',
'maxResults': 100
}, (err, res) => {
    if (err) return console.log('The API returned an error: in first ' + err);
    const  msgs = res.data.messages;
    if (msgs.length == 0) {
        console.log('No labels found.');

    } else {
        console.log('Messages:');
        the_format = 'full';
        console.log("WE have "+ msgs.length)

        var msg = msgs;
        return  msg.map(async(mail)=>{
            gmail.users.messages.get({
                auth: oAuth2Client,
                userId: 'me',
                id: mail.id,
                payload:mail.payload,
                format: the_format,
            }, async(err, response)=> {
                if (err) {
                console.log('The API returned an error: ' + err);
                return;
                }
                else{
                    var someURLSafeBase64 =
                    response.data.payload.parts[0].body.data;
                  const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                  var bodyData = response.data.payload.parts[0].body.data;
                  // Simplified code: you'd need to check for multipart.

                  var tosave = base64.decode(
                    bodyData.replace(/-/g, "+").replace(/_/g, "/")
                  );
                  var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                  var rem1 = remlink.replace("The message response is", "");
                  var wow =  rem1.split("\n").slice(1).join("\n");

                  var rem2 = wow.replace(
                    "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                    ""
                  );
                  wolf = rem2.split("\n")[5];
                  var rest = rem2.split("\n").slice(5).join("\n");
                  says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                  body.push({ wolf, says }); //add some data
                  console.log("Body:");

                  console.log(body);
                  var filtered = body.filter(function (el) {
                    return el != null;
                  });
                  let json = JSON.stringify(filtered); //convert it back to json
                  fs.writeFile('wolf9.json', json, 'utf8',function wirtecallback (err) {
                          if (err)  console.log(err);
                              }); // write it back 
                  

                  return body;

                }
            });
        })
    }


});         

}

// wolf 10
async function getit10(){
let wolf="Your", says="Saying";
let body = [wolf,says];

const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
return  gmail.users.messages.list({
'userId': 'me',
'labelIds': 'Label_6649718175944491056',
'maxResults': 100
}, (err, res) => {
    if (err) return console.log('The API returned an error: in first ' + err);
    const  msgs = res.data.messages;
    if (msgs.length == 0) {
        console.log('No labels found.');

    } else {
        console.log('Messages:');
        the_format = 'full';
        console.log("WE have "+ msgs.length)

        var msg = msgs;
        return  msg.map(async(mail)=>{
            gmail.users.messages.get({
                auth: oAuth2Client,
                userId: 'me',
                id: mail.id,
                payload:mail.payload,
                format: the_format,
            }, async(err, response)=> {
                if (err) {
                console.log('The API returned an error: ' + err);
                return;
                }
                else{
                    var someURLSafeBase64 =
                    response.data.payload.parts[0].body.data;
                  const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                  var bodyData = response.data.payload.parts[0].body.data;
                  // Simplified code: you'd need to check for multipart.

                  var tosave = base64.decode(
                    bodyData.replace(/-/g, "+").replace(/_/g, "/")
                  );
                  var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                  var rem1 = remlink.replace("The message response is", "");
                  var wow =  rem1.split("\n").slice(1).join("\n");

                  var rem2 = wow.replace(
                    "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                    ""
                  );
                  wolf = rem2.split("\n")[5];
                  var rest = rem2.split("\n").slice(5).join("\n");
                  says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                  body.push({ wolf, says }); //add some data
                  console.log("Body:");

                  console.log(body);
                  var filtered = body.filter(function (el) {
                    return el != null;
                  });
                  let json = JSON.stringify(filtered); //convert it back to json
                  fs.writeFile('wolf10.json', json, 'utf8',function wirtecallback (err) {
                          if (err)  console.log(err);
                              }); // write it back 
                  

                  return body;

                }
            });
        })
    }


});         

}
// wolf 11
async function getit11(){
let wolf="Your", says="Saying";
let body = [wolf,says];

const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
return  gmail.users.messages.list({
'userId': 'me',
'labelIds': 'Label_36904253843587211',
'maxResults': 100
}, (err, res) => {
    if (err) return console.log('The API returned an error: in first ' + err);
    const  msgs = res.data.messages;
    if (msgs.length == 0) {
        console.log('No labels found.');

    } else {
        console.log('Messages:');
        the_format = 'full';
        console.log("WE have "+ msgs.length)

        var msg = msgs;
        return  msg.map(async(mail)=>{
            gmail.users.messages.get({
                auth: oAuth2Client,
                userId: 'me',
                id: mail.id,
                payload:mail.payload,
                format: the_format,
            }, async(err, response)=> {
                if (err) {
                console.log('The API returned an error: ' + err);
                return;
                }
                else{
                    var someURLSafeBase64 =
                    response.data.payload.parts[0].body.data;
                  const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
                  var bodyData = response.data.payload.parts[0].body.data;
                  // Simplified code: you'd need to check for multipart.

                  var tosave = base64.decode(
                    bodyData.replace(/-/g, "+").replace(/_/g, "/")
                  );
                  var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
                  var rem1 = remlink.replace("The message response is", "");
                  var wow =  rem1.split("\n").slice(1).join("\n");

                  var rem2 = wow.replace(
                    "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                    ""
                  );
                  wolf = rem2.split("\n")[5];
                  var rest = rem2.split("\n").slice(5).join("\n");
                  says = rest.split("\n").slice(2).join("\n").replace("\n", "");

                  body.push({ wolf, says }); //add some data
                  console.log("Body:");

                  console.log(body);
                  var filtered = body.filter(function (el) {
                    return el != null;
                  });
                  let json = JSON.stringify(filtered); //convert it back to json
                  fs.writeFile('wolf11.json', json, 'utf8',function wirtecallback (err) {
                          if (err)  console.log(err);
                              }); // write it back 
                  

                  return body;

                }
            });
        })
    }


});         

}
// wolf 12
async function getit12(){
let wolf="Your", says="Saying";
let body = [wolf,says];

const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
return  gmail.users.messages.list({
'userId': 'me',
'labelIds': 'Label_5854846712263763371',
'maxResults': 100
}, (err, res) => {
if (err) return console.log('The API returned an error: in first ' + err);
const  msgs = res.data.messages;
if (msgs.length == 0) {
    console.log('No labels found.');

} else {
    console.log('Messages:');
    the_format = 'full';
    console.log("WE have "+ msgs.length)

    var msg = msgs;
    return  msg.map(async(mail)=>{
        gmail.users.messages.get({
            auth: oAuth2Client,
            userId: 'me',
            id: mail.id,
            payload:mail.payload,
            format: the_format,
        }, async(err, response)=> {
            if (err) {
            console.log('The API returned an error: ' + err);
            return;
            }
            else{
                var someURLSafeBase64 =
                response.data.payload.parts[0].body.data;
              const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer
              var bodyData = response.data.payload.parts[0].body.data;
              // Simplified code: you'd need to check for multipart.

              var tosave = base64.decode(
                bodyData.replace(/-/g, "+").replace(/_/g, "/")
              );
              var remlink = tosave.replace("Follow this link after approval:https://still-island-25722.herokuapp.com/","")
              var rem1 = remlink.replace("The message response is", "");
              var wow =  rem1.split("\n").slice(1).join("\n");

              var rem2 = wow.replace(
                "Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]",
                ""
              );
              wolf = rem2.split("\n")[5];
              var rest = rem2.split("\n").slice(5).join("\n");
              says = rest.split("\n").slice(2).join("\n").replace("\n", "");

              body.push({ wolf, says }); //add some data
              console.log("Body:");

              console.log(body);
              var filtered = body.filter(function (el) {
                return el != null;
              });
              let json = JSON.stringify(filtered); //convert it back to json
              fs.writeFile('wolf12.json', json, 'utf8',function wirtecallback (err) {
                      if (err)  console.log(err);
                          }); // write it back 
              

              return body;

            }
        });
    })
}


});         
}

    getit()   .then((res) => {
        console.log("RESULT");
        console.log(res);
        next();
      })
      .catch(() => {
        res.redirect("/login");
      });

getit2()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit3()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit4()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit5().then((res) => {
    console.log("Mails:");
    console.log(res);
    next();
})      .catch(err=>{
    res.redirect('/login')
})  
getit6()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit7()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit8()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit9()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit10()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit11()   .then((res) => {
    console.log("RESULT");
    console.log(res);
    next();
  })
  .catch(() => {
    res.redirect("/login");
  });
getit12().then((res) => {
    console.log("Mails:");
    console.log(res);
    next();
})      .catch(()=>{
    res.redirect('/login')
});


    res.render('profile');

});

function checkAuthenticated(req, res, next){

    async function verify() {
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
        });
        console.log(url)

        res.redirect(url);
        
      }
      verify()
        .then(()=>{
            if (authed) {
             
            }
        })
        .catch(console.error);     

}


app.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/profile')
            }
        });
    }
});

app.listen(port, function () {
});



        // const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        // gmail.users.labels.list({
        //     userId: 'me',
        // }, (err, res) => {
        //     if (err) return console.log('The API returned an error: ' + err);
        //     const labels = res.data.labels;
        //     if (labels.length) {
        //         console.log('Labels:');
        //         labels.forEach((label) => {
        //             console.log(`- ${label.name}`);
        //         });
        //     } else {
        //         console.log('No labels found.');
        //     }
        // });
        // res.send('Logged in')