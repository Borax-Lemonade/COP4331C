import { useEffect } from "react";
import { Link } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function Dashboard() {
  useEffect(() => console.log(process.env.REACT_APP_BACKEND_ADDRESS), []);

  return (
    <>
      <Box sx={{ flexGrow: 1, width: 1, height: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              D&D 25
            </Typography>
            <Button  onClick={() => { alert('Placeholder for log out function');}} color="inherit">Log Out</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <CardMedia
        component="img"
        height="775"
        width="500"
        src={require("../media/dnd_img1.jpg")}
        alt="img1"
      />
      <Box
        position="static"
        display="flex"
        width={1300}
        height={100}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        {/* <Typography variant="h5">START YOUR CAMPAIGN</Typography> */}
        <h1>START YOUR CAMPAIGN</h1>
      </Box>

      <Box
        position="static"
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <p>
          Grab a group of players, select a DM, and get started. D&D 25's
          campaign manager will make your D&D sessions feel like a breeze,
          whether you are an experienced player or just starting out.
        </p>
      </Box>

      <Box
        position="static"
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <Button onClick={() => { alert('Placeholder for Start Campaign function');}}  variant="contained">Start Campaign</Button>
      </Box>

      <CardMedia
        component="img"
        height="575"
        width="200"
        src={require("../media/dnd_img2.jpg")}
        alt="img1"
      />

      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <h1>CREATE YOUR CHARACTER</h1>
      </Box>

      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <p>
          Our interactive character builder guides you through the necessary
          steps to create your own character to use in your D&D sessions.
        </p>
      </Box>

      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <Button onClick={() => { alert('Placeholder for Create Character function');}}  variant="contained">CREATE CHARACTER</Button>
      </Box>

      <CardMedia
        component="img"
        height="575"
        width="200"
        src={require("../media/dnd_img3.jpg")}
        alt="img1"
      />
      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <h1>BUILD YOUR WORLD</h1>
      </Box>

      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <p>
          Struggling to visualize your campaign? No problem. Select from our
          list of pre-created campaign maps or upload maps of your own for your
          D&D sessions to take place in.
        </p>
      </Box>

      <Box
        display="flex"
        width={1300}
        height={90}
        alignItems="center"
        justifyContent="center"
        sx={{ mx: "auto", width: 700 }}
      >
        <Button onClick={() => { alert('Placeholder for Start Map function');}}  variant="contained">START MAP</Button>
      </Box>
    </>
  );
}
