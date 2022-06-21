import react, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as LinkReact, Navigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import getToken from '../../shared/userIdentification/getToken';


export const AddTask = () => {

    const [navigate, setNavigate] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(0);

    const addTaskToList = async (event) => {
        event.preventDefault();
        var list = {
            title: title,
            description: description,
            priority: priority,
            complete: false
        }

        axios.defaults.headers.common['Authorization'] = getToken();

        await axios.post('http://localhost:3200/task/addTask', list)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: (res.data.message),
                    confirmButtonColor: '#28B463'
                });
                setTimeout(backList, 1500)
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: (err.response.data.message || err.response.data),
                    confirmButtonColor: '#E74C3C'
                });
            });
    };

    const backList = () => {
        setNavigate(true)
    }

    if(navigate){
        return <Navigate to='/todo-list' />;
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} ml={40} md={6} sx={{ boxShadow: "none" }}>
                <Box component="form" noValidate onSubmit={addTaskToList}
                    sx={{
                        mb: 5,
                        mt: 11,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Add Task 
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        onChange={event => setTitle(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        onChange={event => setDescription(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="priority"
                        label="Priority"
                        name="Priority"
                        autoComplete="Priority"
                        onChange={event => setPriority(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Task
                    </Button>
                </Box>
                <Box sx={{ width: '100%', mt: 5 }}>
                    <Grid container justifyContent="center">
                        <Grid>
                            <Button variant="contained" onClick={backList}>Cancelar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid >

    );
}

export default AddTask;
