import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Admin = () => {
    const [employees, setEmployees] = useState<DocumentData[]>([]);
    const [clients, setClients] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeSnapshot = await getDocs(collection(db, "Employee"));
                const clientSnapshot = await getDocs(collection(db, "Client"));

                setEmployees(employeeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setClients(clientSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const downloadExcel = (data: DocumentData[], fileName: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>

                {/* Employee Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-primary">Employee Applications</h2>
                        <Button
                            onClick={() => downloadExcel(employees, "Employees")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Download className="mr-2 h-4 w-4" /> Download Excel
                        </Button>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-white/5">
                                    <TableHead className="text-gray-400">Name</TableHead>
                                    <TableHead className="text-gray-400">Email</TableHead>
                                    <TableHead className="text-gray-400">Phone</TableHead>
                                    <TableHead className="text-gray-400">Role</TableHead>
                                    <TableHead className="text-gray-400">Portfolio</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500 h-24">
                                            No applications found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((employee) => (
                                        <TableRow key={employee.id} className="border-white/10 hover:bg-white/5">
                                            <TableCell className="font-medium">{employee.name}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.phone}</TableCell>
                                            <TableCell>{employee.role}</TableCell>
                                            <TableCell className="max-w-xs truncate" title={employee.portfolio}>
                                                {employee.portfolio}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Client Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-primary">Client Inquiries</h2>
                        <Button
                            onClick={() => downloadExcel(clients, "Clients")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Download className="mr-2 h-4 w-4" /> Download Excel
                        </Button>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-white/5">
                                    <TableHead className="text-gray-400">Name</TableHead>
                                    <TableHead className="text-gray-400">Email</TableHead>
                                    <TableHead className="text-gray-400">Phone</TableHead>
                                    <TableHead className="text-gray-400">Project Type</TableHead>
                                    <TableHead className="text-gray-400">Website</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500 h-24">
                                            No inquiries found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    clients.map((client) => (
                                        <TableRow key={client.id} className="border-white/10 hover:bg-white/5">
                                            <TableCell className="font-medium">{client.name}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                            <TableCell>{client.phone}</TableCell>
                                            <TableCell>{client.projectType}</TableCell>
                                            <TableCell>{client.website}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
