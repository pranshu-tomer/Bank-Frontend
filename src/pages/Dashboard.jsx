import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    { id: 1, name: 'Checking Account', balance: 12450.75, type: 'checking', number: '****1234' },
    { id: 2, name: 'Savings Account', balance: 25800.50, type: 'savings', number: '****5678' },
    { id: 3, name: 'Credit Card', balance: -1250.30, type: 'credit', number: '****9012', limit: 5000 }
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.50, date: '2024-01-15', type: 'debit' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, date: '2024-01-15', type: 'credit' },
    { id: 3, description: 'Netflix Subscription', amount: -15.99, date: '2024-01-14', type: 'debit' },
    { id: 4, description: 'ATM Withdrawal', amount: -100.00, date: '2024-01-14', type: 'debit' },
    { id: 5, description: 'Online Transfer', amount: 500.00, date: '2024-01-13', type: 'credit' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const totalBalance = accounts.reduce((sum, account) => {
    if (account.type === 'credit') return sum + account.balance; // Credit balance is negative
    return sum + account.balance;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your accounts today.</p>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? formatCurrency(totalBalance) : '••••••'}
              </div>
              <p className="text-xs opacity-90 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {showBalance ? '$3,200.00' : '••••••'}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +5.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Spending</CardTitle>
              <CreditCard className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {showBalance ? '$1,847.30' : '••••••'}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -3.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Savings Goal</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">$6,800 of $10,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accounts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          account.type === 'checking' ? 'bg-blue-100 text-blue-600' :
                          account.type === 'savings' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{account.name}</h3>
                          <p className="text-sm text-gray-600">{account.number}</p>
                          {account.type === 'credit' && (
                            <p className="text-xs text-gray-500">
                              Limit: {formatCurrency(account.limit)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          account.balance >= 0 ? 'text-gray-900' : 'text-red-600'
                        }`}>
                          {showBalance ? formatCurrency(account.balance) : '••••••'}
                        </p>
                        <Badge variant={account.type === 'credit' ? 'destructive' : 'secondary'} className="text-xs">
                          {account.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${
                        transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Transfer Money</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Pay Bills</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Deposit Check</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Investments</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}