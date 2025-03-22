import { Table,TableCaption,TableHeader,TableHead, TableRow,} from './ui/table'
import React from 'react'
import { TableBody, TableCell } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
     <Table>
        <TableCaption >A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>12-02-2025</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>Microsoft</TableCell>
                        <TableCell><Badge>Selected</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
     </Table>
    </div>
  )
}

export default AppliedJobTable
