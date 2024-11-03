'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export default function DroneRegistration() {
  const [serialNumber, setSerialNumber] = useState('')
  const [model, setModel] = useState<'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight'>('Lightweight')
  const [weightLimit, setWeightLimit] = useState('')
  const [batteryCapacity, setBatteryCapacity] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/drones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serialNumber,
          model,
          weightLimit: Number(weightLimit),
          batteryCapacity: Number(batteryCapacity),
        }),
      })

      if (!response.ok) throw new Error('Failed to register drone')

      toast({
        title: 'Success',
        description: 'Drone registered successfully',
      })

      // Reset form
      setSerialNumber('')
      setModel('Lightweight')
      setWeightLimit('')
      setBatteryCapacity('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register drone. Please try again.',
        variant: 'destructive',
      })
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Select value={model} onValueChange={(value: 'Lightweight' | 'Cruiserweight' | 'Heavyweight') => setModel(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lightweight">Lightweight</SelectItem>
            <SelectItem value="Middleweight">Middleweight</SelectItem>
            <SelectItem value="Cruiserweight">Cruiserweight</SelectItem>
            <SelectItem value="Heavyweight">Heavyweight</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="weightLimit">Weight Limit (gr)</Label>
        <Input
          id="weightLimit"
          type="number"
          value={weightLimit}
          onChange={(e) => setWeightLimit(e.target.value)}
          max={500}
          required
        />
      </div>
      <div>
        <Label htmlFor="batteryCapacity">Battery Capacity (%)</Label>
        <Input
          id="batteryCapacity"
          type="number"
          value={batteryCapacity}
          onChange={(e) => setBatteryCapacity(e.target.value)}
          min={0}
          max={100}
          required
        />
      </div>
      <Button type="submit">Register Drone</Button>
    </form>
  )
}