import react, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link as LinkReact, Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import getToken from '../../shared/userIdentification/getToken';
import getIdentity from '../../shared/userIdentification/getIdentity'
import ToDoList from './ToDoList';
import PropTypes from 'prop-types';


const DeleteTask = ({title, setTitle,description, setDescription, priority, setPriority,complete, setComplete, idTask}) => {

    const [navigate, setNavigate] = useState(false);

    const deleteTask = async (event) => {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = getToken();
        axios.delete(`http://localhost:3200/task/deleteTask/${idTask}`)
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
        window.location.reload(false);
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} ml={40} md={6} sx={{ boxShadow: "none" }}>
                <Box component="form" noValidate onSubmit={deleteTask}
                    sx={{
                        mb: 5,
                        mt: 11,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Delete Task
                    </Typography>
                    <TextField
                        margin="normal"
                        disabled
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={event => { setTitle(event.target.value); console.log(title) }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        disabled
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        disabled
                        id="priority"
                        label="Priority"
                        name="Priority"
                        autoComplete="Priority"
                        value={priority}
                        onChange={event => setPriority(event.target.value)}
                    />
                    <FormControl sx={{ m: 1, minWidth: 610 }}>
                        <InputLabel id="complete">Complete</InputLabel>
                        <Select
                            labelId="complete"
                            id="complete"
                            autoWidth
                            disabled
                            label="complete"
                            value={complete}
                            onChange={event => setComplete(event.target.value)}
                        >
                            <MenuItem value={false}>Incomplete</MenuItem>
                            <MenuItem value={true}>Complete</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Delete Task
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

export default DeleteTask;