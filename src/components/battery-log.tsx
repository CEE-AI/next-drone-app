'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

type BatteryLog = {
  serialNumber: string
  batteryLevel: number
  timestamp: string
}

export default function BatteryLog() {
  const [logs, setLogs] = useState<BatteryLog[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/battery-logs')
        if (!response.ok) throw new Error('Failed to fetch battery logs')
        const data = await response.json()
        setLogs(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch battery logs. Please try again.',
          variant: 'destructive',
        })
        console.error(error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 60000) // Fetch every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Serial Number</TableHead>
          <TableHead>Battery Level</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{log.serialNumber}</TableCell>
            <TableCell>{log.batteryLevel}%</TableCell>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}