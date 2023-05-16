// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Homepage = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('/api/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`/api/tasks/${taskId}`);
//       fetchTasks();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Task Management</h1>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task._id}>
//             <span>{task.title}</span>
//             <button onClick={() => deleteTask(task._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Homepage;
