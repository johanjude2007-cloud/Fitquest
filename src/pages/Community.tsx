import { useState, useEffect } from 'react'
import { Page, PageHeader, PageTitle, PageBody, Button, Avatar, AvatarFallback, Input, Card, CardContent } from '@blinkdotnew/ui'
import { Heart, MessageCircle, Share2, Plus, Image as ImageIcon } from 'lucide-react'
import { blink } from '@/blink/client'
import { useAuth } from '@/hooks/useAuth'

export default function Community() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [newCaption, setNewCaption] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await blink.db.posts.list({
        orderBy: { createdAt: 'desc' }
      })
      setPosts(data)
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    }
  }

  const createPost = async () => {
    if (!newCaption.trim()) return
    try {
      await blink.db.posts.create({
        userId: user.id,
        caption: newCaption,
        image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop', // Placeholder
        likes_count: 0,
        comments_count: 0
      })
      setNewCaption('')
      fetchPosts()
    } catch (err) {
      console.error('Failed to create post:', err)
    }
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Community Feed</PageTitle>
      </PageHeader>
      <PageBody className="max-w-2xl mx-auto space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <textarea
                  placeholder="Share your fitness progress..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[80px]"
                />
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" /> Photo
                  </Button>
                  <Button onClick={createPost} size="sm" className="gap-2 px-6">
                    <Plus className="h-4 w-4" /> Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground italic">No posts yet. Be the first to share!</p>
            </div>
          )}
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-border/60">
              <CardContent className="p-0">
                <div className="p-4 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">Fitness Fanatic</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {post.imageUrl && (
                  <div className="aspect-square bg-muted">
                    <img src={post.imageUrl} alt="Workout" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 space-y-4">
                  <p className="text-sm leading-relaxed">{post.caption}</p>
                  <div className="flex items-center gap-6 pt-2">
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-xs font-bold">{post.likesCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-xs font-bold">{post.commentsCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageBody>
    </Page>
  )
}
