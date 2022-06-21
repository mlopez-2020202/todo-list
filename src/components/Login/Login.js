import react, { useState, useEffect, createContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as LinkReact, Navigate, Route, Routes} from "react-router-dom";
import ToDoList from '../ToDoList/ToDoList';
import axios from 'axios';
import getIdentity from '../../shared/userIdentification/getIdentity';
import getToken from '../../shared/userIdentification/getToken';
//import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const theme = createTheme();

export const Login = () => {

  const [navigate, setNavigate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e =>{

    e.preventDefault();
    axios.defaults.headers.common['Authorization']=getToken();
    await axios.post('http://localhost:3200/user/login', {
      email, password
    }).then((res) => {
      Swal.fire({
        icon: 'success',
        title: (res.data.message),
        confirmButtonColor: '#28B463'
      });
      setNavigate(true);
      localStorage.setItem('identity', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
    }).catch((err) =>{
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: (err.response.data.message),
        confirmButtonColor: '#E74C3C'
      });
    });    
  };

  if(navigate){
    return <Navigate to='/todo-list'/>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicar Sesión
          </Typography>
          <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkReact to="/login">
                  Forgot password?
                </LinkReact>
              </Grid>
              <Grid item>
                <LinkReact to="/register">
                  {"Don't have an account? Sign Up"}
                </LinkReact>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;