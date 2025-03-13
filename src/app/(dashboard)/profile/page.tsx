'use client'

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setIsEditing(false)
    } catch (err) {
      console.error('Error updating profile:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 bg-background text-foreground">
      <Card className="border-2 border-border bg-card">
        <CardHeader className="border-b-2 border-border">
          <CardTitle className="text-2xl font-bold flex items-center gap-4 text-foreground">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={session?.user?.image || "/images/default-avatar.png"}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback className="bg-primary text-card">
                {session?.user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl">{session?.user?.name}</h1>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-input text-foreground border-border focus:ring-ring"
                  name="name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 bg-input text-foreground border-border focus:ring-ring"
                  name="email"
                  disabled
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}