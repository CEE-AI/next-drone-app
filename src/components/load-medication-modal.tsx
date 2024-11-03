'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

type Drone = {
  serialNumber: string
  model: 'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight'
  weightLimit: number
  batteryCapacity: number
  state: 'IDLE' | 'LOADING' | 'LOADED' | 'DELIVERING' | 'DELIVERED' | 'RETURNING'
}

type LoadMedicationModalProps = {
  isOpen: boolean
  onClose: () => void
  drone: Drone
  onLoadSuccess: () => void
}

export default function LoadMedicationModal({ isOpen, onClose, drone, onLoadSuccess }: LoadMedicationModalProps) {
  const [medicationName, setMedicationName] = useState('')
  const [medicationWeight, setMedicationWeight] = useState('')
  const [medicationCode, setMedicationCode] = useState('')
  const [medicationImage, setMedicationImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!medicationName || !medicationWeight || !medicationCode || !medicationImage) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      })
      return
    }

    const formData = new FormData()
    formData.append('name', medicationName)
    formData.append('weight', medicationWeight)
    formData.append('code', medicationCode)
    formData.append('image', medicationImage)

    try {
      const response = await fetch(`/api/drones/${drone.serialNumber}/load`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to load medication')

      toast({
        title: 'Success',
        description: 'Medication loaded successfully',
      })
      onLoadSuccess()
      onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load medication. Please try again.',
        variant: 'destructive',
      })
      console.error(error);
      
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Medication for Drone {drone.serialNumber}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                className="col-span-3"
                pattern="[A-Za-z0-9-_]+"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (gr)
              </Label>
              <Input
                id="weight"
                type="number"
                value={medicationWeight}
                onChange={(e) => setMedicationWeight(e.target.value)}
                className="col-span-3"
                max={drone.weightLimit}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={medicationCode}
                onChange={(e) => setMedicationCode(e.target.value)}
                className="col-span-3"
                pattern="[A-Z0-9_]+"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setMedicationImage(e.target.files?.[0] || null)}
                className="col-span-3"
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Load Medication</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}