import * as XLSX from 'xlsx';
import { EmailData } from './emailService';

export const exportToExcel = (emails: EmailData[], filename: string = 'emails'): void => {
  try {
    // Prepare data for export
    const exportData = emails.map((email, index) => ({
      'S.No': index + 1,
      'Email': email.email,
      'Date': email.timestamp.toLocaleDateString(),
      'Time': email.timestamp.toLocaleTimeString(),
      'Status': email.status,
      'Timestamp': email.timestamp.toISOString()
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
      { wch: 8 },  // S.No
      { wch: 35 }, // Email
      { wch: 15 }, // Date
      { wch: 15 }, // Time
      { wch: 12 }, // Status
      { wch: 25 }  // Timestamp
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Emails');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const finalFilename = `${filename}_${date}.xlsx`;

    // Export file
    XLSX.writeFile(workbook, finalFilename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};

export const exportToCSV = (emails: EmailData[], filename: string = 'emails'): void => {
  try {
    // Prepare CSV data
    const headers = ['S.No', 'Email', 'Date', 'Time', 'Status', 'Timestamp'];
    const csvData = emails.map((email, index) => [
      index + 1,
      email.email,
      email.timestamp.toLocaleDateString(),
      email.timestamp.toLocaleTimeString(),
      email.status,
      email.timestamp.toISOString()
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    const finalFilename = `${filename}_${date}.csv`;
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', finalFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};
