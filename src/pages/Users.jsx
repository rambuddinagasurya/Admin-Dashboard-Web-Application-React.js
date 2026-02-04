import { useEffect, useState } from "react"

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const perPage = 5

  // ✅ Fetch from API
  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // ✅ Filter
  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.address.state.toLowerCase().includes(search.toLowerCase())
  )

  // ✅ Pagination
  const totalPages = Math.ceil(filteredUsers.length / perPage)
  const start = (page - 1) * perPage
  const currentUsers = filteredUsers.slice(start, start + perPage)

  const totalUsers = users.length
  const totalStates = new Set(users.map((u) => u.address.state)).size

  if (loading) return <p>Loading users...</p>

  return (
    <div>
      <h1 className="title">Users Dashboard</h1>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h4>Total Users</h4>
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h4>States</h4>
          <p>{totalStates}</p>
        </div>
        <div className="card">
          <h4>Showing</h4>
          <p>{currentUsers.length}</p>
        </div>
        <div className="card">
          <h4>Page</h4>
          <p>{page}</p>
        </div>
      </div>

      {/* Search */}
      <input
        className="search"
        placeholder="Search by name or state..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
      />

      {/* Table */}
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.address.state}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Users