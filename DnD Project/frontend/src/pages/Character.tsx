import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChooseClass from "../components/Character/ChooseClass";
import ChooseRace from "../components/Character/ChooseRace";
// import NumberField from "../components/NumberField";

export default function Character() {
  // TODO: Pull data from backend
  const [charClass, setCharClass] = useState("");
  const [race, setRace] = useState("");

  return (
    <>
      <Box sx={{ flexGrow: 1, width: 1, height: 1 }}>
        <Navbar />
        <Box
          position="static"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
          p={4}
        >
          <Typography variant="h5" component="h2">
            CHARACTER NAME
          </Typography>

          <TextField
            id="standard-basic"
            label="Enter Character Name"
            variant="standard"
          />
        </Box>
        <ChooseClass />

        <ChooseRace />

        <Box
          position="static"
          display="flex"
          width={1300}
          height={90}
          alignItems="center"
          justifyContent="center"
          sx={{ mx: "auto", width: 700 }}
        >
          <Typography variant="h5" component="h2">
            ENTER YOUR STATS
          </Typography>
        </Box>

        {/* <NumberField value={number} callback={(value) => setNumber(value)} /> */}

        <Grid container spacing={6} columns={24}>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Strength"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>STRENGTH</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Constitution"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>CONSTITUTION</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Dexterity"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>DEXTERITY</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Wisdom"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>WISDOM</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Intelligence"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>INTELLIGENCE</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Charisma"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>CHARISMA</p>
            </Box>
          </Grid>
        </Grid>

        <Box
          position="static"
          display="flex"
          width={1300}
          height={90}
          alignItems="center"
          justifyContent="center"
          sx={{ mx: "auto", width: 700 }}
        >
          <Typography variant="h5" component="h2">
            ENTER YOUR SKILLS
          </Typography>
        </Box>

        <Grid container spacing={6} columns={8}>
          <Grid item xs={8}>
            {/* <NumberField
              value={form.acrobatics}
              callback={(value) => setForm({ ...format, acrobatics })}
            /> */}
            <TextField
              id="standard-basic"
              fullWidth
              label="Acrobatics"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>ACROBATICS (DEX)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Animal Healing"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>ANIMAL HEALING (WIS)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Arcana"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>ARCANA (INT)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Athletics"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>ATHLETICS (STR)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Deception"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>DECEPTION (CHA)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="History"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>HISTORY (INT)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Insight"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>INSIGHT (WIS)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Intimidation"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>INTIMIDATION (CHA)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Investigation"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>INVESTIGATION (INT)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Medicine"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>MEDICINE (WIS)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Nature"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>NATURE (INT)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Perception"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>PERCEPTION (WIS)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Performance"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>PERFORMANCE (CHA)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Persuassion"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>PERSUASSION (CHA)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Sleight of Hand"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>SLEIGHT OF HAND (DEX)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Stealth"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>STEALTH (DEX)</p>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Survival"
              variant="standard"
              inputProps={{ min: 0, style: { textAlign: "center" } }}
            />
            <Box sx={{ ml: 1 }}>
              <p>SURVIVAL (WIS)</p>
            </Box>
          </Grid>
        </Grid>

        <Box
          position="static"
          display="flex"
          width={1300}
          height={90}
          alignItems="center"
          justifyContent="center"
          sx={{ mx: "auto", width: 700 }}
        >
          <Button
            onClick={() => {
              alert("Placeholder for Save Character");
            }}
            variant="contained"
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </>
  );
}
