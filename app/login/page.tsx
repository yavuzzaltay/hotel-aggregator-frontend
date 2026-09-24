'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Workflow,
  ShieldCheck,
} from 'lucide-react'
import { EASE } from '@/lib/views'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    window.setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-black px-6 py-12">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/50 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Workflow className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-4 text-lg font-semibold tracking-tight text-white">
            Hotel Intelligence
          </p>
          <p className="mt-1.5 text-sm text-white/50">
            Sign in to your data pipeline workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/50"
            >
              Corporate Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pr-3.5 pl-10 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-primary/50 focus:bg-white/[0.07]"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-[0.14em] text-white/50"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-white/40 transition-colors duration-200 hover:text-primary"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pr-10 pl-10 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-primary/50 focus:bg-white/[0.07]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors duration-200 hover:text-white/60"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Authenticating…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
              {isLoading && (
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-white/40"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-white/30">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          SOC 2 Type II · Enterprise SSO available
        </div>
      </motion.div>
    </div>
  )
}
