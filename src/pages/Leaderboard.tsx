import { useState } from 'react'
import { Page, PageHeader, PageTitle, PageBody, Avatar, AvatarFallback, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@blinkdotnew/ui'
import { Trophy, Medal, Star, ArrowUpRight } from 'lucide-react'

const TOP_RUNNERS = [
  { id: 1, name: 'Speedy Gonzales', score: '124.5', unit: 'km', rank: 1, change: '+2' },
  { id: 2, name: 'Marathon Mike', score: '118.2', unit: 'km', rank: 2, change: '-1' },
  { id: 3, name: 'Fitness Queen', score: '95.4', unit: 'km', rank: 3, change: '0' },
  { id: 4, name: 'John Doe', score: '88.1', unit: 'km', rank: 4, change: '+5' },
  { id: 5, name: 'Jane Smith', score: '72.3', unit: 'km', rank: 5, change: '-2' },
]

const TOP_WORKOUTS = [
  { id: 1, name: 'Iron Man', score: '42', unit: 'hrs', rank: 1, change: '0' },
  { id: 2, name: 'Power Pete', score: '38', unit: 'hrs', rank: 2, change: '+1' },
  { id: 3, name: 'Sarah Strong', score: '35', unit: 'hrs', rank: 3, change: '-1' },
  { id: 4, name: 'Hulk Hogan', score: '32', unit: 'hrs', rank: 4, change: '+3' },
  { id: 5, name: 'Wonder Woman', score: '28', unit: 'hrs', rank: 5, change: '0' },
]

export default function Leaderboard() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>FitQuest Leaderboard</PageTitle>
      </PageHeader>
      <PageBody className="max-w-3xl mx-auto space-y-8">
        <div className="grid grid-cols-3 gap-4 items-end pb-8 pt-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 bg-card border-2 border-slate-400 rounded-full flex items-center justify-center relative shadow-xl">
              <Avatar className="h-16 w-16">
                <AvatarFallback>2</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-slate-400 rounded-full flex items-center justify-center border-4 border-background">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>
            <p className="text-xs font-bold truncate w-full text-center mt-2">Marathon Mike</p>
            <Badge variant="outline" className="text-[10px]">118.2 km</Badge>
          </div>

          <div className="flex flex-col items-center gap-3">
             <Trophy className="h-8 w-8 text-yellow-500 animate-bounce" />
            <div className="h-28 w-28 bg-card border-4 border-yellow-500 rounded-full flex items-center justify-center relative shadow-2xl shadow-yellow-500/10">
              <Avatar className="h-24 w-24">
                <AvatarFallback>1</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-background">
                <span className="text-white text-sm font-black">1</span>
              </div>
            </div>
            <p className="text-sm font-black truncate w-full text-center mt-2">Speedy Gonzales</p>
            <Badge className="bg-yellow-500 text-black font-bold">124.5 km</Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 bg-card border-2 border-amber-700 rounded-full flex items-center justify-center relative shadow-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback>3</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-amber-700 rounded-full flex items-center justify-center border-4 border-background">
                <span className="text-white text-[10px] font-bold">3</span>
              </div>
            </div>
            <p className="text-xs font-bold truncate w-full text-center mt-2">Fitness Queen</p>
            <Badge variant="outline" className="text-[10px]">95.4 km</Badge>
          </div>
        </div>

        <Tabs defaultValue="runs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="runs" className="font-bold text-sm uppercase tracking-widest">Running Miles</TabsTrigger>
            <TabsTrigger value="workouts" className="font-bold text-sm uppercase tracking-widest">Workout Hours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="runs" className="mt-6 space-y-2">
            {TOP_RUNNERS.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
                <div className="w-8 font-black text-lg text-muted-foreground group-hover:text-primary transition-colors italic">#{user.rank}</div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-sm">{user.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Top Runner</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg leading-tight">{user.score} <span className="text-xs font-normal text-muted-foreground">{user.unit}</span></p>
                  <p className={cn("text-[10px] font-bold flex items-center justify-end gap-1", 
                    user.change.startsWith('+') ? "text-primary" : user.change.startsWith('-') ? "text-red-500" : "text-muted-foreground")}>
                    {user.change !== '0' && <ArrowUpRight className={cn("h-3 w-3", user.change.startsWith('-') && "rotate-90")} />}
                    {user.change === '0' ? 'STABLE' : user.change}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="workouts" className="mt-6 space-y-2">
            {TOP_WORKOUTS.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-colors group">
                <div className="w-8 font-black text-lg text-muted-foreground group-hover:text-accent transition-colors italic">#{user.rank}</div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-sm">{user.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Medal className="h-3 w-3 text-accent fill-current" />
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Gym Legend</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg leading-tight">{user.score} <span className="text-xs font-normal text-muted-foreground">{user.unit}</span></p>
                  <p className={cn("text-[10px] font-bold flex items-center justify-end gap-1", 
                    user.change.startsWith('+') ? "text-primary" : user.change.startsWith('-') ? "text-red-500" : "text-muted-foreground")}>
                    {user.change !== '0' && <ArrowUpRight className={cn("h-3 w-3", user.change.startsWith('-') && "rotate-90")} />}
                    {user.change === '0' ? 'STABLE' : user.change}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </PageBody>
    </Page>
  )
}
