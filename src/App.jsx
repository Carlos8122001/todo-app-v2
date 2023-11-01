import { useState, useRef, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import {
  Box,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

function App() {

  const optionFilter = {
    All: "all",
    PENDING: "pending",
    COMPLETE: "complete",
  };

  const KEY_LOCAL_STORAGE = "tasks";

  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState(optionFilter.All);

  const [errorInput, setErrorInput] = useState(false);

  const taskRef = useRef();

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

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    if (storedTasks) {
      setTodos(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Box w={{ base: "95%", md: "80%", lg: "lg" }} h={"full"} mx={"auto"}>
        <Heading
          textAlign={"center"}
          margin={"20px auto"}
          fontSize={{ sm: "4xl", base: "4xl", md: "5xl", lg: "5xl" }}
          mt={"8"}
        >
          Todo App
        </Heading>

        <Box w={"full"} display={"flex"} justifyContent={"center"}>
          <InputGroup
            size="lg"
            fontSize={"large"}
            width={{ base: "93%", md: "lg", lg: "2xl" }}
          >
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Add your task"
              errorBorderColor="crimson"
              borderRadius={"full"}
              size={"lg"}
              fontWeight={"medium"}
              height={"16"}
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
                size={"lg"}
                borderRadius={"full"}
                marginRight={"3"}
                marginTop={"4"}
                color={"white"}
                colorScheme="green"
                onClick={addTodo}
                type="submit"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Tabs
          variant="solid-rounded"
          colorScheme="green"
          marginTop={4}
          width={"full"}
          marginLeft={"auto"}
          marginRight={"auto"}
          size={"lg"}
        >
          <TabList display={"flex"} justifyContent={"center"} mx={"auto"}>
            <Tab fontSize={"lg"} onClick={() => setFilter("all")}>
              All {todos.length}
            </Tab>
            <Tab fontSize={"lg"} onClick={() => setFilter("pending")}>
              Pending {todos.filter((task) => task.completed === false).length}
            </Tab>
            <Tab fontSize={"lg"} onClick={() => setFilter("complete")}>
              Complete {todos.filter((task) => task.completed === true).length}
            </Tab>
          </TabList>
        </Tabs>

        <TodoList
          todos={
            filter === optionFilter.All
              ? todos
              : filter === optionFilter.COMPLETE
              ? todos.filter((task) => task.completed === true)
              : filter === todos.filter((task) => task.completed === false)
              ? taskActive
              : todos
          }
          togleTodo={togleTodo}
          deleteTodo={deleteTodo}
        />
      </Box>
    </>
  );
}

export default App;
