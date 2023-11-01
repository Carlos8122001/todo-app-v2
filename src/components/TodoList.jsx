import React from 'react'
import TodoItem from './TodoItem';
import { List } from "@chakra-ui/react";

export default function TodoList({ todos, togleTodo, deleteTodo }) {
  return (
    <>
    <List spacing={3} w={{base:"90%",lg:"full"}} mx={"auto"}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            togleTodo={togleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
    </>
  );
}
