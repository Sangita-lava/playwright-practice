const ExcelJS = require('exceljs');

async function readExcel(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header

    const rowData = {};
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      const header = cell.value;
      const value = row.getCell(colNumber).value;
      rowData[header] = value;
    });
    data.push(rowData);
  });

  return data;
}

module.exports = { readExcel };
