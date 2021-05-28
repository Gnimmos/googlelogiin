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
var compares = require('./compares');
const base64 = require('js-base64').Base64;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(  cors({
    origin: 'http://localhost:3000'+'http://wolvestalk.commedia.wiki',
    credentials: false,
  }));
  

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
                        location.set('http://localhost:5000/profile')
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



app.use('/compares',compares);
app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})
app.get('/profile',getmail, async(req, res) => {


    res.render('profile');
})

async function getmail(req, res, next) {


    let body = {};
    async function getit(){
    const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
     gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'UNREAD',
        'maxResults': 10
      }, (err, res) => {
            if (err) return console.log('The API returned an error: in first ' + err);
            const  msgs= res.data.messages;
            if (msgs.length == 0) {
                console.log('No labels found.');

            } else {
                console.log('Messages:');
                the_format = 'full';
                console.log("WE have "+ msgs.length)
                var msg = msgs;
                msg.map(async(mail)=>{
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
                            var someURLSafeBase64 = response.data.payload.parts[0].body.data;
                            const messege = URLSafeBase64.decode(someURLSafeBase64); // returns a buffer


                              //  console.log(response.data.payload.parts);
                                var bodyData = response.data.payload.parts[0].body.data;
                                // Simplified code: you'd need to check for multipart.

                               
                                var tosave =  base64.decode(bodyData.replace(/-/g, '+').replace(/_/g, '/'));
                                var rem1 =  tosave.replace('The message response is','')
                                var rem2 = rem1.replace('Email sent via EmailJS.com [https://www.emailjs.com?src=email-footer]','')
                                console.log(rem2);
                                var numberOfLineBreaks = (rem2.match(/\n/g)||[]).length;
                                var characterCount = rem2.length + numberOfLineBreaks;
                                console.log('Number of breaks:  ' + numberOfLineBreaks);
                                // fs.readFile('./mails.json', function (err, data) {
                                //     var json = JSON.parse(data)
                                //     json.push( rem2 ),
                                //     console.log(json)
                                //     fs.writeFile(path.join(__dirname, './mails.json'), json, 'utf8', function (err) {
                                //         if (err) return console.log(err);
                                //             });
                                // })
                            
                        }
                      });
                })

            }
        });
    }
    getit().then(()=>{
        console.log(body)

        req.mail = body;
        next();
    })      .catch(err=>{
        res.redirect('/login')
    })
  
}


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
    // var body =[];

    // if (!authed) {
    //     // Generate an OAuth URL and redirect there
    //     const url = oAuth2Client.generateAuthUrl({
    //         access_type: 'offline',
    //         scope: 'https://www.googleapis.com/auth/gmail.readonly'
    //     });
    //     console.log(url)
    //     res.redirect(url);
    // } else {
        
    //     // getmail(), function(stories) {
    //     //     console.log(stories);
    //     // };
    //     getmail().then(function(gmail) {
    //         console.log("mails"); // "Success"

    //         console.log(gmail); // "Success"
    //       }, function(value) {
    //       });

// getmail = async function(){
//     const gmail = await google.gmail({ version: 'v1', auth: oAuth2Client });
//     const body = [];

//     await  gmail.users.messages.list({
//         'userId': 'me',
//         'labelIds': 'UNREAD',
//         'maxResults': 10
//       }, (err, res) => {
//             if (err) return console.log('The API returned an error: ' + err);
//             const  msgs= res.data.messages;
//             if (msgs.length == 0) {
//                 console.log('No labels found.');

//             } else {
//                 console.log('Messages:');
//                 the_format = 'full';
//                 for (var i = 0; i < msgs.length; i++) {
//                   var msg = msgs[i];
//                  gmail.users.messages.get({
//                     auth: oAuth2Client,
//                     userId: 'me',
//                     id: msg.id,
//                     payload:msg.payload,
//                     format: the_format,
//                   }, function(err, response) {
//                     if (err) {
//                        console.log('The API returned an error: ' + err);
//                        return;
//                     }
//                     else{
//                         console.log("Returning")
//                         return response.data.payload.parts[0].body.data;
//                     }
//                   });
//                   console.log(body[i])

//                 }  
//             }
//         });
//         console.log(body);
//         return Promise.all(body,gmail);
//     }
// })

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