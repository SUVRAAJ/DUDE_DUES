import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from "../api/axios"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const GroupDetail = () => {
    const {id} = useParams()
    const navigate= useNavigate()
    const user= JSON.parse(localStorage.getItem("user"))

    //setting states for groups and expenses
    const [group, setGroup] = useState(null)
    const [expenses, setExpenses] = useState([])
    const [settlements, setSettlements] = useState([])
    const [loading, setLoading] = useState(true)

    //setting states for add expense form
    const [show_form, setShow_form] = useState(false)
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("food")

    //setting states for adding members
    const [member_email, setMember_email] = useState()
    const [member_msg, setMember_msg] = useState()

    useEffect(() => {
      const fetch_data= async () => {
        try {
            const [group_res,expense_res,settlement_res]= await Promise.all(
            [
                API.get("/groups/my-groups"),
                API.get(`expenses/group/${id}`),
                API.get(`/settlement/${id}`)
            ]
        )

        console.log("expense res:", expense_res.data)
    console.log("settlement res:", settlement_res.data)
        const found_group= group_res.data.showed_groups.find(g=> g._id===id)
        setGroup(found_group)
        setExpenses(expense_res.data.check_group)
        setSettlements(settlement_res.data.transactions)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
      }
      fetch_data()
    }
    ,[id])

    //handler for add expense form
    const handle_add_expense = async () => {
    if (!description || !amount) return
    try {
      //calling the add expense api and passing necessary parameters
      await API.post("/expenses/add", {
        group_id: id,
        description,
        category,
        total_amount: parseFloat(amount)
      })
      setDescription("")
      setAmount("")
      setShow_form(false)
      // refresh expenses
      const res = await API.get(`/expenses/group/${id}`)
      setExpenses(res.data.check_group)
    } catch (err) {
      console.log(err)
    }
  }

  //handler for add member feature

  const handle_add_member= async () => {
    if(!member_email) return;
    try {
      const user_res= await API.get(`/auth/find-user?email=${member_email}`)
      const found_user= user_res.data.user

      await API.post('/groups/add-member',{
        group_id:id,
        user_id:found_user._id
      })
      
      setMember_email("") //because we have to add more members so hata dia
      setMember_msg("Member added successfully")

      //reset group info
    const res = await API.get("/groups/my-groups")
    const updated = res.data.showed_groups.find(g => g._id === id)
    setGroup(updated)

    } catch (err) {
      setMember_msg(err.response?.data?.message || "Failed to add member")
    }
  }

  //handler for mrking as settled route
  const handle_settle= async (expense_id) => {
    try {
      await API.patch(`/expenses/settle/${expense_id}`)
      const res= await API.get(`/expenses/group/${id}`)
      setExpenses(res.data.check_group)
    } catch (err) {
      console.log(err)
    }
  }

  //collecting data for the 

  const category_total= expenses.reduce((acc,expense) => {
    const cat= expense.category||"general"
    acc[cat]= (acc[cat]||0)+expense.total_amount
    return acc  
  }
  ,{})


  const chart_data= Object.entries(category_total).map(([name,value]) => ({
    name,
    value
  }
  ))

    
      const category_colors = {
    food: "bg-orange-500/20 text-orange-400",
    travel: "bg-blue-500/20 text-blue-400",
    rent: "bg-purple-500/20 text-purple-400",
    shopping: "bg-pink-500/20 text-pink-400",
    general: "bg-zinc-500/20 text-zinc-400"
  }

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Group Header */}
          <div className="flex items-start justify-between mb-8 gap-3">
  <div>
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 font-bold text-lg sm:text-xl">
        {group?.name[0].toUpperCase()}
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">{group?.name}</h1>
        <p className="text-zinc-500 text-sm">{group?.description || "No description"}</p>
      </div>
    </div>
  </div>
  <button
    onClick={() => setShow_form(!show_form)}
    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 sm:px-5 py-2.5 rounded-xl transition text-sm whitespace-nowrap"
  >
    + Add Expense
  </button>
</div>

        {/* Members */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Members</h2>
          <div className="flex gap-3 flex-wrap">
            {group?.members.map((member, i) => (
              <div key={i} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs text-indigo-300 font-medium">
                  {member.name[0].toUpperCase()}
                </div>
                <span className="text-zinc-300 text-sm">{member.name}</span>
                {member._id === user?.id && <span className="text-xs text-indigo-400">(you)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Add Member */}
<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
  <h2 className="text-white font-semibold mb-4">Add Member</h2>
  <div className="flex gap-3">
    <input
      type="email"
      placeholder="Enter their email"
      value={member_email}
      onChange={(e) => setMember_email(e.target.value)}
      className="flex-1 bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
    />
    <button
      onClick={handle_add_member}
      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl transition"
    >
      Add
    </button>
  </div>
  {member_msg && (
    <p className="text-sm mt-3 text-indigo-400">{member_msg}</p>
  )}
</div>

        {/* Add Expense Form */}
        {show_form && (
          <div className="bg-zinc-900 border border-indigo-500/30 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">New Expense</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="What was it for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition placeholder-zinc-600"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500 transition"
                >
                  <option value="food">🍔 Food</option>
                  <option value="travel">✈️ Travel</option>
                  <option value="rent">🏠 Rent</option>
                  <option value="shopping">🛍️ Shopping</option>
                  <option value="general">📦 General</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handle_add_expense}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setShow_form(false)}
                  className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settlement Section */}
        {settlements.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">💸 Who Pays Whom</h2>
            <div className="flex flex-col gap-3">
              {settlements.map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300 font-medium">{s.from.name}</span>
                    <span className="text-zinc-600">→</span>
                    <span className="text-zinc-300 font-medium">{s.to.name}</span>
                    {console.log("settlements:", settlements)}
                  </div>
                  <span className="text-indigo-400 font-bold">₹{s.amount_trans}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spending Chart */}
{chart_data.length > 0 && (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
    <h2 className="text-white font-semibold mb-4">Spending Breakdown</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chart_data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
        >
          {chart_data.map((entry, index) => (
            <Cell
              key={index}
              fill={["#6366f1", "#f97316", "#3b82f6", "#ec4899", "#8b5cf6"][index % 5]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px" }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#fff" }}
          formatter={(value) => [`₹${value}`, ""]}
        />
        <Legend
          formatter={(value) => <span style={{ color: "#a1a1aa" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
)}

        {/* Expenses List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Expenses</h2>
          {expenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">💰</p>
              <p className="text-zinc-500">No expenses yet. Add the first one!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
            {expenses.map((expense, i) => {
  const my_split = expense.splits.find(s => s.user._id === user?.id)
  return (
    <div key={i} className="flex items-start sm:items-center justify-between bg-zinc-800 px-3 sm:px-4 py-4 rounded-xl gap-2">
  <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
    <span className={`text-xs px-2 py-1 rounded-lg font-medium shrink-0 ${category_colors[expense.category] || category_colors.general}`}>
      {expense.category}
    </span>
    <div className="min-w-0">
      <p className="text-white font-medium text-sm sm:text-base truncate">{expense.description}</p>
      <p className="text-zinc-500 text-xs">Paid by {expense.paid_by?.name}</p>
    </div>
  </div>
  <div className="flex items-center gap-2 shrink-0">
    <div className="text-right">
      <p className="text-white font-bold text-sm sm:text-base">₹{expense.total_amount}</p>
      <p className="text-zinc-500 text-xs">₹{expense.splits[0]?.amount} each</p>
    </div>
    {my_split && !my_split.is_paid && expense.paid_by?._id !== user?.id && (
      <button
        onClick={() => handle_settle(expense._id)}
        className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-2 sm:px-3 py-1.5 rounded-lg transition"
      >
        Settle
      </button>
    )}
    {my_split?.is_paid && (
      <span className="text-xs bg-zinc-700 text-zinc-400 px-2 sm:px-3 py-1.5 rounded-lg">
        Settled ✓
      </span>
    )}
  </div>
</div>
  )
})}

            </div>
          )}
        </div>
      </div>
    </div>

    </>
  )
}

export default GroupDetail
