import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import getToken from '../../shared/userIdentification/getToken';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask'
import GetTask from './GetTask';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [complete, setComplete] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [navigateTask, setNavigateTask] = useState(false);
  const [navigateUpdateTask, setNavigateUpdateTask] = useState(false);
  const [navigateDeleteTask, setNavigateDeleteTask] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = getToken();
    axios.get('http://localhost:3200/task/getTasks')
      .then((res) => {
        setTodos(res.data.tasks);
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: (err.response.data.message || err.response.data),
          confirmButtonColor: '#E74C3C'
        });
      });
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const rows = todos.map((task) => {
    var complete;
    if (task.task.complete === false) {
      complete = 'Incomplete'
    } else if (task.task.complete === true) {
      complete = 'Complete';
    }
    return {
      Title: task.task.title, Description: task.task.description, Priority: task.task.priority, Complete: complete , Id: task.task._id,
      Edit: <Button sx={{ color: '#000000' }}  startIcon={<EditIcon />} onClick={() => updateTaskButton(task.task._id)}> </Button>,
      Delete: <Button sx={{ color: '#000000' }} startIcon={<DeleteIcon/>} onClick={() => deleteTaskButton(task.task._id)}> </Button>
    }
  });

  const logout = async () => {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to='/login' />;
  }

  const addTask = () => {
    setNavigateTask(true)
  }
  if (navigateTask) {
    return <Navigate to='/addTask' />;
  }

  const navigateDelete = () => {
    setNavigateDeleteTask(true)
  }
  if(navigateDeleteTask){
    return <DeleteTask title={title} setTitle={setTitle} description={description} setDescription={setDescription} priority={priority} setPriority={setPriority} complete={complete} setComplete={setComplete} idTask={idTask}/>
  }

  const navigateUpdate = () => {
    setNavigateUpdateTask(true)
  }
  if (navigateUpdateTask) {
    return <UpdateTask title={title} setTitle={setTitle} description={description} setDescription={setDescription} priority={priority} setPriority={setPriority} complete={complete} setComplete={setComplete} idTask={idTask}/>;
  }

  const getIdTask = (id) => {
    setIdTask(id);
  } 

  const GetATask = (idTask) => {
    GetTask(setTitle, setDescription, setPriority, setComplete, idTask);
  } 

  async function updateTaskButton(taskId) {
    await getIdTask(taskId);
    await GetATask(taskId);
    navigateUpdate();
  }

  async function deleteTaskButton(taskId) {
    await getIdTask(taskId);
    await GetATask(taskId);
    navigateDelete();
  }

  return (
    <>
      <h3 style={{ marginLeft: '50%' }}>ToDo List</h3>
      <Box sx={{ width: '100%', mt: -10, mb: 5, ml: 60 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Button variant="contained" onClick={logout}><LogoutIcon /> Logout</Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper} sx={{ width: '60%', marginLeft: '18%', marginRight: '-2%' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Title</StyledTableCell>
              <StyledTableCell align='center'>Description</StyledTableCell>
              <StyledTableCell align='center'>Priority</StyledTableCell>
              <StyledTableCell align='center'>Complete</StyledTableCell>
              <StyledTableCell align='center'>Edit</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Title} sx={row.Complete == 'Complete'? {textDecoration:'line-through'}:{textDecoration:'none'}}>
                <StyledTableCell align="center">{row.Title}</StyledTableCell>
                <StyledTableCell align="center">{row.Description}</StyledTableCell>
                <StyledTableCell align="center">{row.Priority}</StyledTableCell>
                <StyledTableCell sx={row.Complete == 'Complete'? {color: '#06A319'}:{color: '#DE3E22'}} align="center">{row.Complete}</StyledTableCell>
                <StyledTableCell align="center">{row.Edit}</StyledTableCell>
                <StyledTableCell align="center">{row.Delete}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: '100%', mt: 5 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Button variant="contained" color="success" onClick={addTask}>Add task <AddIcon /></Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ToDoList;