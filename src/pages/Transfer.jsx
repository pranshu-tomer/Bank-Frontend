import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeftRight, 
  CreditCard, 
  Building2, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Transfer() {
  const [isProcessing, setIsProcessing] = useState(false);

  const { accounts,backendUrl,token,userData,loadAccountsData,transactions } = useContext(AppContext);

  const [formData,setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    toAccountName: '',
    amount: 0,
    description: '',
    receiverIdentifier: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const types = ['Deposit','Withdrawal','Transfer','Bill','Fee','Shopping','Subscription','Food','Intrest','Bank_Charge']

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try{
        const { data } = await axios.post(backendUrl + '/api/transfer/receiver',
        {   
          fromAccountNumber: formData.fromAccount,
          receiverIdentifier: formData.receiverIdentifier,
          receiverName: formData.toAccountName,     
          amount: formData.amount,
          description: formData.description,
          type: types[getRandomIndex(types)]
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        if(data?.success){
            toast.success(data.message)
        }else{
            toast.error("Something Went Wrong ! Try Again Later")
        }
    }catch(e){
        toast.error(e.response.data.message)   
    }
    
    setIsProcessing(false);
    loadAccountsData()
    resetForms()
  };

  
  const handleSelfTransfer = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const fullName = userData.firstName + (userData.lastName ? ` ${userData.lastName}` : '')
    console.log(fullName)
    try{
        const { data } = await axios.post(backendUrl + '/api/transfer/account',
        {   
          fromAccountNumber: formData.fromAccount,
          toAccountNumber: formData.toAccount,
          toAccountName: fullName,     
          amount: formData.amount,
          description: formData.description,
          type: types[getRandomIndex(types)]
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        if(data?.success){
            toast.success(data.message)
        }else{
            toast.error("Something Went Wrong ! Try Again Later")
        }
    }catch(e){
        toast.error(e.response.data.message)   
    }
    
    setIsProcessing(false);
    loadAccountsData()
    resetForms()
  };

  const handleAccountTransfer = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try{
        const { data } = await axios.post(backendUrl + '/api/transfer/account',
        {   
          fromAccountNumber: formData.fromAccount,
          toAccountNumber: formData.toAccount,
          toAccountName: formData.toAccountName,     
          amount: formData.amount,
          description: formData.description,
          type: types[getRandomIndex(types)]
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        if(data?.success){
            toast.success(data.message)
        }else{
            toast.error("Something Went Wrong ! Try Again Later")
        }
    }catch(e){
        toast.error(e.response.data.message)   
    }
    setIsProcessing(false);
    loadAccountsData()
    resetForms()
  };

  const resetForms = () => {
    setFormData({
      fromAccount: '',
      toAccount: '',
      toAccountName: '',
      amount: 0,
      description: '',
      receiverIdentifier: ''
    })
  }

  const getAccountById = (id) => {
    return accounts.find(account => account.id === id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Money</h1>
          <p className="text-gray-600">Send money between accounts or to external recipients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transfer Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowLeftRight className="h-5 w-5" />
                  <span>New Transfer</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="internal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="internal">Between My Accounts</TabsTrigger>
                    <TabsTrigger value="external">To Another Bank</TabsTrigger>
                    <TabsTrigger value="person">To a Person</TabsTrigger>
                  </TabsList>

                  {/* Internal Transfer */}
                  <TabsContent value="internal" className="mt-6">
                    <form onSubmit={handleTransfer} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>From Account</Label>
                          <Select
                            name="fromAccount"
                            value={formData.fromAccount ?? ""}
                            onValueChange={(value) =>
                              setFormData(prev => ({ ...prev, fromAccount: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.number} value={account.number}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.type}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {formatCurrency(account.balance)}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toAccount">To Account</Label>
                          <Select
                            name="toAccount"
                            value={formData.toAccount ?? ""}
                            onValueChange={(value) =>
                              setFormData(prev => ({ ...prev, toAccount: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.filter(account => account.number !== formData.fromAccount).map((account) => (
                                <SelectItem key={account.number} value={account.number}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.type}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {account.number}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount">Transfer Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            id="amount"
                            type="number"
                            name="amount"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="pl-8"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="memo">Memo (Optional)</Label>
                        <Textarea
                          id="memo"
                          placeholder="Add a note for this transfer..."
                          rows={3}
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">Transfer Details</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Internal transfers are processed instantly and are free of charge.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isProcessing || !formData.fromAccount || !formData.toAccount || !formData.amount}
                        onClick={handleSelfTransfer}
                      >
                        {isProcessing ? 'Processing Transfer...' : 'Transfer Money'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* External Transfer */}
                  <TabsContent value="external" className="mt-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label>From Account</Label>
                        <Select
                          name="fromAccount"
                          value={formData.fromAccount ?? ""}
                          onValueChange={(value) =>
                            setFormData(prev => ({ ...prev, fromAccount: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.filter((account) => account.type !== 'CREDIT_CARD').map((account) => (
                              <SelectItem key={account.number} value={account.number}>
                                {account.type}  {formatCurrency(account.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="Enter account number" name="toAccount" onChange={handleInputChange} value={formData.toAccount}/>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Recipient Name</Label>
                        <Input id="recipientName" placeholder="Enter recipient's full name" name="toAccountName" onChange={handleInputChange} value={formData.toAccountName}/>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amountExt">Transfer Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="amountExt"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-8"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="What's this for?"
                          rows={3}
                          value={formData.description}
                          onChange={handleInputChange}
                          name="description"
                        />
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Processing Time</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              External transfers typically take 1-3 business days. A $3.00 fee applies.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAccountTransfer}>
                        {isProcessing ? 'Processing Transfer...' : 'Transfer Money'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Person to Person */}
                  <TabsContent value="person" className="mt-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fromAccountP2P">From Account</Label>
                        <Select
                          name="fromAccount"
                          value={formData.fromAccount ?? ""}
                          onValueChange={(value) =>
                            setFormData(prev => ({ ...prev, fromAccount: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map((account) => (
                              <SelectItem key={account.number} value={account.number}>
                                {account.type} {formatCurrency(account.type !== 'CREDIT_CARD' ? account.balance : (account.creditLimit - account.creditUsed))}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientContact">Send To</Label>
                        <Input 
                          id="recipientContact" 
                          placeholder="CRN or Email address" 
                          name="receiverIdentifier"
                          value={formData.receiverIdentifier}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Recipient Name</Label>
                        <Input id="recipientName" placeholder="Enter recipient's full name" name="toAccountName" onChange={handleInputChange} value={formData.toAccountName}/>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amountP2P">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="amountP2P"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-8"
                            value={formData.amount}
                            onChange={handleInputChange}
                            name="amount"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="What's this for?"
                          rows={3}
                          value={formData.description}
                          onChange={handleInputChange}
                          name="description"
                        />
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Instant Transfer</h4>
                            <p className="text-sm text-green-700 mt-1">
                              Send money instantly to friends and family. Free for the first 3 transfers per month.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleTransfer}>
                        {isProcessing ? 'Processing Transfer...' : 'Transfer Money'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transfers & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Transfer Amounts */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Quick Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[50, 100, 200, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setTransferAmount(amount.toString())}
                      className="h-12"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Recent Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.filter((transaction) => transaction.direction === 'DEBIT').slice(0,5).map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(transfer.amount)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {transfer.senderName} → {transfer.receiverName}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(transfer.executedAt.split('T')[0])}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={transfer.status === 'completed' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {transfer.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}