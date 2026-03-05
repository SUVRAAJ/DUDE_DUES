import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Dashboard = () => {
  const [groups, setGroups]= useState([])
  const [loading, setLoading] = useState(true)
  const navigate= useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  //on mounting displaying all groups the user is a part of
  useEffect(() => {
    const fetch_groups= async () => {
      try {
        const res= await API.get('/groups/my-groups')
        console.log(res.data)
        setGroups(res.data.showed_groups)
      } catch (error) {
        console.log(error)
      }
      finally
      {
        setLoading(false)
      }
    }
    fetch_groups()//always call the function you create
  }
  ,[])

  //removing jwt token and navigating to login page
  const handle_logout= () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  

  return (
    <>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-zinc-950">
      
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <span className="text-white text-xl font-bold tracking-tight">Dude<span className="text-indigo-400">Dues</span></span>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-sm">Hey, {user?.name} 👋</span>
          <button
            onClick={handle_logout}
            className="text-zinc-500 hover:text-white text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Groups</h1>
            <p className="text-zinc-500 mt-1">Manage expenses across all your groups</p>
          </div>
          <button
            onClick={() => navigate("/create-group")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition"
          >
            + New Group
          </button>
        </div>

        {/* Groups Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">👥</p>
            <p className="text-white text-xl font-semibold mb-2">No groups yet</p>
            <p className="text-zinc-500 mb-6">Create your first group to start splitting expenses</p>
            <button
              onClick={() => navigate("/create-group")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Create a Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div
                key={group._id}
                onClick={() => navigate(`/group/${group._id}`)}
                className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {group.name[0].toUpperCase()}
                  </div>
                  <span className="text-zinc-600 text-xs">{group.members.length} members</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{group.name}</h3>
                <p className="text-zinc-500 text-sm">{group.description || "No description"}</p>
                <div className="mt-4 flex gap-1">
                  {group.members.slice(0, 4).map((member, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-indigo-600/30 border border-zinc-800 flex items-center justify-center text-xs text-indigo-300 font-medium"
                    >
                      {member.name[0].toUpperCase()}
                    </div>
                  ))}
                  {group.members.length > 4 && (
                    <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                      +{group.members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Dashboard
