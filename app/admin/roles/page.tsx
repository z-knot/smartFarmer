"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  Check,
  X
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
}

const permissions: Permission[] = [
  // Dashboard permissions
  { id: "dashboard.view", name: "View Dashboard", description: "Access to main dashboard", category: "Dashboard" },
  { id: "dashboard.analytics", name: "View Analytics", description: "Access to analytics and reports", category: "Dashboard" },
  
  // Field permissions
  { id: "fields.view", name: "View Fields", description: "View field information", category: "Fields" },
  { id: "fields.create", name: "Create Fields", description: "Add new fields", category: "Fields" },
  { id: "fields.edit", name: "Edit Fields", description: "Modify field information", category: "Fields" },
  { id: "fields.delete", name: "Delete Fields", description: "Remove fields", category: "Fields" },
  
  // Crop permissions
  { id: "crops.view", name: "View Crops", description: "View crop information", category: "Crops" },
  { id: "crops.manage", name: "Manage Crops", description: "Add, edit, and remove crops", category: "Crops" },
  
  // Alert permissions
  { id: "alerts.view", name: "View Alerts", description: "View system alerts", category: "Alerts" },
  { id: "alerts.manage", name: "Manage Alerts", description: "Create and manage alerts", category: "Alerts" },
  
  // IoT permissions
  { id: "iot.view", name: "View IoT Devices", description: "View device status and data", category: "IoT" },
  { id: "iot.manage", name: "Manage IoT Devices", description: "Configure and manage devices", category: "IoT" },
  
  // ML permissions
  { id: "ml.view", name: "View ML Insights", description: "Access ML predictions and recommendations", category: "Machine Learning" },
  { id: "ml.train", name: "Train Models", description: "Train and deploy ML models", category: "Machine Learning" },
  
  // User management permissions
  { id: "users.view", name: "View Users", description: "View user accounts", category: "User Management" },
  { id: "users.create", name: "Create Users", description: "Add new user accounts", category: "User Management" },
  { id: "users.edit", name: "Edit Users", description: "Modify user accounts", category: "User Management" },
  { id: "users.delete", name: "Delete Users", description: "Remove user accounts", category: "User Management" },
  
  // System permissions
  { id: "system.settings", name: "System Settings", description: "Access system configuration", category: "System" },
  { id: "system.logs", name: "View Logs", description: "Access system logs", category: "System" },
];

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: permissions.map(p => p.id),
    isSystem: true
  },
  {
    id: "agronomist",
    name: "Agronomist",
    description: "Agricultural expert with advanced analysis capabilities",
    userCount: 5,
    permissions: [
      "dashboard.view", "dashboard.analytics",
      "fields.view", "fields.edit",
      "crops.view", "crops.manage",
      "alerts.view", "alerts.manage",
      "iot.view", "iot.manage",
      "ml.view", "ml.train"
    ],
    isSystem: true
  },
  {
    id: "farm_manager",
    name: "Farm Manager",
    description: "Manages farm operations and field activities",
    userCount: 8,
    permissions: [
      "dashboard.view", "dashboard.analytics",
      "fields.view", "fields.create", "fields.edit",
      "crops.view", "crops.manage",
      "alerts.view",
      "iot.view", "iot.manage",
      "ml.view"
    ],
    isSystem: true
  },
  {
    id: "farmer",
    name: "Farmer",
    description: "Basic access to view farm data and receive recommendations",
    userCount: 25,
    permissions: [
      "dashboard.view",
      "fields.view",
      "crops.view",
      "alerts.view",
      "iot.view",
      "ml.view"
    ],
    isSystem: true
  }
];

export default function RolesManagementPage() {
  const [rolesList, setRolesList] = useState<Role[]>(roles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handlePermissionToggle = (permissionId: string, rolePermissions: string[], setPermissions: (permissions: string[]) => void) => {
    if (rolePermissions.includes(permissionId)) {
      setPermissions(rolePermissions.filter(p => p !== permissionId));
    } else {
      setPermissions([...rolePermissions, permissionId]);
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  const handleCreateRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      permissions: newRole.permissions,
      isSystem: false
    };
    setRolesList([...rolesList, role]);
    setNewRole({ name: "", description: "", permissions: [] });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRolesList(rolesList.filter(r => r.id !== roleId));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Manage user roles and their associated permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions for your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Describe the role and its responsibilities"
                />
              </div>
              <div className="grid gap-4">
                <Label>Permissions</Label>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="grid gap-2 pl-4">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between space-x-2">
                          <div className="flex-1">
                            <Label htmlFor={`new-${permission.id}`} className="text-sm font-normal">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                          <Switch
                            id={`new-${permission.id}`}
                            checked={newRole.permissions.includes(permission.id)}
                            onCheckedChange={() => 
                              handlePermissionToggle(
                                permission.id, 
                                newRole.permissions, 
                                (permissions) => setNewRole({ ...newRole, permissions })
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} disabled={!newRole.name.trim()}>
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold">{rolesList.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{rolesList.reduce((sum, role) => sum + role.userCount, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Permissions</p>
                <p className="text-2xl font-bold">{permissions.length}</p>
              </div>
              <Check className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rolesList.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.permissions.length} permissions</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={role.isSystem ? "bg-blue-500" : "bg-green-500"}>
                      {role.isSystem ? "System" : "Custom"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!role.isSystem && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
            <DialogDescription>
              Modify role permissions and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label>Role Name</Label>
                <Input
                  value={selectedRole.name}
                  disabled={selectedRole.isSystem}
                  placeholder="Role name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={selectedRole.description}
                  disabled={selectedRole.isSystem}
                  placeholder="Role description"
                />
              </div>
              <div className="grid gap-4">
                <Label>Permissions</Label>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="grid gap-2 pl-4">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between space-x-2">
                          <div className="flex-1">
                            <Label htmlFor={`edit-${permission.id}`} className="text-sm font-normal">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                          <Switch
                            id={`edit-${permission.id}`}
                            checked={selectedRole.permissions.includes(permission.id)}
                            disabled={selectedRole.isSystem}
                            onCheckedChange={() => {
                              if (!selectedRole.isSystem) {
                                const updatedPermissions = selectedRole.permissions.includes(permission.id)
                                  ? selectedRole.permissions.filter(p => p !== permission.id)
                                  : [...selectedRole.permissions, permission.id];
                                setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button disabled={selectedRole?.isSystem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}