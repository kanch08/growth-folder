import React, { useState } from "react";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
const Task = () => {
    const [todos, setTodos] = useState([]);

    const deleteToDos = (index) => {
      console.log("called",index);
      const newToDos = {...todos};
      console.log("gghjjk",newToDos);
      setTodos(newToDos);
    }
    return (
      <div>
        <TodoForm/>

        <TodoList
        todos={todos}
        deleteToDo={deleteToDos}
         />


      </div>
    );

}

export default Task;
