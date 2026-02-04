import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Products from "./pages/Products"
import "./App.css"

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? "layout dark" : "layout"}>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>

        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>

        <button className="modeBtn" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}

export default App