import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useState } from "react";
import request from "../utils/request";
// import { useNavigate } from "react-router-dom";

const FieldStyle = {
  backgroundColor: "white",
  borderRadius: "4px",
  marginRight: "0.1rem",
  marginLeft: "0.1rem",
};

export default function Signup() {
  // const nav = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+ regex for email
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEncountered, setErrorEncountered] = useState(false);
  const [needToVerify, setNeedToVerify] = useState(false);

  const updateValue = (key: string) => {
    return (e: any) => {
      setForm({ ...form, [key]: e.target.value });
      setErrorEncountered(false);
    };
  };

  const submitForm = async () => {
    try {
      if (confirmPass !== form.password) {
        throw new Error("Passwords do not match");
      }

      if ([form.username, form.email].some((item) => item.trim() === "")) {
        throw new Error("Empty fields");
      }

      setErrorEncountered(false);

      request.post("/auth/signup", form).then(() => {
        setNeedToVerify(true);
        // nav("/dashboard")
      });
    } catch (error) {
      // console.error(error);
      setErrorEncountered(true);
      setErrorMessage(
        (error as any)?.response?.data.error || (error as Error).toString()
      );
    }
  };

  return (
    <>
      <Box sx={{ height: 1 }} className="dragon-background">
        <Grid container sx={{ height: 1 }}>
          <Grid item xs={6} sx={{ height: 1, backgroundColor: "gray" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "black",
                color: "white",
                height: 1,
              }}
            >
              {errorEncountered && (
                <Alert severity="error" id="errorMessage">
                  {errorMessage}
                </Alert>
              )}

              <Typography variant="h4" component="h2" my={2}>
                Start Your D&D Campaign Today
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "65%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "",
                  }}
                >
                  <TextField
                    style={FieldStyle}
                    id="outlined-basic"
                    type="text"
                    autoComplete="current-password"
                    margin="dense"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={updateValue("firstName")}
                    fullWidth
                  />

                  <TextField
                    style={FieldStyle}
                    id="outlined-basic"
                    type="text"
                    autoComplete="current-password"
                    margin="dense"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={updateValue("lastName")}
                    fullWidth
                  />
                </Box>

                <TextField
                  style={FieldStyle}
                  id="outlined-basic"
                  type="text"
                  autoComplete="current-password"
                  margin="dense"
                  placeholder="Email"
                  value={form.email}
                  onChange={updateValue("email")}
                  fullWidth
                />

                <TextField
                  style={FieldStyle}
                  id="outlined-basic"
                  placeholder="Username"
                  type="text"
                  autoComplete="current-password"
                  margin="dense"
                  onChange={updateValue("username")}
                  fullWidth
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <TextField
                    style={FieldStyle}
                    id="outlined-basic"
                    placeholder="Password"
                    type="password"
                    autoComplete="password"
                    margin="dense"
                    onChange={updateValue("password")}
                    fullWidth
                  />

                  <TextField
                    style={FieldStyle}
                    id="outlined-basic"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    margin="dense"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    fullWidth
                  />
                </Box>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                  variant="contained"
                  color="primary"
                  sx={{ px: 2, py: 1, my: 1 }}
                >
                  Create Account
                </Button>

                <Box my={2}>
                  <Typography variant="subtitle1">
                    Already have an account?
                    <Link
                      href="/login"
                      mx={1}
                      underline="none"
                      color="secondary"
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Box>
              {needToVerify && (
                <Alert sx={{ px: 4 }}>
                  Your account has been made. Please check your email to verify.
                </Alert>
              )}
            </Box>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Box>
    </>
  );
}
