'use client'
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { jsPDF } from "jspdf";

interface Option {
  key: number;
  value: string;
  label: string;
}

interface Results {
  totalLoan: string;
  monthlyPayment: string;
  totalAmount: string;
}

const LoanCalculator: React.FC = () => {
  const years: Option[] = Array.from({ length: 25 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
  }));

  const months: Option[] = Array.from({ length:  11}, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
    label: `${i + 1} Month${i + 1 > 1 ? "s" : ""}`,
  }));

  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [selectedYears, setSelectedYears] = useState<number>(0);
  const [selectedMonths, setSelectedMonths] = useState<number>(0);
  const [results, setResults] = useState<Results>({
    totalLoan: "0.00",
    monthlyPayment: "0.00",
    totalAmount: "0.00",
  });
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    calculate();
  }, [loanAmount, interestRate, selectedYears, selectedMonths]);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const termInMonths = selectedYears * 12 + selectedMonths;

    if (principal > 0 && rate >= 0 && termInMonths > 0) {
      const monthlyRate = rate / 12;
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonths));
      const totalLoan = monthlyPayment * termInMonths;

      setResults({
        totalLoan: totalLoan.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        monthlyPayment: monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalAmount: (principal + totalLoan - principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      });
    } else {
      setResults({
        totalLoan: "0.00",
        monthlyPayment: "0.00",
        totalAmount: "0.00",
      });
    }
  };



  const downloadTableAsPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Logo
    const logoURL = "data:image/png;base64,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"; // Replace with your logo's Base64 data or URL
    const logoWidth = 80; // Adjust logo width
    const logoHeight = 20; // Adjust logo height
    const logoX = (pageWidth - logoWidth) / 2; // Center logo horizontally
    const logoY = 5; // Set the vertical position for the logo
    doc.addImage(logoURL, "PNG", logoX, logoY, logoWidth, logoHeight); // Add logo to the PDF


    // Document Title
    doc.setFont("helvetica", "bold");
doc.setFontSize(16);
const title = "by: Ella Carmela Sarmiento";
const titleWidth = doc.getTextWidth(title);
doc.text(title, (pageWidth - titleWidth) / 2, 30);

// Address (Centered)
doc.setFont("helvetica", "normal");
doc.setFontSize(8);
const address = "DMCI Homes Corporate Center, 1321 Apolinario Street, Bangkal, Makati City, Metro Manila, PH 1233";
doc.text(address, pageWidth / 2, 34, { align: "center" });

const phone = "Phone Number: (+63)9175-4809-99";
doc.text(phone, pageWidth / 2, 38, { align: "center" });

const email = "Email: elladmcihomes.ph@gmail.com";
doc.text(email, pageWidth / 2, 42, { align: "center" });

// Subtitle (Centered)
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
const subtitle = "Loan Calculation Results";
doc.text(subtitle, pageWidth / 2, 50, { align: "center" });

// Draw Header Line
doc.line(20, 52, 190, 52);

// Table Headers
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("LOAN DETAILS", 24, 58);
doc.text("VALUE", 130, 58);

// Draw Header Line
doc.line(20, 62, 190, 62);

// Format Years and Months
const formattedYears = selectedYears === 1 ? "1 year" : `${selectedYears || 0} years`;
const formattedMonths = selectedMonths === 1 ? "1 month" : `${selectedMonths || 0} months`;

// Table Rows Data
const rows = [
  ["Years", formattedYears],
  ["Months", formattedMonths],
  ["Loan Amount", `PHP ${parseFloat(loanAmount || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
  ["Interest Rate", `${parseFloat(interestRate || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}%`],
  ["Total Loan Amount (w/ interest)", "PHP " + (results.totalLoan || "0")],
  ["Monthly Payment", "PHP " + (results.monthlyPayment || "0")],
  ["Total Amount", "PHP " + (results.totalAmount || "0")],
];

// Table Content
let yPosition = 72;
rows.forEach((row) => {
  doc.text(row[0], 24, yPosition);
  doc.text(row[1], 130, yPosition, { align: "left" });
  doc.line(20, yPosition + 2, 190, yPosition + 2); // Draw line after each row
  yPosition += 10;
});

// Draw Table Borders
const startY = 52;
const endY = yPosition - 8;
doc.line(20, startY, 20, endY); // Left border
doc.line(120, startY, 120, endY); // Divider between columns
doc.line(190, startY, 190, endY); // Right border

// Save the PDF
doc.save("loan_calculation_results.pdf");

// Success handler
setDownloadSuccess(true);

  };


  return (
    <div className="mx-auto flex-grow px-4 xl:px-24 w-full flex flex-col gap-4">
      <Card>
        <CardBody>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <Select
              className="w-full md:max-w-xs"
              label="Select Years"
              size={"sm"}
              onChange={(e) => setSelectedYears(Number(e.target.value))}
            >
              {years.map((year) => (
                <SelectItem key={year.key} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              className="w-full md:max-w-xs"
              label="Select Months"
              size={"sm"}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
            >
              {months.map((month) => (
                <SelectItem key={month.key} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Enter Loan Amount (00.00)"
              size="sm"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <Input
              label="Enter Interest (%)"
              size="sm"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <Table aria-label="Loan Calculation Results">
        <TableHeader>
          <TableColumn>LOAN DETAILS</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Selected Years</TableCell>
            <TableCell>{selectedYears} Year{selectedYears > 1 ? "s" : ""}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Selected Months</TableCell>
            <TableCell>{selectedMonths} Month{selectedMonths > 1 ? "s" : ""}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Loan Amount</TableCell>
            <TableCell>
              ₱ {parseFloat(loanAmount || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Interest Rate</TableCell>
            <TableCell>{parseFloat(interestRate || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}%</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Total Loan Amount (w/ interest)</TableCell>
            <TableCell>₱ {results.totalLoan}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Monthly Payment</TableCell>
            <TableCell>₱ {results.monthlyPayment}</TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Total Amount</TableCell>
            <TableCell>₱ {results.totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p className="text-sm text-default-500">
        * Please note that the results provided by this calculator are estimates
        and may vary. The final loan amount, interest rates, and monthly
        payments will be determined by the bank upon approval.
      </p>

      <Button color="primary" onPress={downloadTableAsPDF}>
        Download Results
      </Button>
    </div>
  );
};

export default LoanCalculator;
 
