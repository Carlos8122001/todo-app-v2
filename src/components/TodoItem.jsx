import React from "react";
import {
  Box,
  Card,
  CardBody,
  Checkbox,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
export default function TodoItem({ todo, togleTodo, deleteTodo }) {
  const { id, task, completed } = todo;

  const handleTodoClick = () => {
    togleTodo(id);
  };
  return (
    <>
      <Card marginTop={8} w={"full"} h={"24"} rounded={"lg"} boxShadow={"md"}>
        <CardBody
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={"row"}
        >
          <Box display={"flex"} flexDirection={"row"} gap={3}>
            <Checkbox
              checked={completed}
              defaultChecked={completed}
              size={"lg"}
              colorScheme="green"
              variant={"circular"}
              onChange={() => {
                handleTodoClick(id);
              }}
            />
            <Text
              fontSize={{ sm: "lg", md: "lg", xl: "xl" }}
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
            icon={<CloseIcon boxSize={5} />}
            color={"green"}
            bg={"transparent"}
            size={"sm"}
            sx={{
              _hover: {
                bg: "transparent",
              },
            }}
          />
        </CardBody>
      </Card>
    </>
  );
}
