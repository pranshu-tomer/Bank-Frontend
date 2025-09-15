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
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  const {userData, accounts , transactions} = useContext(AppContext)

  console.log(accounts)

  const navigate = useNavigate()

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.firstName}</h1>
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
                {showBalance ? 
                  formatCurrency(accounts.reduce((sum, a) => sum + ((a.type !== 'CREDIT_CARD') ?  a.balance : 0), 0)) 
                : 
                  '••••••'
                }
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
                {showBalance ? 
                  formatCurrency(accounts.reduce((sum, a) => sum + ((a.type !== 'CREDIT_CARD') ? a.monthIn : 0), 0))
                : 
                  '••••••'
                }
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
                {showBalance ? 
                  formatCurrency(Math.abs(accounts.reduce((sum, a) => sum + ((a.type !== 'CREDIT_CARD') ? a.monthOut : 0), 0)))
                : 
                  '••••••'
                }
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
                    <div key={account.number} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          account.type === 'CURRENT' ? 'bg-blue-100 text-blue-600' :
                          account.type === 'SAVINGS' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{account.type}</h3>
                          <p className="text-sm text-gray-600">{account.number}</p>
                          {/* {account.type === 'credit' && (
                            <p className="text-xs text-gray-500">
                              Limit: {formatCurrency(account.limit)}
                            </p>
                          )} */}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          account.balance >= 0 ? 'text-gray-900' : 'text-red-600'
                        }`}>
                          {showBalance ? formatCurrency(account.balance) : '••••••'}
                        </p>
                        {
                          account.primaryAccount &&
                          <Badge className="text-xs bg-green-100 text-green-600">
                            Primary
                          </Badge>
                        }
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
                  {transactions.filter((t,index) => index < 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.direction === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.direction === 'CREDIT' ? (
                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{(transaction.direction === 'CREDIT') ? transaction.senderName : transaction.receiverName}</p>
                          <p className="text-xs text-gray-600">{transaction.executedAt.split('T')[0]}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${
                        transaction.direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.direction === 'CREDIT' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate('/transactions')} variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col space-y-2 bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/transfer')}>
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
        </div> */}
      </div>
    </div>
  );
}