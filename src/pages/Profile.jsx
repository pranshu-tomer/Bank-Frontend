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
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChangePassword from '@/components/PasswordChange';


export default function Profile() {
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  const [isLoading,setIsLoading] = useState(false)

  const [isTfa,setIsTfa] = useState(false)
  const [isLoginAlert,setIsLoginAlert] = useState(false)

  const {userData,token,backendUrl,accounts} = useContext(AppContext)


  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    state: "",
    city: "",
    pincode: ""
  })

  useEffect(() => {
  if (userData) {
    setFormData({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      street: userData?.address?.street || "",
      state: userData?.address?.state || "",
      city: userData?.address?.city || "",
      pincode: userData?.address?.pincode || ""
    });
    setIsTfa(userData.tfa)
    setIsLoginAlert(userData.loginAlert)
  }
}, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleDataSubmit = async () => {
    setIsLoading(true)
    if(!formData.firstName || !formData.email || !formData.phone || !formData.street || !formData.state || !formData.city || !formData.pincode){
      toast.info("Required Fields can't empty !!")
      setIsLoading(false)
    }else{
      try{
        const { data } = await axios.post(backendUrl + '/api/user/data/save', 
        { 
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (data.success) {
          toast.success("Profile Updated Successfully !!")
        } else {
          toast.error("Something went wrong !! Try Again Later")
        }
        setIsLoading(false)
      } catch(e){
        toast.error(e.response?.data?.error)
        setIsLoading(false)
      }
    }
  }

  const handleSecuritySubmit = async () => {
    setIsLoading(true)
    console.log(isTfa)
    try{
      const { data } = await axios.post(backendUrl + '/api/user/security/save', 
      { 
        tfa: isTfa,
        loginAlert: isLoginAlert
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        toast.success("Security Updated Successfully !!")
      } else {
        toast.error("Something went wrong !! Try Again Later")
      }
      setIsLoading(false)
    } catch(e){
      toast.error("Something Went wrong !!")
      setIsLoading(false)
    }
  }

  // console.log(userData.address.street)

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
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{userData.email}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge 
                    variant='secondary'
                    className="flex items-center space-x-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span className="capitalize">Verified</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Member since {formatDate(userData.createdAt)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                {/* <TabsTrigger value="preferences">Preferences</TabsTrigger> */}
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
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="email" 
                          type="email"  
                          className="flex-1" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="phone" 
                          className="flex-1" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Address</Label>
                      <div className="grid grid-cols-1 gap-4">
                        <Input  
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <Input 
                            placeholder="City" 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                          <Input 
                            placeholder="State" 
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                          <Input 
                            placeholder="ZIP Code" 
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* to do addressssss */}

                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDataSubmit} disabled={isLoading}>
                      {isLoading ? 'Saving.....' : 'Save Changes'}
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
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch checked={isTfa} onCheckedChange={setIsTfa}/>
                      </div>
                    </CardContent>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Login Alerts</h4>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <Switch checked={isLoginAlert} onCheckedChange={setIsLoginAlert}/>
                      </div>
                    </CardContent>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-[100px] mx-6 p-1" onClick={handleSecuritySubmit} disabled={isLoading}>
                      {isLoading ? 'Saving.....' : 'Save Changes'}
                    </Button>
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
                        <ChangePassword />
                        {/* <Button variant="outline">Change Password</Button> */}
                      </div>
                      
                      {/* <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">SMS verification enabled</p>
                        </div>
                        <Button variant="outline">Manage 2FA</Button>
                      </div> */}
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
                      {accounts.map((account) => (
                        <div key={account.number} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              account.type === 'SALARY' ? 'bg-blue-100 text-blue-600' :
                              account.type === 'SAVINGS' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{account.type}</h4>
                              <p className="text-sm text-gray-600">
                                {showAccountNumbers ? account.number : `*******${account.number.slice(-4)}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={account.status !== 'active' ? 'secondary' : 'destructive'}
                              className="capitalize"
                            >
                              Active
                            </Badge>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-[100px] mx-6 p-1" disabled={isLoading}>
                    {isLoading ? 'Saving.....' : 'Save Changes'}
                  </Button>
                </Card>
              </TabsContent>

              {/* Preferences */}
              {/* <TabsContent value="preferences" className="mt-6">
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
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}