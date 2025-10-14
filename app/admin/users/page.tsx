"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Shield, 
  Users, 
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'agronomist' | 'farmer' | 'farm_manager';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  farmName?: string;
  location?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "farmer",
    status: "active",
    lastLogin: "2024-03-21T10:30:00Z",
    createdAt: "2024-01-15T08:00:00Z",
    farmName: "Green Valley Farm",
    location: "California, USA"
  },
  {
    id: "2",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@agri.com",
    role: "agronomist",
    status: "active",
    lastLogin: "2024-03-21T09:15:00Z",
    createdAt: "2024-02-01T10:00:00Z",
    location: "Iowa, USA"
  },
  {
    id: "3",
    fullName: "Mike Chen",
    email: "mike.chen@farm.co",
    role: "farm_manager",
    status: "active",
    lastLogin: "2024-03-20T16:45:00Z",
    createdAt: "2024-02-15T14:30:00Z",
    farmName: "Sunrise Acres",
    location: "Nebraska, USA"
  },
  {
    id: "4",
    fullName: "Emily Rodriguez",
    email: "emily.r@email.com",
    role: "farmer",
    status: "pending",
    lastLogin: "Never",
    createdAt: "2024-03-20T12:00:00Z",
    farmName: "Rodriguez Organic Farm",
    location: "Texas, USA"
  }
];

export default function UsersManagementPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
    }
  }, [isAdmin]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.farmName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'agronomist':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'farm_manager':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'farmer':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'inactive':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'pending':
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case 'edit':
        setSelectedUser(user);
        setIsEditDialogOpen(true);
        break;
      case 'activate':
        setUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, status: 'active' as const } : u
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, status: 'inactive' as const } : u
        ));
        break;
      case 'delete':
        setUsers(prev => prev.filter(u => u.id !== user.id));
        break;
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: users.filter(u => u.status === 'active').length,
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Pending Approval",
      value: users.filter(u => u.status === 'pending').length,
      icon: UserX,
      color: "text-amber-600"
    },
    {
      title: "Administrators",
      value: users.filter(u => u.role === 'admin').length,
      icon: Shield,
      color: "text-red-600"
    }
  ];

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account for the AgriVision platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="agronomist">Agronomist</SelectItem>
                    <SelectItem value="farm_manager">Farm Manager</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="agronomist">Agronomist</SelectItem>
                <SelectItem value="farm_manager">Farm Manager</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Farm/Organization</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                        <AvatarFallback>
                          {user.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusBadgeColor(user.status)} text-white`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.farmName || 'N/A'}</p>
                      <p className="text-sm text-muted-foreground">{user.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.lastLogin === 'Never' ? (
                      <span className="text-muted-foreground">Never</span>
                    ) : (
                      <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleUserAction('edit', user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleUserAction('deactivate', user)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUserAction('activate', user)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('delete', user)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="edit-name" 
                  defaultValue={selectedUser.fullName}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  defaultValue={selectedUser.email}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="agronomist">Agronomist</SelectItem>
                    <SelectItem value="farm_manager">Farm Manager</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}