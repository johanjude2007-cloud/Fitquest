import { useState } from 'react'
import { Page, PageHeader, PageTitle, PageBody, Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle } from '@blinkdotnew/ui'
import { Play, Flame, Clock, Dumbbell, Camera, X, RefreshCw } from 'lucide-react'

const WORKOUTS = [
  { id: 1, title: 'Push Day', duration: '45m', calories: '350', difficulty: 'Intermediate', category: 'Strength' },
  { id: 2, title: 'HIIT Cardio', duration: '20m', calories: '250', difficulty: 'Advanced', category: 'Cardio' },
  { id: 3, title: 'Leg Day', duration: '60m', calories: '500', difficulty: 'Intermediate', category: 'Strength' },
  { id: 4, title: 'Core Crusher', duration: '15m', calories: '150', difficulty: 'Beginner', category: 'Abs' },
  { id: 5, title: 'Yoga Flow', duration: '30m', calories: '120', difficulty: 'Beginner', category: 'Flexibility' },
  { id: 6, title: 'Back & Biceps', duration: '50m', calories: '400', difficulty: 'Intermediate', category: 'Strength' },
]

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeSession, setActiveSession] = useState<any>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const categories = ['All', 'Strength', 'Cardio', 'Abs', 'Flexibility']

  const filteredWorkouts = selectedCategory === 'All' 
    ? WORKOUTS 
    : WORKOUTS.filter(w => w.category === selectedCategory)

  return (
    <Page>
      <PageHeader>
        <PageTitle>Workout Library</PageTitle>
      </PageHeader>
      <PageBody className="space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map(workout => (
            <div key={workout.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
              <div className="h-40 bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <Badge variant="secondary" className="w-fit mb-1">{workout.category}</Badge>
                  <h3 className="text-white font-bold text-lg">{workout.title}</h3>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {workout.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-accent" /> {workout.calories} kcal
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-3 w-3" /> {workout.difficulty}
                  </div>
                </div>
                <Button 
                  onClick={() => setActiveSession(workout)}
                  className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Play className="h-4 w-4 fill-current" /> Start Session
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
           <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shrink-0">
             <Camera className="h-8 w-8 text-primary-foreground" />
           </div>
           <div className="flex-1 text-center md:text-left">
             <h3 className="text-lg font-bold">AI Form Check</h3>
             <p className="text-sm text-muted-foreground">Use your camera during workouts to get real-time feedback on your posture and form. Powered by FitQuest AI.</p>
           </div>
           <Button variant="outline" className="shrink-0">How it works</Button>
        </div>
      </PageBody>

      {/* Workout Session Dialog */}
      <Dialog open={!!activeSession} onOpenChange={() => setActiveSession(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b border-border flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-black uppercase italic">{activeSession?.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">Session in progress...</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setActiveSession(null)}>
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-background">
            <div className="flex-[2] relative bg-black flex items-center justify-center group">
              {isCameraActive ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                     <Camera className="h-12 w-12 text-muted-foreground animate-pulse" />
                     <p className="absolute bottom-12 text-xs font-bold text-primary uppercase tracking-widest">FitQuest AI Scan Active</p>
                  </div>
                  {/* Mock Pose overlay */}
                  <div className="absolute inset-0 border-2 border-primary/20 pointer-events-none">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-primary/40 rounded-full" />
                  </div>
                  <div className="absolute top-6 left-6 bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold border border-green-500/50 uppercase">
                    Perfect Form
                  </div>
                </div>
              ) : (
                <div className="text-center p-12">
                   <Dumbbell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                   <p className="text-muted-foreground">Instructional video or camera view will appear here.</p>
                   <Button onClick={() => setIsCameraActive(true)} variant="outline" className="mt-4 gap-2">
                     <Camera className="h-4 w-4" /> Enable AI Form Check
                   </Button>
                </div>
              )}
            </div>
            
            <div className="flex-1 border-l border-border p-6 overflow-y-auto space-y-6">
               <div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Up Next</h4>
                 <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={cn("p-4 rounded-xl border border-border flex items-center justify-between", i === 1 ? "bg-primary/10 border-primary/30" : "bg-card")}>
                        <div>
                          <p className="text-sm font-bold">Exercise {i}</p>
                          <p className="text-[10px] text-muted-foreground">12 Reps · 3 Sets</p>
                        </div>
                        {i === 1 && <Badge className="bg-primary text-primary-foreground">Active</Badge>}
                      </div>
                    ))}
                 </div>
               </div>
               
               <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                 <p className="text-[10px] font-black uppercase text-accent mb-1">AI Tip</p>
                 <p className="text-sm italic">"Keep your back straight and engage your core more for better stability."</p>
               </div>

               <Button className="w-full h-12 text-lg font-bold" onClick={() => setActiveSession(null)}>
                 Finish Workout
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Page>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
