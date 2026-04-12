import React from "react"
import { LangProvider } from "./src/context/LangContext"
import { ThemeProvider } from "./src/context/ThemeContext"

export const wrapRootElement = ({ element }) => (
  <LangProvider>
    <ThemeProvider>{element}</ThemeProvider>
  </LangProvider>
)
