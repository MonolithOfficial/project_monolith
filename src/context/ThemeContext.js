import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext({
  monoMusicTheme: "light",
  toggleMonoMusicTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [monoMusicTheme, setMonoMusicTheme] = useState("light")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("monoMusicTheme")
      if (stored === "dark" || stored === "light") {
        setMonoMusicTheme(stored)
      }
    }
  }, [])

  const toggleMonoMusicTheme = () => {
    const next = monoMusicTheme === "light" ? "dark" : "light"
    setMonoMusicTheme(next)
    if (typeof window !== "undefined") {
      localStorage.setItem("monoMusicTheme", next)
    }
  }

  return (
    <ThemeContext.Provider value={{ monoMusicTheme, toggleMonoMusicTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
