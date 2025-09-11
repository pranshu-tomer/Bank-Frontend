import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  CreditCard,
  Key,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    marketing: false
  });

  const userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    memberSince: '2020-03-15',
    accountStatus: 'verified'
  };

  const securitySettings = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: true,
      type: 'security'
    },
    {
      title: 'Login Alerts',
      description: 'Get notified when someone logs into your account',
      enabled: true,
      type: 'security'
    },
    {
      title: 'Transaction Alerts',
      description: 'Receive alerts for transactions over $500',
      enabled: true,
      type: 'security'
    },
    {
      title: 'Account Statements',
      description: 'Monthly account statements via email',
      enabled: true,
      type: 'notification'
    }
  ];

  const connectedAccounts = [
    { id: 1, name: 'Primary Checking', number: '****1234', type: 'checking', status: 'active' },
    { id: 2, name: 'High-Yield Savings', number: '****5678', type: 'savings', status: 'active' },
    { id: 3, name: 'Emergency Fund', number: '****9101', type: 'savings', status: 'active' },
    { id: 4, name: 'Rewards Credit Card', number: '****9012', type: 'credit', status: 'active' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your personal information and account preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {userInfo.firstName} {userInfo.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{userInfo.email}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge 
                    variant={userInfo.accountStatus === 'verified' ? 'secondary' : 'destructive'}
                    className="flex items-center space-x-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span className="capitalize">{userInfo.accountStatus}</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Member since {formatDate(userInfo.memberSince)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={userInfo.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={userInfo.lastName} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="email" type="email" defaultValue={userInfo.email} className="flex-1" />
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="phone" defaultValue={userInfo.phone} className="flex-1" />
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Address</Label>
                      <div className="grid grid-cols-1 gap-4">
                        <Input placeholder="Street Address" defaultValue={userInfo.address.street} />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <Input placeholder="City" defaultValue={userInfo.address.city} />
                          <Input placeholder="State" defaultValue={userInfo.address.state} />
                          <Input placeholder="ZIP Code" defaultValue={userInfo.address.zipCode} />
                        </div>
                      </div>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Security Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {securitySettings.filter(setting => setting.type === 'security').map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{setting.title}</h4>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                          <Switch checked={setting.enabled} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="h-5 w-5" />
                        <span>Password & Authentication</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Password</h4>
                          <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">SMS verification enabled</p>
                        </div>
                        <Button variant="outline">Manage 2FA</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Connected Accounts */}
              <TabsContent value="accounts" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Connected Accounts</span>
                      </CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => setShowAccountNumbers(!showAccountNumbers)}
                        className="flex items-center space-x-2"
                      >
                        {showAccountNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showAccountNumbers ? 'Hide' : 'Show'} Numbers</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectedAccounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              account.type === 'checking' ? 'bg-blue-100 text-blue-600' :
                              account.type === 'savings' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{account.name}</h4>
                              <p className="text-sm text-gray-600">
                                {showAccountNumbers ? account.number.replace('****', '1234567890') : account.number}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={account.status === 'active' ? 'secondary' : 'destructive'}
                              className="capitalize"
                            >
                              {account.status}
                            </Badge>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notification Preferences</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive account updates via email</p>
                        </div>
                        <Switch 
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Get text alerts for important activities</p>
                        </div>
                        <Switch 
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Mobile app notifications</p>
                        </div>
                        <Switch 
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                          <p className="text-sm text-gray-600">Promotional offers and product updates</p>
                        </div>
                        <Switch 
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Preferred Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Time Zone</Label>
                        <Select defaultValue="est">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Statement Delivery</Label>
                        <Select defaultValue="email">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email Only</SelectItem>
                            <SelectItem value="mail">Physical Mail</SelectItem>
                            <SelectItem value="both">Both Email and Mail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Download className="h-5 w-5" />
                        <span>Data & Privacy</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}