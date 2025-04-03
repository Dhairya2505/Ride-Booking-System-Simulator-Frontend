"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface RideTimerProps {
  initialSeconds: number
  rideSeconds: number
}

export default function RideTimer({ initialSeconds, rideSeconds }: RideTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [rideStarted, setRideStarted] = useState(false)

  useEffect(() => {
    if (seconds <= 0) {
      if (!rideStarted) {
        setTimeout(() => {
          setRideStarted(true)
          setSeconds(rideSeconds)
        }, 100);
      } else {
        return
      }
    }
    
    const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds, rideStarted])

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value)

  const progressPercentage = rideStarted
    ? ((rideSeconds - seconds) / rideSeconds) * 100
    : ((initialSeconds - seconds) / initialSeconds) * 100

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={rideStarted ? "#10b981" : "#7c3aed"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{
              strokeDashoffset: 283 - (283 * progressPercentage) / 100,
            }}
            transition={{ duration: 0.5 }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <Clock className={`h-5 w-5 mb-1 ${rideStarted ? "text-emerald-500" : "text-primary"}`} />
          <div className="text-2xl font-bold">
          {formatTime(Math.floor(seconds / 60))}:{formatTime(seconds % 60)}
          </div>
          <div className="text-xs text-muted-foreground">
            {rideStarted ? "remaining" : "until arrival"}
          </div>
        </div>
      </div>
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {rideStarted ? (
          <>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-emerald-600"
            >
              Your ride is in progress!
            </motion.p>
            <p className="text-sm text-muted-foreground">
              Estimated arrival at destination in {seconds} sec
            </p>
          </>
        ) : (
          <>
            <p className="font-medium">Estimated arrival time</p>
            <p className="text-sm text-muted-foreground">
              Driver is {seconds} seconds away
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}