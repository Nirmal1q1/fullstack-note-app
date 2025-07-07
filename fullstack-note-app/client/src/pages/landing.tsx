import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { StickyNote, FolderSync, Shield, Search } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <StickyNote className="inline mr-2 text-primary" />
                NoteSync
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Your thoughts,</span>
                  <span className="block text-primary xl:inline"> organized beautifully</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Capture ideas, organize thoughts, and access your notes from anywhere. 
                  NoteSync keeps your digital life perfectly synchronized.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/signup">
                      <Button size="lg" className="w-full bg-primary hover:bg-indigo-700">
                        Start Taking Notes
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/login">
                      <Button size="lg" variant="outline" className="w-full text-primary border-primary hover:bg-indigo-50">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-br from-primary to-secondary sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl max-w-md">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900">Meeting Notes</h3>
                  <p className="text-sm text-gray-600">Q4 Planning Session...</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900">Project Ideas</h3>
                  <p className="text-sm text-gray-600">New feature concepts...</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900">Daily Journal</h3>
                  <p className="text-sm text-gray-600">Reflections and thoughts...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful features designed for modern note-taking
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl mx-auto">
                <FolderSync className="text-white text-2xl" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">FolderSync Everywhere</h3>
              <p className="mt-2 text-base text-gray-500">
                Access your notes on any device, anytime, anywhere with real-time synchronization.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-xl mx-auto">
                <Shield className="text-white text-2xl" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Secure & Private</h3>
              <p className="mt-2 text-base text-gray-500">
                Your notes are encrypted and protected with enterprise-grade security.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent rounded-xl mx-auto">
                <Search className="text-white text-2xl" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Smart Search</h3>
              <p className="mt-2 text-base text-gray-500">
                Find any note instantly with powerful search and tagging capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
