let jsSHA = require('jssha');
let btoa = require('btoa');

let applicationId = "your-app-id";
let developerKey = "you-dev-key";

function getRandomInt() {
return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(expiresInSeconds) {
var EPOCH_SECONDS = 62167219200;
var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
var shaObj = new jsSHA("SHA-384", "TEXT");
shaObj.setHMACKey(developerKey, "TEXT");
jid = "demoUser" + getRandomInt() + '@' + applicationId;
var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
shaObj.update(body);
var mac = shaObj.getHMAC("HEX");
var serialized = body + '\0' + mac;
return btoa(serialized);
}

const express = require('express')
const app = express()
app.set('port', process.env.PORT || 3000)
// const port = app.port

app.use(express.static('public'))

app.get('/token', (req, res) => {
let thirtyMinutes = 30 * 60;
let response = JSON.stringify({
token: generateToken(thirtyMinutes)
});
res.send(response);
})

app.listen((process.env.PORT || 3000), () => console.log(`Listening on port ${port}!`))




// const https = require('https')
// const express = require('express')
// const fs = require('fs')
// const app = express()
// const socket = require('socket.io')

// const port = 3000

// let options = {
// 	key : fs.readFileSync('key.pem'),
// 	cert : fs.readFileSync('cert.pem')
// }

// let server = https.createServer(options, app)

// server.listen(process.env.PORT || port)

// app.use(express.static('public'))

// app.get('/token', (req, res) => {
// let thirtyMinutes = 30 * 60;
// let response = JSON.stringify({
// token: generateToken(thirtyMinutes)
// });
// res.send(response);
// })

// app.listen(port, () => console.log(`Listening on port ${port}!`))
