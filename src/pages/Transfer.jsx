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
import { useState } from 'react';

export default function Transfer() {
  const [transferAmount, setTransferAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const myAccounts = [
    { id: 'checking', name: 'Primary Checking', balance: 12450.75, number: '****1234' },
    { id: 'savings', name: 'High-Yield Savings', balance: 25800.50, number: '****5678' },
    { id: 'emergency', name: 'Emergency Fund', balance: 8500.00, number: '****9101' }
  ];

  const recentTransfers = [
    {
      id: 1,
      from: 'Primary Checking',
      to: 'High-Yield Savings',
      amount: 500.00,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 2,
      from: 'High-Yield Savings',
      to: 'Primary Checking',
      amount: 200.00,
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 3,
      from: 'Primary Checking',
      to: 'Emergency Fund',
      amount: 1000.00,
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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
    
    // Simulate transfer processing
    setTimeout(() => {
      setIsProcessing(false);
      setTransferAmount('');
      setFromAccount('');
      setToAccount('');
      // Show success message
    }, 2000);
  };

  const getAccountById = (id) => {
    return myAccounts.find(account => account.id === id);
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
                          <Label htmlFor="fromAccount">From Account</Label>
                          <Select value={fromAccount} onValueChange={setFromAccount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                            <SelectContent>
                              {myAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.name}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {formatCurrency(account.balance)}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fromAccount && (
                            <p className="text-sm text-gray-600">
                              Available: {formatCurrency(getAccountById(fromAccount)?.balance || 0)}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toAccount">To Account</Label>
                          <Select value={toAccount} onValueChange={setToAccount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination account" />
                            </SelectTrigger>
                            <SelectContent>
                              {myAccounts.filter(account => account.id !== fromAccount).map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.name}</span>
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
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
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
                        disabled={isProcessing || !fromAccount || !toAccount || !transferAmount}
                      >
                        {isProcessing ? 'Processing Transfer...' : 'Transfer Money'}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* External Transfer */}
                  <TabsContent value="external" className="mt-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fromAccountExt">From Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source account" />
                          </SelectTrigger>
                          <SelectContent>
                            {myAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name} - {formatCurrency(account.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input id="bankName" placeholder="Enter bank name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routingNumber">Routing Number</Label>
                          <Input id="routingNumber" placeholder="123456789" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="Enter account number" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Recipient Name</Label>
                        <Input id="recipientName" placeholder="Enter recipient's full name" />
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
                          />
                        </div>
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

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Schedule Transfer
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Person to Person */}
                  <TabsContent value="person" className="mt-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fromAccountP2P">From Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source account" />
                          </SelectTrigger>
                          <SelectContent>
                            {myAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name} - {formatCurrency(account.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientContact">Send To</Label>
                        <Input 
                          id="recipientContact" 
                          placeholder="Email address or phone number" 
                        />
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
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="What's this for?"
                          rows={3}
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

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Send Money
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
            <Card>
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
            </Card>

            {/* Recent Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransfers.map((transfer) => (
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
                            {transfer.from} → {transfer.to}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(transfer.date)}</p>
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