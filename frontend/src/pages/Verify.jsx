import React from 'react'
import { Mail } from 'lucide-react'

const Verify = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-850 p-8 rounded-3xl text-center space-y-6 shadow-2xl z-10 select-none">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <Mail size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Check Your Email</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We've sent you a verification link to your email address. Please check your inbox (and spam folder) to activate your account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verify