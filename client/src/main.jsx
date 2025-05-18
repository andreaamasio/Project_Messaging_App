import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
//import './index.css'

import NavBar from "./components/NavBar.jsx"
import SideBar from "./components/SideBar.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <SideBar />
  </StrictMode>
)
