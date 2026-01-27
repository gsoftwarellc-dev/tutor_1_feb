"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [role, setRole] = useState<string>("student")
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            router.push(`/${role}`)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="bg-white/50 p-4 rounded-xl border border-slate-50 mb-6 flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="Acelab Logo" className="h-16 w-auto object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Acelab Tutors
                    </h1>
                    <p className="text-slate-500 mt-2">Welcome back! Please sign in.</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                readOnly
                                className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 focus:outline-none"
                                value={role === "student" ? "student@acelab.com" : role === "parent" ? "parent@acelab.com" : role === "tutor" ? "tutor@acelab.com" : "admin@acelab.com"}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                readOnly
                                className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 focus:outline-none"
                                value="password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Select Role (Demo Access)</label>
                        <select
                            className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white font-medium"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-1">
                            * Selecting a role will automatically set demo credentials.
                        </p>
                    </div>

                    <Button
                        onClick={handleLogin}
                        type="button"
                        className="w-full h-11 text-base bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : (
                            <>Sign In as <span className="capitalize ml-1 font-bold">{role}</span> <ArrowRight size={18} className="ml-2" /></>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Don&apos;t have an account? <Link href="#" className="text-primary hover:underline">Sign up</Link></p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <Link href="/" className="text-slate-400 hover:text-slate-600 underline underline-offset-4">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
