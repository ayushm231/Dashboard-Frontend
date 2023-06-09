
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import API_URL from "../config/config";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Link,
  Grid,
  TextField,
} from "@mui/material";

import { themeSettings } from "../theme";

const Login = () => {
  const navigate = useNavigate();

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const user = {
    email,
    password,
  };

  console.log(user);
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill all the fields");
      return;
    } else {
      console.log("DONE");

      let formBody = [];
      for (let property in user) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(user[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        console.log("Encoded Key :" + encodedKey);
        console.log("Encoded Value :" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("Form Body :" + formBody);
      
      
      
        const response = await 
        fetch(`${API_URL}/general/login`, {
          method: "POST",
          // withCredentials: true,
          credentials: "include",
          // mode: "no-cors",
          // mode:"cors",
          headers: {
            // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
            // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE", // this states the allowed methods
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "application/json", // this shows the expected content type
            // "Access-Control-Allow-Origin": "*",

            // Accept: "application/json",
          },
          body: formBody,
          // body: new URLSearchParams(formBody),
          // body: JSON.stringify(user)
        })
          // .then((response) => console.log("Response :" + response.json()))
          // .then(data => console.log("Data :" + JSON.stringify(data)))
          // .catch((err) => {
          //   console.log("Error in header :" + err);
          // });
          // const data = await response.json();
          // console.log()
        
      

      console.log("This is response" + response);
      // console.log("This is response.text " + response.text())

      const data = await response.json();
      console.log("Data :" + data)
    //   data = await response.json();
      try {
        data = await response.json();
      } catch (e) {
        console.log("Error : " + e);
      }
      console.log("This is data "+data.name);
      if (data.error) {
        setError(true);
        setErrorMessage(data.error);
      } else {
        setError(false);
        console.log("loggedIn");
        localStorage.setItem("DashBoardUserLoggedIn", true);
        localStorage.setItem("DashBoardUser", JSON.stringify(data));
        navigate("/dashboard");
      }
    }
  };

  const DisplayErrorMessage = () => {
    return error ? (
      <Alert
        severity="error"
        sx={{ background: "white", color: "black", fontWeight: "bold" }}
      >
        {errorMessage}
      </Alert>
    ) : (
      ""
    );
  };

  const DisplayCredentials = () => {
    return (
      <Alert severity="success">
        FOR TESTING PURPOSES USE Email: swelbeck12@ycombinator.com, Password:
        password
      </Alert>
    );
  };
  const theme = useTheme();

  return (
    <Box
      m="1.5rem 2rem"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        gap: "3rem",
      }}
    >
      <DisplayErrorMessage />
      <Box
        pt="2rem"
        sx={{
          backgroundColor: theme.palette.background.alt,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.2rem",
        }}
      >
        <Header title="WELCOME" subtitle="Sign In to your dashboard" />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "theme.palette.secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            m="1rem"
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{
                    autoComplete: "new-email",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  onChange={handleEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handlePassword}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                p: "0.5rem 0",
                background: theme.palette.primary[400],
                "&:hover": { backgroundColor: theme.palette.primary[300] },
              }}
            >
              Sign In
            </Button>
          </Box>
          <DisplayCredentials />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
