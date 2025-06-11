// utils/excelUtil.js
const xlsx = require('xlsx');
const fs = require('fs');

/**
 * Reads data from the given Excel file and sheet name.
 */
function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

/**
 * Writes a timestamp and updated email back to the Excel file.
 * @param {string} filePath - Path to the Excel file
 * @param {string} sheetName - Sheet to update
 * @param {number} rowIndex - Row to update (0-based)
 * @param {object} update - Object containing { email, timestamp }
 */
function writeExcel(filePath, sheetName, rowIndex, update) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  // Header row must include "Email" and "Timestamp"
  const headers = data[0];
  const emailCol = headers.indexOf('Email');
  const timestampCol = headers.indexOf('Timestamp');

  if (emailCol === -1 || timestampCol === -1) {
    throw new Error('Email or Timestamp column not found in Excel.');
  }

  data[rowIndex + 1][emailCol] = update.email;
  data[rowIndex + 1][timestampCol] = update.timestamp;

  const updatedSheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets[sheetName] = updatedSheet;
  xlsx.writeFile(workbook, filePath);
}

module.exports = { readExcel, writeExcel };
