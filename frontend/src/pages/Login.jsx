
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Signup from "./Signup";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
const Login = () => {



  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const handleChange=(e)=>{
    const {name, value}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value

    }
    ))


  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    console.log(formData);
    try {

          setLoading(true)

      const res = await axios.post('http://localhost:3000/api/v1/user/login', formData,{
        headers:{
          "Content-Type": "application/json"
        }
      })
    if(res.data.success){
navigate('/')
dispatch(setUser(res.data.user))
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
)
localStorage.setItem("accessToken", res.data.accessToken)
 toast.success(res.data.message)
    }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "something went wrong")
    }
    finally{
      setLoading(false)
    }
    
  }




  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Brand Header */}
      <div className="text-center mb-6 z-10 flex flex-col items-center select-none">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] border border-amber-500/30 mb-3">
          <span className="bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent font-black text-2xl italic tracking-wider">B</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-baseline">
          BigBoy<span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent ml-1">Toys</span>
        </h1>
      </div>

      <Card className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-850 shadow-2xl rounded-3xl z-10 p-2">         
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-extrabold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-300 text-xs font-bold uppercase tracking-wider">Email</Label>
              <Input 
                className="h-11 rounded-xl bg-slate-950 border border-slate-850 text-slate-100 placeholder:text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition px-4 py-2"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-slate-300 text-xs font-bold uppercase tracking-wider">Password</Label>
              </div>
              <div className="relative">
                <Input 
                  className="h-11 rounded-xl bg-slate-950 border border-slate-850 text-slate-100 placeholder:text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition px-4 py-2 pr-12"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 transition"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-slate-500 hover:text-slate-300 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 transition"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 pt-4">
          <Button 
            onClick={submitHandler} 
            type="submit"  
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-blue-500/20 cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                Please Wait
              </>
            ) : 'Login'}
          </Button>
          <p className="text-xs text-slate-400">
            Don't have an Account?{" "}
            <Link to={"/signup"} className="font-extrabold text-blue-400 hover:text-blue-300 transition-colors">
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login