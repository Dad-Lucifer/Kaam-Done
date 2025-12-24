import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Download,
    Search,
    Users,
    Briefcase,
    RefreshCcw,
    Calendar,
    Phone,
    Mail,
    ExternalLink,
    ChevronRight,
    TrendingUp,
    LayoutGrid,
    List as ListIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
    const [employees, setEmployees] = useState<DocumentData[]>([]);
    const [clients, setClients] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Clients
            const clientQuery = query(collection(db, "Client"), orderBy("timestamp", "desc"));
            const clientSnapshot = await getDocs(clientQuery);
            const clientData = clientSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                // Handle timestamp conversion if it exists
                date: doc.data().timestamp ? new Date(doc.data().timestamp.seconds * 1000).toLocaleDateString() : "N/A"
            }));
            setClients(clientData);

            // Fetch Employees
            const employeeQuery = query(collection(db, "Employee"), orderBy("timestamp", "desc"));
            const employeeSnapshot = await getDocs(employeeQuery);
            const employeeData = employeeSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().timestamp ? new Date(doc.data().timestamp.seconds * 1000).toLocaleDateString() : "N/A"
            }));
            setEmployees(employeeData);

        } catch (error) {
            console.error("Error fetching data: ", error);
            toast({
                title: "Error fetching data",
                description: "Please check your internet connection.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const downloadExcel = (data: DocumentData[], fileName: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.projectType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-primary font-mono text-sm animate-pulse">Establishing Secure Uplink...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

            <div className="relative max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Center</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm sm:text-base">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            System Operational
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search query..."
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={fetchData}
                            className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 text-white"
                        >
                            <RefreshCcw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Applications</CardTitle>
                            <Users className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">{employees.length}</div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-green-500" /> +{employees.filter(e => e.date === new Date().toLocaleDateString()).length} today
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Client Inquiries</CardTitle>
                            <Briefcase className="w-4 h-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">{clients.length}</div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-green-500" /> +{clients.filter(e => e.date === new Date().toLocaleDateString()).length} today
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-primary uppercase tracking-widest">Action Required</CardTitle>
                            <Calendar className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">
                                {employees.length + clients.length > 0 ? employees.length + clients.length : 0}
                            </div>
                            <p className="text-xs text-primary/80 mt-1">Pending review items</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="crew" className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <TabsList className="bg-white/5 p-1 border border-white/10 rounded-lg">
                            <TabsTrigger value="crew" className="data-[state=active]:bg-primary data-[state=active]:text-black text-muted-foreground px-6">Crew</TabsTrigger>
                            <TabsTrigger value="clients" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-muted-foreground px-6">Clients</TabsTrigger>
                        </TabsList>

                        {/* Mobile View Toggle (Visible only on small screens conceptually, but useful for all) */}
                        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${viewMode === 'table' ? 'bg-white/10 text-white' : 'text-muted-foreground'}`}
                                onClick={() => setViewMode('table')}
                            >
                                <ListIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-muted-foreground'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Crew Content */}
                    <TabsContent value="crew" className="space-y-4">
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Applicants
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-0">{filteredEmployees.length}</Badge>
                            </h2>
                            <Button
                                size="sm"
                                onClick={() => downloadExcel(employees, "Crew_Applications")}
                                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                            >
                                <Download className="w-4 h-4 mr-2" /> Export
                            </Button>
                        </div>

                        {viewMode === 'table' ? (
                            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hidden md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/10 hover:bg-white/5 bg-white/5">
                                            <TableHead className="text-white font-bold">Candidate</TableHead>
                                            <TableHead className="text-white font-bold">Role</TableHead>
                                            <TableHead className="text-white font-bold">Contact</TableHead>
                                            <TableHead className="text-white font-bold">Portfolio</TableHead>
                                            <TableHead className="text-white font-bold">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEmployees.length === 0 ? (
                                            <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
                                        ) : (
                                            filteredEmployees.map((emp) => (
                                                <TableRow key={emp.id} className="border-white/10 hover:bg-white/5 group">
                                                    <TableCell className="font-medium text-white">{emp.name}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="border-white/20 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                                                            {emp.role}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1 text-sm">
                                                            <span className="text-white/80">{emp.email}</span>
                                                            <span className="text-muted-foreground text-xs">{emp.phone}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {emp.portfolio && (
                                                            <a href={emp.portfolio} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm">
                                                                Link <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">{emp.date}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : null}

                        {/* Mobile/Grid View */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${viewMode === 'table' ? 'md:hidden' : ''}`}>
                            {filteredEmployees.map((emp) => (
                                <Card key={emp.id} className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-base text-white">{emp.name}</CardTitle>
                                                <CardDescription className="text-primary mt-1">{emp.role}</CardDescription>
                                            </div>
                                            <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">{emp.date}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Mail className="w-4 h-4" />
                                            <span className="truncate">{emp.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Phone className="w-4 h-4" />
                                            <span>{emp.phone}</span>
                                        </div>
                                        {emp.portfolio && (
                                            <Button variant="outline" size="sm" className="w-full mt-2 border-white/10 hover:bg-primary hover:text-black hover:border-primary" asChild>
                                                <a href={emp.portfolio} target="_blank" rel="noreferrer">
                                                    View Portfolio
                                                </a>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Client Content */}
                    <TabsContent value="clients" className="space-y-4">
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold text-lg flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-yellow-500" />
                                Inquiries
                                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-0">{filteredClients.length}</Badge>
                            </h2>
                            <Button
                                size="sm"
                                onClick={() => downloadExcel(clients, "Client_Inquiries")}
                                className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20"
                            >
                                <Download className="w-4 h-4 mr-2" /> Export
                            </Button>
                        </div>

                        {viewMode === 'table' ? (
                            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hidden md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/10 hover:bg-white/5 bg-white/5">
                                            <TableHead className="text-white font-bold">Client Name</TableHead>
                                            <TableHead className="text-white font-bold">Objective</TableHead>
                                            <TableHead className="text-white font-bold">Contact</TableHead>
                                            <TableHead className="text-white font-bold">Website</TableHead>
                                            <TableHead className="text-white font-bold">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredClients.length === 0 ? (
                                            <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
                                        ) : (
                                            filteredClients.map((client) => (
                                                <TableRow key={client.id} className="border-white/10 hover:bg-white/5 group">
                                                    <TableCell className="font-medium text-white max-w-[150px] truncate" title={client.name}>{client.name}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="border-white/20 text-muted-foreground group-hover:border-yellow-500/50 group-hover:text-yellow-500 transition-colors">
                                                            {client.projectType}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1 text-sm">
                                                            <span className="text-white/80 max-w-[200px] truncate" title={client.email}>{client.email}</span>
                                                            <span className="text-muted-foreground text-xs">{client.phone}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {client.website ? (
                                                            <a href={client.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm">
                                                                Site <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        ) : <span className="text-muted-foreground">-</span>}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">{client.date}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : null}

                        {/* Mobile/Grid View Clients */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${viewMode === 'table' ? 'md:hidden' : ''}`}>
                            {filteredClients.map((client) => (
                                <Card key={client.id} className="bg-white/5 border-white/10 hover:border-yellow-500/50 transition-all group">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-base text-white">{client.name}</CardTitle>
                                                <CardDescription className="text-yellow-500 mt-1">{client.projectType}</CardDescription>
                                            </div>
                                            <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">{client.date}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Mail className="w-4 h-4" />
                                            <span className="truncate">{client.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Phone className="w-4 h-4" />
                                            <span>{client.phone}</span>
                                        </div>
                                        {client.website && (
                                            <div className="flex items-center gap-3 text-sm text-blue-400">
                                                <ExternalLink className="w-4 h-4" />
                                                <a href={client.website} target="_blank" rel="noreferrer" className="truncate hover:underline">
                                                    {client.website}
                                                </a>
                                            </div>
                                        )}
                                        {client.message && (
                                            <div className="mt-2 p-2 rounded bg-black/20 text-xs text-gray-400 italic">
                                                "{client.message.length > 50 ? client.message.substring(0, 50) + '...' : client.message}"
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
