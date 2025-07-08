import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useNotes } from "@/hooks/use-notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, X, Camera } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { data: notes } = useNotes();
  const [bio, setBio] = useState("Software developer passionate about creating intuitive user experiences.");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log("Profile update not implemented yet");
  };

  const stats = {
    totalNotes: notes?.length || 0,
    notesThisMonth: notes?.filter(note => {
      const noteDate = new Date(note.createdAt!);
      const now = new Date();
      return noteDate.getMonth() === now.getMonth() && noteDate.getFullYear() === now.getFullYear();
    }).length || 0,
    categoriesUsed: new Set(notes?.map(note => note.category).filter(Boolean)).size,
    daysActive: 45, // TODO: Calculate actual days active
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            {/* Profile Header */}
            <div className="flex items-center mb-8">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.profileImageUrl} />
                  <AvatarFallback className="text-lg">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-indigo-700 transition-colors">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">Member since January 2024</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.firstName || ""}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    defaultValue={user?.lastName || ""}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>

            {/* Statistics */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalNotes}</div>
                  <div className="text-sm text-gray-500">Total Notes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{stats.notesThisMonth}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{stats.categoriesUsed}</div>
                  <div className="text-sm text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.daysActive}</div>
                  <div className="text-sm text-gray-500">Days Active</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
