import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Mail, 
  Search, 
  RefreshCw,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllEmails, getEmailsCount, EmailData } from '@/lib/emailService';
import { exportToExcel, exportToCSV } from '@/lib/exportUtils';

export const EmailManagement = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<EmailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  // Load emails on component mount
  useEffect(() => {
    loadEmails();
  }, []);

  // Filter emails when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmails(emails);
    } else {
      const filtered = emails.filter(email => 
        email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.timestamp.toLocaleDateString().includes(searchTerm) ||
        email.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmails(filtered);
    }
  }, [searchTerm, emails]);

  const loadEmails = async () => {
    try {
      setIsLoading(true);
      const [emailsData, count] = await Promise.all([
        getAllEmails(),
        getEmailsCount()
      ]);
      setEmails(emailsData);
      setFilteredEmails(emailsData);
      setTotalCount(count);
    } catch (error) {
      console.error('Error loading emails:', error);
      toast({
        title: "Error",
        description: "Failed to load emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportExcel = () => {
    try {
      exportToExcel(filteredEmails, 'clippy_emails');
      toast({
        title: "Success!",
        description: "Emails exported to Excel successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export to Excel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    try {
      exportToCSV(filteredEmails, 'clippy_emails');
      toast({
        title: "Success!",
        description: "Emails exported to CSV successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export to CSV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading emails...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Email Management</h1>
        <p className="text-muted-foreground text-lg">
          Manage and export collected email addresses from your Clippy landing page
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">
              Collected email addresses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emails.filter(e => e.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently subscribed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Signup</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emails.length > 0 ? formatDate(emails[0].timestamp).split(',')[0] : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Most recent email
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Export Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Export</CardTitle>
          <CardDescription>
            Search through emails and export them in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, date, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportExcel} variant="outline">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Button onClick={handleExportCSV} variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={loadEmails} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emails Table */}
      <Card>
        <CardHeader>
          <CardTitle>Email List</CardTitle>
          <CardDescription>
            Showing {filteredEmails.length} of {totalCount} emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEmails.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No emails match your search criteria.' : 'No emails collected yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmails.map((email, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm">{email.email}</TableCell>
                      <TableCell>{formatDate(email.timestamp)}</TableCell>
                      <TableCell>
                        <Badge variant={email.status === 'active' ? 'default' : 'secondary'}>
                          {email.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
