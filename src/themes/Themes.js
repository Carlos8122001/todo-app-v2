import { extendTheme } from "@chakra-ui/react";
import { checkboxTheme } from "./CustomCheckboxTheme";

// const config = {
//   initialColorMode: 'dark', // 'dark' | 'light'
//   useSystemColorMode: false,
// }

export const CustomTheme = extendTheme({
  components: { Checkbox: checkboxTheme },
});