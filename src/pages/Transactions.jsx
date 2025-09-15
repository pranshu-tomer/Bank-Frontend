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
  Coins,
  ArrowLeftRight,
  Utensils,
  PiggyBank,
  Coffee
} from 'lucide-react';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccount, setFilterAccount] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const {accounts,transactions} = useContext(AppContext)

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
  'Bill': 'bg-green-100 text-green-800',
  'Deposit': 'bg-blue-100 text-blue-800',
  'Subscription': 'bg-purple-100 text-purple-800',
  'Withdrawal': 'bg-gray-100 text-gray-800',
  'Transfer': 'bg-orange-100 text-orange-800',
  'Fee': 'bg-red-100 text-red-800',
  'Housing': 'bg-indigo-100 text-indigo-800',
  'Food': 'bg-yellow-100 text-yellow-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Interest': 'bg-emerald-100 text-emerald-800'
};

const icons = {
  'Deposit': 'Coins',
  'Withdrawal': '',
  '': '',
  'Bill': '',
  'Fee': 'Car',
  '': 'ShoppingCart',
  'Subscription': 'Calendar',
  'Food': 'Coffee',
  'Intrest': 'PiggyBank',
  'Bank_Charge': 'Building2'
}

const getIcon = (type,direction) => {
  switch(type){
    case 'Deposit':
      return <Coins className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Withdrawal':
      return <DollarSign className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Transfer':
      return <ArrowLeftRight className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Bill':
      return <Utensils className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Fee':
      return <Car className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Shopping':
      return <ShoppingCart className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Food':
      return <Coffee className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Intrest':
      return <PiggyBank className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
    case 'Bank_Charge':
      return <Building2 className={`h-6 w-6 ${direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}/>
  }
}
  

const getCategoryColor = (category) => {
  return colors[category] || 'bg-gray-100 text-gray-800';
};

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.direction === filterType;


    const matchesAccount = filterAccount === 'all' || 
    ((transaction.direction === 'CREDIT') ? transaction.toAccountNumber === filterAccount : transaction.fromAccountNumber === filterAccount);
    
    return matchesSearch && matchesAccount && matchesType;
  });

  const totalIncome = accounts.reduce((sum, a) => {
    return sum + ((a.type !== 'CREDIT_CARD') ? a.monthIn : 0)
  },0)
  const totalExpenses = accounts.reduce((sum, a) => {
    return sum + ((a.type !== 'CREDIT_CARD') ? a.monthOut : 0)
  },0)

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
          {/* <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Transactions
          </Button> */}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Monthly Income</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalIncome)}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Total Monthly Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(Math.abs(totalExpenses))}
                  </p>
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
                  {accounts.map((account) => (
                    <SelectItem key={account.number} value={account.number}>
                      {account.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CREDIT">Income</SelectItem>
                  <SelectItem value="DEBIT">Expenses</SelectItem>
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
                      transaction.direction === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {getIcon(transaction.type,transaction.direction)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{(transaction.direction === 'CREDIT') ? transaction.senderName : transaction.receiverName}</h3>
                        <Badge 
                          variant={transaction.status === 'COMPLETED' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(transaction.executedAt.split('T')[0])}
                        </span>
                        <span>****{transaction.toAccountNumber.slice(-4)}</span>
                        <Badge className={`${getCategoryColor(transaction.type)} text-xs`}>
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.direction === 'CREDIT' ? '+' : '-'}{formatCurrency(transaction.amount)}
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