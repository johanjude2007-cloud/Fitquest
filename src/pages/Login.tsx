import { Button } from '@blinkdotnew/ui'
import { Dumbbell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { login } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-12">
            <Dumbbell className="h-8 w-8 text-primary-foreground -rotate-12" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mt-4">FitQuest</h1>
          <p className="text-muted-foreground text-sm font-medium">Your Ultimate Fitness Journey Begins Here</p>
        </div>

        <div className="space-y-4 pt-8">
          <Button onClick={login} className="w-full h-12 text-base font-bold gap-3" size="lg">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>
          <p className="text-[10px] text-muted-foreground px-6 uppercase tracking-widest font-bold">
            Secure · Fast · Synchronized
          </p>
        </div>

        <div className="pt-12 grid grid-cols-3 gap-4">
           <div className="text-center space-y-1">
             <p className="text-lg font-bold">1M+</p>
             <p className="text-[10px] text-muted-foreground uppercase font-medium">Users</p>
           </div>
           <div className="text-center space-y-1">
             <p className="text-lg font-bold">500+</p>
             <p className="text-[10px] text-muted-foreground uppercase font-medium">Workouts</p>
           </div>
           <div className="text-center space-y-1">
             <p className="text-lg font-bold">4.9/5</p>
             <p className="text-[10px] text-muted-foreground uppercase font-medium">Rating</p>
           </div>
        </div>
      </div>
    </div>
  )
}
