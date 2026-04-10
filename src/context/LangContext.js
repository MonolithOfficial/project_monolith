import React, { createContext, useContext, useState, useEffect } from "react"

const LangContext = createContext({ activeLang: "GEO", switchLang: () => {}, transitioning: false })

export function LangProvider({ children }) {
  const [activeLang, setActiveLang] = useState("GEO")
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("activeLang")
      if (stored) {
        setActiveLang(stored)
      } else {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        setActiveLang(tz === "Asia/Baku" ? "GEO" : "ENG")
      }
    }
  }, [])

  const switchLang = (lang) => {
    if (lang === activeLang) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveLang(lang)
      if (typeof window !== "undefined") localStorage.setItem("activeLang", lang)
      setTransitioning(false)
    }, 150)
  }

  return (
    <LangContext.Provider value={{ activeLang, switchLang, transitioning }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
