import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
// import Modal from '@/components/AccountOpen';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Percent,
  Building2,
  CircleDollarSign
} from 'lucide-react';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import AccountOpen from '@/components/AccountOpen';

export default function Accounts() {

  const [showBalances, setShowBalances] = useState(true);
  const { accounts } = useContext(AppContext)

  // const accounts = [
  //   {
  //     id: 1,
  //     name: 'Primary Checking',
  //     type: 'checking',
  //     balance: 12450.75,
  //     accountNumber: '****1234',
  //     routingNumber: '021000021',
  //     interestRate: 0.01,
  //     monthlyFee: 0,
  //     minimumBalance: 0,
  //     openDate: '2020-03-15'
  //   },
  //   {
  //     id: 2,
  //     name: 'High-Yield Savings',
  //     type: 'savings',
  //     balance: 25800.50,
  //     accountNumber: '****5678',
  //     routingNumber: '021000021',
  //     interestRate: 4.5,
  //     monthlyFee: 0,
  //     minimumBalance: 1000,
  //     openDate: '2021-06-10'
  //   },
  //   {
  //     id: 3,
  //     name: 'Emergency Fund',
  //     type: 'savings',
  //     balance: 8500.00,
  //     accountNumber: '****9101',
  //     routingNumber: '021000021',
  //     interestRate: 3.8,
  //     monthlyFee: 0,
  //     minimumBalance: 500,
  //     openDate: '2022-01-20'
  //   },
  //   {
  //     id: 4,
  //     name: 'Rewards Credit Card',
  //     type: 'credit',
  //     balance: -1250.30,
  //     accountNumber: '****9012',
  //     creditLimit: 5000,
  //     availableCredit: 3749.70,
  //     interestRate: 18.99,
  //     minimumPayment: 35.00,
  //     dueDate: '2024-02-15'
  //   }
  // ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAccountIcon = (type) => {
    const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center";
    switch (type) {
      case 'salary':
        return <div className={`${baseClasses} bg-blue-100 text-blue-600`}><Building2 className="h-6 w-6" /></div>;
      case 'savings':
        return <div className={`${baseClasses} bg-green-100 text-green-600`}><TrendingUp className="h-6 w-6" /></div>;
      case 'current':
        return <div className={`${baseClasses} bg-purple-100 text-purple-600`}><CircleDollarSign className="h-6 w-6" /></div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-600`}><CreditCard className="h-6 w-6" /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Accounts</h1>
            <p className="text-gray-600">Manage and monitor all your banking accounts</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center space-x-2"
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span>{showBalances ? 'Hide' : 'Show'} Balances</span>
            </Button>
            <AccountOpen />
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accounts.map((account,index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getAccountIcon(account.type ? account.type.toLowerCase() : "")}
                    <div>
                      <CardTitle className="text-xl">{account.type === 'CREDIT_CARD' ? 'CREDIT CARD' : account.type}</CardTitle>
                      <p className="text-sm text-gray-600 capitalize">{account.type ? account.type.toLowerCase() : ""} Account</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Balance Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Available Balance
                    </span>
                    <span className="text-sm text-gray-500">****{account.number ? account.number.slice(-4) : ""}</span>
                  </div>
                  <div className={`text-3xl font-bold ${
                    account.balance < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {showBalances ? formatCurrency(account.balance) : '••••••'}
                  </div>
                  
                  {/* Credit Card Specific Info */}
                  {account.type === 'CREDIT_CARD' && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available Credit:</span>
                        <span className="font-medium">
                          {showBalances ? formatCurrency(account.creditLimit - account.creditUsed) : '••••••'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Credit Limit:</span>
                        <span className="font-medium">
                          {showBalances ? formatCurrency(account.creditLimit) : '••••••'}
                        </span>
                      </div>
                      <Progress 
                        value={(Math.abs(account.creditUsed) / account.creditLimit) * 100} 
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Due Payment:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(account.creditUsed)} due {formatDate((new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 1)).toISOString().split("T")[0])}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    {account.type === 'CREDIT_CARD' ?
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>Expiry</span>
                      </div>
                      <span className="font-medium">
                        {formatDate(account.expiryDate)}
                      </span>
                    </div>
                    :
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <Percent className="h-4 w-4" />
                          <span>Interest Rate</span>
                        </div>
                        <span className="font-medium">
                          {account.interestRate}% APY
                        </span>
                      </div>
                    }
                    
                    {account.type !== 'credit' && (
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <DollarSign className="h-4 w-4" />
                          <span>Min Balance</span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(account.minimumBalance)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {account.type === 'CREDIT_CARD' ?
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <Calendar className="h-4 w-4" />
                          <span>Issued</span>
                        </div>
                        <span className="font-medium">
                          {formatDate(account.issuedAt ? account.issuedAt.substring(0, 10) : "")}
                        </span>
                      </div>
                      :
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <Calendar className="h-4 w-4" />
                          <span>Opened</span>
                        </div>
                        <span className="font-medium">
                          {formatDate(account.openedAt ? account.openedAt.substring(0, 10) : "")}
                        </span>
                      </div>
                    }
                    
                    {account.type !== 'credit' && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Monthly Fee</div>
                        <span className="font-medium">
                          {account.monthlyFee === 0 ? 'Free' : formatCurrency(account.monthlyFee)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Account Summary */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {showBalances ? formatCurrency(
                      accounts.reduce((sum, a) => sum + (a.type !== 'CREDIT_CARD') ?  a.balance : 0, 0)
                    ) : '••••••'}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Total Deposits</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {showBalances ? formatCurrency(
                      Math.abs(accounts.reduce((sum, a) => sum + (a.type !== 'CREDIT_CARD') ? a.monthOut : 0, 0))
                    ) : '••••••'}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Monthly Expenses</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {showBalances ? formatCurrency(
                      accounts.reduce((sum, a) => sum + (a.type !== 'CREDIT_CARD') ? a.monthIn : 0, 0)
                    ) : '••••••'}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Monthly Income</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {accounts.length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Active Accounts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}