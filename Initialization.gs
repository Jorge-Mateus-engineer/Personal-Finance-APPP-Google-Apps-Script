//File created for organization purposes to avoid calling spreadsheets several times over and over

//Global variables
const spreadsheetURL = "https://docs.google.com/spreadsheets/d/1-56ouwj1LK-l6ByaoEpQgh2TwpIW66tt57KKPP7ld9w/edit"; //String that contains URL

let expensesTable;
let incomeTable;
let categoryTable;

function initializeGlobals() {
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL); //Get a Spreadsheet Object type using the URL
  //Initialice tables
  expensesTable = spreadsheet.getSheetByName("Expenses Table").getDataRange().getValues().slice(1);
  incomeTable = spreadsheet.getSheetByName("Income Table").getDataRange().getValues().slice(1);
  categoriesTable = spreadsheet.getSheetByName("Categories").getDataRange().getValues().slice(1);
}
