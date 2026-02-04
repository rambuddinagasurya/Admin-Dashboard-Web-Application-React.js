import { useEffect, useState } from "react"

function Home() {
  const [usersCount, setUsersCount] = useState(0)
  const [productsCount, setProductsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/users").then((r) => r.json()),
      fetch("https://dummyjson.com/products").then((r) => r.json()),
    ]).then(([usersData, productsData]) => {
      setUsersCount(usersData.total)
      setProductsCount(productsData.total)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading dashboard...</p>

  return (
    <div>
      <h1 className="title">Dashboard Overview</h1>

      <div className="cards">
        <div className="card">
          <h4>Total Users</h4>
          <p>{usersCount}</p>
        </div>

        <div className="card">
          <h4>Total Products</h4>
          <p>{productsCount}</p>
        </div>

        <div className="card">
          <h4>Status</h4>
          <p>Active</p>
        </div>

        <div className="card">
          <h4>Version</h4>
          <p>1.0</p>
        </div>
      </div>

      <p style={{ marginTop: "20px" }}>
        Welcome to your admin dashboard. Use the sidebar to manage users and products.
      </p>
    </div>
  )
}

export default Home