import { Table,TableCaption,TableHeader,TableHead, TableRow,} from './ui/table'
import React from 'react'
import { TableBody, TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    useGetAppliedJobs();
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
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job.companyId?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
        </TableBody>
     </Table>
    </div>
  )
}

export default AppliedJobTable
