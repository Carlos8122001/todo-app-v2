import { useState, useRef, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import {
  Box,
  Input,
  Container,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Tabs,
  TabList,
  Tab,
  Button,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [errorInput, setErrorInput] = useState(false);
  const [filter, setFilter] = useState("all");

  const taskComplete = [...todos].filter((task) => task.completed === true);

  const taskActive = [...todos].filter((task) => task.completed === false);

  const KEY_LOCAL_STORAGE = "tasks";

  const taskRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    if (storedTasks) {
      setTodos(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const task = taskRef.current.value;
    if (task === "") return setErrorInput(true);

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });

    taskRef.current.value = null;
  };

  const togleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClearAllTodo = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <Container w={"lg"} maxH={"md"}>
        <Heading textAlign={"center"} margin={"20px auto"}>
          Todo App
        </Heading>

        <Box w={"full"}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Add your task"
              errorBorderColor="crimson"
              borderRadius={"full"}
              size={"lg"}
              focusBorderColor="green.500"
              variant={"filled"}
              ref={taskRef}
              isInvalid={errorInput}
              onChange={() => setErrorInput(false)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<AddIcon />}
                size={"md"}
                borderRadius={"full"}
                marginRight={"3"}
                marginTop={"2"}
                color={"white"}
                colorScheme="green"
                onClick={addTodo}
                type="submit"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <TodoList
          todos={
            filter === "all"
              ? todos
              : filter === "complete"
              ? taskComplete
              : filter === "pending"
              ? taskActive
              : todos
          }
          togleTodo={togleTodo}
          deleteTodo={deleteTodo}
        />
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          marginTop={4}
          size={"md"}
          marginLeft={"auto"}
          marginRight={"auto"}
        >
          <TabList>
            <Tab onClick={() => setFilter("all")}> All {todos.length} </Tab>
            <Tab onClick={() => setFilter("pending")}>
              {" "}
              Pending {taskActive.length}{" "}
            </Tab>
            <Tab onClick={() => setFilter("complete")}>
              {" "}
              Complete {taskComplete.length}{" "}
            </Tab>

            <Button
              rightIcon={<DeleteIcon />}
              colorScheme="green"
              variant="solid"
              size={"md"}
              borderRadius={"full"}
              marginLeft={3}
              onClick={handleClearAllTodo}
            >
              Clear Completed
            </Button>
          </TabList>
        </Tabs>
      </Container>
    </>
  );
}

export default App;
