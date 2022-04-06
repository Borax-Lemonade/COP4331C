import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connect, } from "mongoose";
import cookieParser from 'cookie-parser';
import auth from './api/auth';
import character from "./api/character";
import session from "./api/session";
import user from "./api/user";
import path from "path";


const env = dotenv.config(); // env variables
const port = process.env.PORT || 8080;

const publicPath = path.resolve(__dirname, '../../frontend/build');


let app = express(); // api library

//var http = require('http').Server(app);
//var io   = require('socket.io')(http);
var server = app.listen(8080);
var socket = require('socket.io');
var io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set('port', port);



app.use(cookieParser()); // parsing cookie data (refresh token)
app.use(express.json()); // allow for sending json
app.use(express.urlencoded({ extended: true })); // allows for encoded sending
app.use(cors({
	origin: true,
	credentials: true
}));  // allow for cors and sending credentials

app.use("/auth", auth);
app.use("/char", character);
app.use("/session", session);
app.use("/user", user);

const mongoURI: string = `mongodb+srv://${process.env.ADDRESS}`;

// connection to mongodb based off env and url
connect(mongoURI, {
	auth: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	dbName: process.env.DATABASE,
	retryWrites: true,
	w: "majority"
})
	.then(() => console.log("Mongodb connected")) // good
	.catch((err) => {
		// bad
		console.log("Error with db");
		console.error(err);
	});

// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static(publicPath));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(publicPath, 'index.html'));
  });
}

//Testing Socket IO implementation from Backend
io.sockets.on('connection', function(socket: any) {
  console.log("a user connected" + socket.id);
});



/*http.listen(port, function(){
    console.log('Websocket listening on :' + port);
});
*/

// launching server
//app.listen(port, () => console.log("Server running on port " + port));
