import { Page, PageHeader, PageTitle, PageBody, StatGroup, Stat } from '@blinkdotnew/ui'
import { TrendingUp, Activity, Award, MapPin } from 'lucide-react'

export default function Dashboard() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>FitQuest Dashboard</PageTitle>
      </PageHeader>
      <PageBody className="space-y-6">
        <StatGroup>
          <Stat label="Total Distance" value="42.5 km" trend={12.5} trendLabel="vs last week" icon={<MapPin className="text-primary" />} />
          <Stat label="Avg Heart Rate" value="138 bpm" trend={-2.1} trendLabel="vs last week" icon={<Activity className="text-accent" />} />
          <Stat label="Calories Burned" value="12,450" trend={8.3} trendLabel="vs last week" icon={<TrendingUp className="text-primary" />} />
          <Stat label="Achievements" value="8 Medals" icon={<Award className="text-accent" />} />
        </StatGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/10 rounded-lg">
                <div>
                  <p className="font-medium">Morning Run</p>
                  <p className="text-xs text-muted-foreground">Based on your BMI (22.4)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-accent">5.0 km</p>
                  <p className="text-[10px] text-muted-foreground underline cursor-pointer">Start Plan</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <div>
                  <p className="font-medium">Full Body HIIT</p>
                  <p className="text-xs text-muted-foreground">30 mins intense workout</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">320 kcal</p>
                  <p className="text-[10px] text-muted-foreground underline cursor-pointer">Start Plan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Community Post</h3>
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-muted rounded-md shrink-0 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium">@alex_fit shared a photo</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Just finished my first 10k run! Feeling amazing. Keep pushing guys! #fitness #run #goals</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                   <span>24 Likes</span>
                   <span>6 Comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageBody>
    </Page>
  )
}
