import { useState, useEffect } from 'react'
import { Page, PageHeader, PageTitle, PageBody, Button, Input, Badge, Card, CardContent } from '@blinkdotnew/ui'
import { User, Scale, Ruler, Award, CheckCircle2, Trophy, Medal } from 'lucide-react'
import { blink } from '@/blink/client'
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const data = await blink.db.profiles.list({
        where: { userId: user.id },
        limit: 1
      })
      if (data.length > 0) {
        setProfile(data[0])
        setWeight(data[0].weight.toString())
        setHeight(data[0].height.toString())
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }
  }

  const saveProfile = async () => {
    try {
      const payload = {
        userId: user.id,
        weight: parseFloat(weight),
        height: parseFloat(height)
      }
      if (profile) {
        await blink.db.profiles.update(profile.id, payload)
      } else {
        await blink.db.profiles.create(payload)
      }
      setIsEditing(false)
      fetchProfile()
    } catch (err) {
      console.error('Failed to save profile:', err)
    }
  }

  const bmi = profile?.weight && profile?.height 
    ? (profile.weight / (profile.height / 100) ** 2).toFixed(1)
    : null

  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' }
    if (val < 25) return { label: 'Normal', color: 'text-primary' }
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500' }
    return { label: 'Obese', color: 'text-red-500' }
  }

  const bmiCat = bmi ? getBMICategory(parseFloat(bmi)) : null

  return (
    <Page>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
      </PageHeader>
      <PageBody className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user?.displayName || 'User'}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                        <Scale className="h-3 w-3" /> Weight
                      </div>
                      <p className="text-lg font-bold">{profile?.weight || '--'} kg</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                        <Ruler className="h-3 w-3" /> Height
                      </div>
                      <p className="text-lg font-bold">{profile?.height || '--'} cm</p>
                    </div>
                  </div>
                  {bmi && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Your BMI</p>
                      <p className="text-4xl font-black text-primary mb-1">{bmi}</p>
                      <p className={cn("text-sm font-bold", bmiCat?.color)}>{bmiCat?.label}</p>
                    </div>
                  )}
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">Edit Stats</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height (cm)</label>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveProfile} className="flex-1">Save</Button>
                    <Button onClick={() => setIsEditing(false)} variant="ghost">Cancel</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex-[1.5] space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" /> Achievement Medals
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-xl grayscale opacity-40">
                  <Trophy className="h-10 w-10 text-yellow-500" />
                  <p className="text-[10px] text-center font-medium">100km Run</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-xl">
                  <Medal className="h-10 w-10 text-accent" />
                  <p className="text-[10px] text-center font-bold">First 5k</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                  <Award className="h-10 w-10 text-primary" />
                  <p className="text-[10px] text-center font-bold">Consistency</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-xl grayscale opacity-40">
                  <Medal className="h-10 w-10 text-gray-400" />
                  <p className="text-[10px] text-center font-medium">Marathon</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Personalized Plan
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-bold text-sm">Suggested Diet</p>
                  <p className="text-xs text-muted-foreground mt-1">High protein, moderate carbs focused on muscle recovery and fat loss.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-bold text-sm">Weekly Goal</p>
                  <p className="text-xs text-muted-foreground mt-1">Run 15km total + 3 Strength sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageBody>
    </Page>
  )
}
