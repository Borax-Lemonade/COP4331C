import * as React from "react";
import { Box, Button, TextField, FormLabel, IconButton } from "@mui/material";
import {Send, MeetingRoom} from "@mui/icons-material";
import { io } from "socket.io-client";
import {useState} from 'react';

export default function TestChat() {
    const [value, setValue] = useState("");
    const textInput = React.useRef(null);
    const socket = io('http://localhost:8080');

    //WebSocket event that emits a console logged message to all users
    socket.on('message', text => {
      console.log("The message was "+ "'" + text + "'");
      setValue('');
    });

  //Create button to test function (will eventually be sending messages)
    const SendButton = () => (
    <IconButton onClick = {() => socket.emit('message', value) }>
      <Send />
    </IconButton>
    );

   //Will trigger the event for joining a room, will join the room based on textfield value 
    const JoinButton = () => (
    <IconButton onClick = {() => socket.emit('create', value) }>
      <MeetingRoom />
    </IconButton>
    );

  return (
    <>
      <Box sx={{ flexGrow: 1, width: 1, height: 1 }}>

        <TextField
          id="standard-basic"
          label="Message"
          variant="standard"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          InputProps={{ endAdornment: <SendButton /> }}
        />

        <TextField
          id="standard-basic"
          label="Join Room"
          variant="standard"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          InputProps={{ endAdornment: <JoinButton /> }}
        />
      </Box>

      
    </>
  );
}