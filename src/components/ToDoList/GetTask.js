import axios from 'axios';
import Swal from 'sweetalert2'
import getToken from '../../shared/userIdentification/getToken';

const GetTask = (setTitle, setDescription, setPriority, setComplete, idTask) => {

    axios.defaults.headers.common['Authorization'] = getToken();
    axios.get(`http://localhost:3200/task/getTask/${idTask}`)
        .then((res) => {
            setTitle(res.data.task.title);
            setDescription(res.data.task.description);
            setPriority(res.data.task.priority);
            setComplete(res.data.task.complete);
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: (err.response.data.message || err.response.data),
                confirmButtonColor: '#E74C3C'
            });
        });
}

export default GetTask