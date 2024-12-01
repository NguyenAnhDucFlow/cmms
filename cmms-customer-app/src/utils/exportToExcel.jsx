import ExcelJS from "exceljs";
import { format } from "date-fns";
import { COMPANY_INFO } from "../config/constants";

export const exportToExcel = async (orders) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Orders");

  // Add company logo and header
  const logoImage = workbook.addImage({
    base64: COMPANY_INFO.logoBase64,
    extension: "png",
  });
  worksheet.addImage(logoImage, {
    tl: { col: 0, row: 0 },
    ext: { width: 100, height: 50 },
  });

  // Company information
  worksheet.mergeCells("B1:F2");
  const companyCell = worksheet.getCell("B1");
  companyCell.value = `${COMPANY_INFO.name}\n${COMPANY_INFO.address}`;
  companyCell.font = { bold: true, size: 12 };
  companyCell.alignment = { vertical: "middle" };

  // Add headers
  worksheet.addRow([]);
  worksheet.addRow([]);
  const headerRow = worksheet.addRow([
    "Order ID",
    "Date",
    "Customer",
    "Products",
    "Quantity",
    "Unit Price",
    "Total",
    "Status",
  ]);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  // Add data
  orders.forEach((order) => {
    order.items.forEach((item, index) => {
      const row = worksheet.addRow([
        index === 0 ? order.id : "",
        index === 0
          ? format(new Date(order.orderDate), "dd/MM/yyyy HH:mm")
          : "",
        index === 0 ? order.customer.name : "",
        item.name,
        item.quantity,
        item.unitPrice,
        item.quantity * item.unitPrice,
        index === 0 ? order.status : "",
      ]);

      // Format currency cells
      row.getCell(6).numFmt = '"$"#,##0.00';
      row.getCell(7).numFmt = '"$"#,##0.00';
    });
  });

  // Style and format
  worksheet.columns.forEach((column) => {
    column.width = 15;
    column.alignment = { vertical: "middle" };
  });

  // Generate and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `orders-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
