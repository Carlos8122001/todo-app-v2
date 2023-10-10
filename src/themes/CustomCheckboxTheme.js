import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const circular = definePartsStyle({
  control: defineStyle({
    rounded: "full",
    padding:3
  })
})

export const checkboxTheme = defineMultiStyleConfig({
  variants: { circular },
})