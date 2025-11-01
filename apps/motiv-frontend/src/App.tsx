import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [users, setUsers] = useState([])

  async function loadUsers(){
   try {
    const {data} =  await axios.get('/api/get-all')
    setUsers(data)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
     <h1>Hello World</h1>
      {users && users.map((user: {name: string, email: string}) => (
      <div key={user.name}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
     ))}
    </>
  )
}

export default App
