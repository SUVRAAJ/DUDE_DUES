import React, { useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

const CreateGroup = () => {
    //setting up states
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [error,setError]= useState("")

    const navigate= useNavigate();

    const handle_create= async () => {
        if(!name) return setError("Name of the group is neccessary");
        setLoading(true)
        try {
            const res= await API.post('groups/create',{
                name,
                description
            })
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
    <>
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-zinc-950">
      
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <span className="text-white text-xl font-bold tracking-tight">Dude<span className="text-indigo-400">Dues</span></span>
        <button onClick={() => navigate("/dashboard")} className="text-zinc-500 hover:text-white text-sm transition">
          ← Back
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-1">Create a Group</h1>
        <p className="text-zinc-500 mb-8">Add a name and description to get started</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Group Name</label>
            <input
              type="text"
              placeholder="Goa Trip, Flat Expenses..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Description <span className="text-zinc-600">(optional)</span></label>
            <input
              type="text"
              placeholder="What's this group for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
            />
          </div>
          <button
            onClick={handle_create}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition mt-2"
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default CreateGroup
