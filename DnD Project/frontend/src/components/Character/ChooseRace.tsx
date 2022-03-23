import { Box, CardContent, Grid, Typography } from "@mui/material";

const races = [
  { name: "dwarf", src: "/images/dwarf.jpg" },
  { name: "elf", src: "/images/elf.jpg" },
  { name: "gnome", src: "/images/gnome.jpg" },
  { name: "human", src: "/images/human.jpg" },
  { name: "halfling", src: "/images/halfling.jpg" },
  { name: "dragonborn", src: "/images/dragonborn.jpg" },
  { name: "half-elf", src: "/images/halfelf.jpg" },
  { name: "half-orc", src: "/images/halforc.jpg" },
  { name: "tiefling", src: "/images/tiefling.jpg" },
];

export default function CustomRace() {
  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h5" component="h2">
        SELECT A RACE
      </Typography>

      <Grid container spacing={5} columns={24} sx={{ cursor: "pointer" }}>
        {races.map((item, i) => (
          <Grid
            item
            xs={8}
            key={i}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
            onClick={() => console.log(item.name)}
          >
            <Box
              sx={{
                width: 1,
                height: 1,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <CardContent
                component="img"
                height="125"
                width="125"
                src={item.src}
                title="character1"
              />
            </Box>

            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ textTransform: "uppercase", textAlign: "center" }}
            >
              {item.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
