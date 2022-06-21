import React from 'react'
import Login from '../Login/Login';
import Register from '../Register/Register';
import ToDoList from '../ToDoList/ToDoList';
import Navigation from '../Navigation/Navigation';
import AddTask from '../ToDoList/AddTask';
import UpdateTask from '../ToDoList/UpdateTask';
import DeleteTask from '../ToDoList/DeleteTask';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export const Main = () => {

  return (
    <>
    <Router>
    <Navigation/>
    <Routes>
      <Route exact path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/todo-list" element={<ToDoList />}/>
      <Route path="/addTask" element={<AddTask />}/>
      <Route path="/updateTask" element={<UpdateTask />} />
      <Route path="/deleteTask" element={<DeleteTask />} />
      <Route path="*" element={<Navigate to='/login' replace />}/>
    </Routes>
    </Router>
    </>
  )
}
export default Main;
