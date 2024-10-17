import { Search, Home, Map, Bell, User } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M22 12H2M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-blue-600">DroneRx</span>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>CI</AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 pr-4 py-2" placeholder="Search for medications..." />
        </div>

        {/* Quick Reorder Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Reorder</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {['Aspirin', 'Ibuprofen', 'Amoxicillin', 'Lisinopril'].map((med) => (
              <Button key={med} variant="outline" className="flex-shrink-0">
                {med}
              </Button>
            ))}
          </div>
        </section>

        {/* Active Deliveries Map */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Active Deliveries</h2>
          <div>
          <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center">
            <Map className="w-12 h-12 text-blue-500" />
          </div>
          <div className='grid w-screen h-screen grid-cols-3 grid-rows-2'>
            <Link legacyBehavior href='/public/image/Medical-Supplies-Delivery-Drone-1'>
              <a>
                <Image src="/public/image/Medical-Supplies-Delivery-Drone-1.png" alt='drone-1' fill />
              </a>
            </Link>
          </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
        <Button variant="ghost" className="flex flex-col items-center">
          <span><Home className="h-6 w-6" /></span>
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <span><Search className="h-6 w-6" /></span>
          <span className="text-xs mt-1">Search</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <span><Map className="h-6 w-6" /></span>
          <span className="text-xs mt-1">Track</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <span><Bell className="h-6 w-6 items-center" /></span>
          <span className="text-xs mt-1">Notifications</span>
        </Button>
        <Link href='/dashboard'>
          <Button variant="ghost" className="flex flex-col items-center">
            <span><User className="h-6 w-6 items-center" /></span>
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </Link>
      </nav>
    </div>
  )
}