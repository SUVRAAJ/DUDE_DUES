import API from '../api/axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    //to navigate after a successful login we are importing useNavigate
    const navigate= useNavigate()
    //to login successfully we will need a form asking for email and password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    //handler function for form

    const handle_login= async (element) => {
        element.preventDefault()
        //preventing default nature
        try{
            //sending an api call for login if successful login we get user and token from auth controller
            const res= await API.post('/auth/login',{
                email,
                password
            })
            //locally storing token and user data
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            navigate('/dashboard')
        }
        catch(err)
        {
            setError(err.response?.data?.message||"Login failed")
        }
    }
  return(
    <>
        <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-zinc-950 flex">
      
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-zinc-900 flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 40%),
                             radial-gradient(circle at 60% 80%, #3b82f6 0%, transparent 40%)`
          }}
        />
        <div className="relative z-10">
          <span className="text-white text-2xl font-bold tracking-tight">Dude<span className="text-indigo-400">Dues</span></span>
        </div>
        <div className="relative z-10">
          <p className="text-5xl font-bold text-white leading-tight mb-6">
            Split bills.<br />
            Not <span className="text-indigo-400">friendships.</span>
          </p>
          <p className="text-zinc-400 text-lg">Track group expenses and settle up with the people that matter.</p>
        </div>
        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-white text-2xl font-bold">₹0</p>
            <p className="text-zinc-500 text-sm">awkward conversations</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">100%</p>
            <p className="text-zinc-500 text-sm">friendships intact</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <span className="text-white text-2xl font-bold tracking-tight">Dude<span className="text-indigo-400">Dues</span></span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-zinc-500 mb-8">Sign in to your account</p>
          {/* this is for error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
            {/* LOGIN FORM */}
            {/* EMAIL WITH SETTER FUNCTION */}
              <label className="text-zinc-400 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
              />
            </div>
            {/* PASSWORD WITH SETTER FUNCTION */}
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handle_login()}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handle_login}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="text-zinc-500 text-sm mt-6 text-center">
            No account yet?{" "}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition">Create one</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
