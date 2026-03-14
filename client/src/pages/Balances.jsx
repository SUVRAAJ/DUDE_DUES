import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Balances = () => {

    const [loading, setLoading] = useState(true)
    const [balances, setBalances] = useState([])
    const navigate=useNavigate()
    const user= JSON.parse(localStorage.getItem('user'))

    useEffect( () => {
        const fetch_balances= async () => {
        try{
        const group_res= await API.get('/groups/my-groups')
        const groups= group_res.data.showed_groups

        const all_transactions=[]

        await Promise.all(groups.map(async (group) => {
            const settlement_res= await API.get(`/settlement/${group._id}`)
            const transactions= settlement_res.data.transactions
            
            transactions.forEach(element => {
                if(element.from._id=== user.id || element.to._id===user.id)
                {
                    all_transactions.push({
                        ...element,
                        group_name:group.name
                    })
                }
            });
            setBalances(all_transactions)
        }))
      } catch (err) {
        console.log(err)   
      }
      finally
      {
        setLoading(false)
      }
    }
      fetch_balances()
    }
    ,[])
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

      <div className="max-w-2xl mx-auto px-6 py-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Balance</h1>
          <p className="text-zinc-500 mt-1">Everything you owe and are owed across all groups</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : balances.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🎉</p>
            <p className="text-white text-xl font-semibold mb-2">You're all settled up!</p>
            <p className="text-zinc-500">No pending dues across any group</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {balances.map((t, i) => {
              const is_debtor = t.from._id === user.id
              return (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-500 text-xs mb-1">{t.group_name}</p>
                      {is_debtor ? (
                        <p className="text-white">
                          You owe <span className="text-red-400 font-semibold">{t.to.name}</span>
                        </p>
                      ) : (
                        <p className="text-white">
                          <span className="text-green-400 font-semibold">{t.from.name}</span> owes you
                        </p>
                      )}
                    </div>
                    <div className={`text-xl font-bold ${is_debtor ? "text-red-400" : "text-green-400"}`}>
                      {is_debtor ? "-" : "+"}₹{t.amount_trans}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Balances
