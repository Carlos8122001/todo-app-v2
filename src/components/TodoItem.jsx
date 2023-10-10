import React from "react";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
export default function TodoItem({ todo, togleTodo, deleteTodo }) {
    const { id, task, completed } = todo;

    const handleTodoClick = () => {
      togleTodo(id);
    };
  return (
    <>
    <Card boxShadow={"md"} marginTop={8} w={"full"}>
        <CardBody
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={"row"}
        >
          <Box display={"flex"} flexDirection={"row"} gap={3}>
            <Checkbox
              checked={completed ? true : false}
              size={"lg"}
              colorScheme="green"
              rounded={"full"}
              variant={"circular"}
              onChange={() => {
                handleTodoClick(id);
              }}
            />
            <Text
              fontSize={{sm:"lg",md:"lg",xl:"xl"}}
              fontWeight={"medium"}
              textAlign={"center"}
              textDecoration={completed ? "line-through" : "none"}
            >
              {task}
            </Text>
          </Box>
          <IconButton
            onClick={() => {
              deleteTodo(id);
            }}
            icon={<CloseIcon />}
            bgColor={"transparent"}
            color={"red"}
            colorScheme="red"
            sx={{
              _hover: {
                backgroundColor: "transparent",
              },
            }}
          />
        </CardBody>
      </Card>
    </>
  );
}
