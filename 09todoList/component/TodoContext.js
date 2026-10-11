import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todo: [], 
    // methods 
    addTodo: (todo) => {}, 
    updateTodo: (id, todo) => {}, 
    deleteTodo: (id) => {}, 
    toggleComplete: (id) => {}
});

export const useTodo = () =>{
    return useContext(TodoContext);
}

export const todoProvider = TodoContext.Provider;