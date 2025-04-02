"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import RideTimer from "@/components/ride-timer"
import LocationInput from "@/components/location-input"
import axios from "axios"
import { nanoid } from "nanoid"

export default function RideBookingApp() {
  const [startLocation, setStartLocation] = useState("")
  const [destination, setDestination] = useState("")
  const [isBooked, setIsBooked] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [Server, setServer] = useState<WebSocket | null>(null)
  const [ID, setID] = useState("")

  const [riderName, setRiderName] = useState("")
  const [riderTime, setRideTime] = useState(0)

  // useEffect(() => {
  //   let id = localStorage.getItem('userId')
  //     if(!id){
  //         id = nanoid()
  //         localStorage.setItem('userId', id)
  //     }
  //     setID(id)
  //   const server = new WebSocket(`ws://localhost:8080/?userId=${id}`)
  //   setServer(server)

  //   server.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     if(data.event == "request"){
  //       setRiderName(data.riderName)
  //     }

  //     if(data.event == "accepted"){
  //       console.log(data)
  //       setRideTime(parseInt(data.time))
  //     }

  //     if(data.event == "update"){
  //       console.log(parseInt(data.time))
  //       setRideTime(parseInt(data.time))
  //     }

  //     if(data.event == "complete"){
  //       // toast
  //       setIsBooked(false)
  //     }

  //   }

  // },[])

  useEffect(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = nanoid();
      localStorage.setItem("userId", id);
    }
    setID(id);
  
    const ws = new WebSocket(`ws://localhost:8080/?userId=${id}`);

    ws.onopen = () => console.log("WebSocket connected!");

    ws.onerror = (error) => console.error("WebSocket error:", error);
    
    setServer(ws);
  
    return () => ws.close(); // Cleanup WebSocket on unmount
  }, []);

  useEffect(() => {
    if (!Server) return;
  
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
  
      if (data.event === "request") {
        setRiderName(data.riderName);
      } else if (data.event === "accepted") {
        console.log(parseInt(data.time));
        setRideTime(parseInt(data.time));
      } else if (data.event === "update") {
        console.log(parseInt(data.time));
        setRideTime(parseInt(data.time));
      } else if (data.event === "complete") {
        console.log("Ride completed!");
        setIsBooked(false);
      }
    };
  
    Server.onmessage = handleMessage;
  
    return () => {
      Server.onmessage = null; // Cleanup when server changes
    };
  }, [Server]);

  const handleBookRide = async () => {
    if (startLocation && destination) {
      
      const response = await axios.post(`http://localhost:8000/ride`, {
        id: ID,
        source: startLocation,
        destination
      })
      setEstimatedTime(response.data.timer)
      setIsBooked(true)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <header className="p-4 bg-white shadow-sm">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center"
        >
          <Car className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold text-center">RideNow</h1>
        </motion.div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4 flex flex-col">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col gap-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-6 shadow-md">
              {isBooked ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    <RideTimer initialSeconds={estimatedTime} rideSeconds={riderTime} />
                  </h2>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Where are you going?</h2>
                  <LocationInput
                    icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
                    placeholder="Enter pickup location"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                  <LocationInput
                    icon={<Navigation className="h-5 w-5 text-muted-foreground" />}
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              )}
            </Card>
          </motion.div>

          {!isBooked && (
            <motion.div variants={itemVariants} className="mt-auto">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full py-6 text-lg font-semibold"
                  disabled={!startLocation || !destination}
                  onClick={handleBookRide}
                >
                  Book Ride Now
                </Button>
              </motion.div>
            </motion.div>
          )}

          {isBooked && (
            <motion.div variants={itemVariants} className="mt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full" onClick={() => setIsBooked(false)}>
                  Cancel Ride
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* <motion.div variants={itemVariants} className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Available drivers: 5 nearby</span>
              <span>Avg. wait time: 3 min</span>
            </div>
          </motion.div> */}
        </motion.div>
      </main>

      <footer className="p-4 bg-white border-t text-center text-sm text-muted-foreground">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          © 2025 RideNow. All rights reserved.
        </motion.p>
      </footer>
    </div>
  )
}