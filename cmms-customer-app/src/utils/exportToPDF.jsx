import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { COMPANY_INFO } from "../config/constants";

export const exportToPDF = (orders, selectedOrders = null) => {
  const doc = new jsPDF();
  const ordersToExport = selectedOrders || orders;

  ordersToExport.forEach((order, orderIndex) => {
    if (orderIndex > 0) {
      doc.addPage();
    }

    // Add company logo
    doc.addImage(COMPANY_INFO.logoBase64, "PNG", 15, 15, 30, 15);

    // Company information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(COMPANY_INFO.name, 50, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(COMPANY_INFO.address, 50, 27);

    // Order information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER INVOICE", 15, 45);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const orderDetails = [
      ["Order ID:", order.id],
      ["Date:", format(new Date(order.orderDate), "dd/MM/yyyy HH:mm")],
      ["Status:", order.status.toUpperCase()],
    ];
    orderDetails.forEach((detail, index) => {
      doc.text(detail[0], 15, 60 + index * 7);
      doc.text(detail[1], 45, 60 + index * 7);
    });

    // Customer information
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 15, 90);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      [
        order.customer.name,
        order.customer.address,
        order.customer.phone,
        order.customer.email,
      ],
      15,
      100
    );

    // Items table
    doc.autoTable({
      startY: 130,
      head: [["Item", "Quantity", "Unit Price", "Total"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity,
        `$${item.unitPrice.toFixed(2)}`,
        `$${(item.quantity * item.unitPrice).toFixed(2)}`,
      ]),
      foot: [
        [
          "",
          "",
          "Subtotal:",
          `$${(
            order.payment.total -
            order.payment.tax -
            order.payment.shipping
          ).toFixed(2)}`,
        ],
        ["", "", "Tax:", `$${order.payment.tax.toFixed(2)}`],
        ["", "", "Shipping:", `$${order.payment.shipping.toFixed(2)}`],
        ["", "", "Total:", `$${order.payment.total.toFixed(2)}`],
      ],
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 139, 202] },
    });

    // Digital signature
    if (COMPANY_INFO.digitalSignature) {
      doc.addImage(
        COMPANY_INFO.digitalSignature,
        "PNG",
        15,
        doc.lastAutoTable.finalY + 20,
        50,
        20
      );
      doc.text("Authorized Signature", 15, doc.lastAutoTable.finalY + 45);
    }

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text(COMPANY_INFO.footer, 15, pageHeight - 10);
  });

  // Download the PDF
  doc.save(`orders-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};
