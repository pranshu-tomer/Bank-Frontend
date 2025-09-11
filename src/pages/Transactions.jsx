import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  DollarSign,
  Building2,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Coffee
} from 'lucide-react';
import { useState } from 'react';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccount, setFilterAccount] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Whole Foods Market',
      category: 'Groceries',
      account: 'Checking',
      amount: -85.50,
      type: 'debit',
      status: 'completed',
      icon: ShoppingCart
    },
    {
      id: 2,
      date: '2024-01-15',
      description: 'Salary Deposit - TechCorp Inc.',
      category: 'Income',
      account: 'Checking',
      amount: 3200.00,
      type: 'credit',
      status: 'completed',
      icon: Building2
    },
    {
      id: 3,
      date: '2024-01-14',
      description: 'Netflix Subscription',
      category: 'Entertainment',
      account: 'Credit Card',
      amount: -15.99,
      type: 'debit',
      status: 'completed',
      icon: Coffee
    },
    {
      id: 4,
      date: '2024-01-14',
      description: 'ATM Withdrawal - Chase Bank',
      category: 'Cash',
      account: 'Checking',
      amount: -100.00,
      type: 'debit',
      status: 'completed',
      icon: DollarSign
    },
    {
      id: 5,
      date: '2024-01-13',
      description: 'Transfer from Savings',
      category: 'Transfer',
      account: 'Checking',
      amount: 500.00,
      type: 'credit',
      status: 'completed',
      icon: ArrowDownRight
    },
    {
      id: 6,
      date: '2024-01-13',
      description: 'Shell Gas Station',
      category: 'Transportation',
      account: 'Credit Card',
      amount: -45.20,
      type: 'debit',
      status: 'completed',
      icon: Car
    },
    {
      id: 7,
      date: '2024-01-12',
      description: 'Mortgage Payment',
      category: 'Housing',
      account: 'Checking',
      amount: -1850.00,
      type: 'debit',
      status: 'completed',
      icon: Home
    },
    {
      id: 8,
      date: '2024-01-12',
      description: 'Starbucks Coffee',
      category: 'Food & Dining',
      account: 'Credit Card',
      amount: -6.75,
      type: 'debit',
      status: 'completed',
      icon: Utensils
    },
    {
      id: 9,
      date: '2024-01-11',
      description: 'Amazon Purchase',
      category: 'Shopping',
      account: 'Credit Card',
      amount: -127.99,
      type: 'debit',
      status: 'pending',
      icon: ShoppingCart
    },
    {
      id: 10,
      date: '2024-01-11',
      description: 'Interest Payment - Savings',
      category: 'Interest',
      account: 'Savings',
      amount: 12.50,
      type: 'credit',
      status: 'completed',
      icon: DollarSign
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const colors = {
  'Groceries': 'bg-green-100 text-green-800',
  'Income': 'bg-blue-100 text-blue-800',
  'Entertainment': 'bg-purple-100 text-purple-800',
  'Cash': 'bg-gray-100 text-gray-800',
  'Transfer': 'bg-orange-100 text-orange-800',
  'Transportation': 'bg-red-100 text-red-800',
  'Housing': 'bg-indigo-100 text-indigo-800',
  'Food & Dining': 'bg-yellow-100 text-yellow-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Interest': 'bg-emerald-100 text-emerald-800'
};

const getCategoryColor = (category) => {
  return colors[category] || 'bg-gray-100 text-gray-800';
};



//   const getCategoryColor = (category) => {
//     const colors[key]  = {
//       'Groceries': 'bg-green-100 text-green-800',
//       'Income': 'bg-blue-100 text-blue-800',
//       'Entertainment': 'bg-purple-100 text-purple-800',
//       'Cash': 'bg-gray-100 text-gray-800',
//       'Transfer': 'bg-orange-100 text-orange-800',
//       'Transportation': 'bg-red-100 text-red-800',
//       'Housing': 'bg-indigo-100 text-indigo-800',
//       'Food & Dining': 'bg-yellow-100 text-yellow-800',
//       'Shopping': 'bg-pink-100 text-pink-800',
//       'Interest': 'bg-emerald-100 text-emerald-800'
//     };
//     return colors[category] || 'bg-gray-100 text-gray-800';
//   };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = filterAccount === 'all' || transaction.account === filterAccount;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesAccount && matchesType;
  });

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
            <p className="text-gray-600">Track and manage all your financial transactions</p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Transactions
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ArrowDownRight className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Flow</p>
                  <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(totalIncome - totalExpenses)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterAccount} onValueChange={setFilterAccount}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="Checking">Checking</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Income</SelectItem>
                  <SelectItem value="debit">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Transactions</span>
              <Badge variant="secondary">{filteredTransactions.length} transactions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <transaction.icon className={`h-6 w-6 ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(transaction.date)}
                        </span>
                        <span>{transaction.account}</span>
                        <Badge className={`${getCategoryColor(transaction.category)} text-xs`}>
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount >= 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No transactions found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}