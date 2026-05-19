import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Page, PageHeader, PageTitle, PageBody, Button } from '@blinkdotnew/ui'
import { Play, Square, MapPin, Navigation } from 'lucide-react'
import { blink } from '@/blink/client'
import { useAuth } from '@/hooks/useAuth'

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

export default function RunTracker() {
  const { user } = useAuth()
  const [tracking, setTracking] = useState(false)
  const [route, setRoute] = useState<[number, number][]>([])
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null)
  const [distance, setDistance] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [duration, setDuration] = useState(0)
  
  const watchId = useRef<number | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }, [])

  useEffect(() => {
    let interval: any
    if (tracking) {
      interval = setInterval(() => {
        setDuration(Math.floor((Date.now() - (startTime || Date.now())) / 1000))
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [tracking, startTime])

  const startTracking = () => {
    if (!('geolocation' in navigator)) return
    
    setTracking(true)
    setStartTime(Date.now())
    setRoute([])
    setDistance(0)
    
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude]
        setCurrentPos(newPos)
        setRoute((prev) => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1]
            const d = calculateDistance(last[0], last[1], newPos[0], newPos[1])
            setDistance((prevD) => prevD + d)
          }
          return [...prev, newPos]
        })
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, distanceFilter: 10 }
    )
  }

  const stopTracking = async () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
    setTracking(false)
    
    // Save to DB
    if (user && route.length > 0) {
      try {
        await blink.db.runs.create({
          userId: user.id,
          distance: Number(distance.toFixed(2)),
          duration: duration,
          routeJson: JSON.stringify(route),
          calories: Math.floor(distance * 60) // Simple estimation
        })
      } catch (err) {
        console.error('Failed to save run:', err)
      }
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Run Tracker</PageTitle>
      </PageHeader>
      <PageBody className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Distance</p>
            <p className="text-3xl font-bold text-primary">{distance.toFixed(2)} km</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Duration</p>
            <p className="text-3xl font-bold text-foreground">{formatDuration(duration)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Pace</p>
            <p className="text-3xl font-bold text-accent">
              {distance > 0 ? (duration / 60 / distance).toFixed(2) : '0.00'} min/km
            </p>
          </div>
        </div>

        <div className="h-[400px] rounded-xl overflow-hidden border border-border relative z-0">
          {currentPos && (
            <MapContainer center={currentPos} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ChangeView center={currentPos} />
              <Polyline positions={route} color="#D4F268" weight={5} />
              <Marker position={currentPos}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          )}
          {!currentPos && (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!tracking ? (
            <Button onClick={startTracking} className="w-48 gap-2" size="lg">
              <Play className="h-5 w-5 fill-current" /> Start Running
            </Button>
          ) : (
            <Button onClick={stopTracking} variant="destructive" className="w-48 gap-2" size="lg">
              <Square className="h-5 w-5 fill-current" /> Stop Tracking
            </Button>
          )}
        </div>
      </PageBody>
    </Page>
  )
}
