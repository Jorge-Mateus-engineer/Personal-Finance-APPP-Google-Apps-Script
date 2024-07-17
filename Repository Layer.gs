//Global variables
const spreadsheetURL = "https://docs.google.com/spreadsheets/d/1-56ouwj1LK-l6ByaoEpQgh2TwpIW66tt57KKPP7ld9w/edit" //String that contains URL
const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL); //Get a Spreadsheet Object type using the URL
//Dates for filtering
let todayDate = new Date()
let startDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
let endDate = todayDate

//Put relevant sheets into variables and get the values as 2D array and use the slice method to remove the first row
const expensesTable = spreadsheet.getSheetByName("Expenses Table").getDataRange().getValues().slice(1);
const incomeTable = spreadsheet.getSheetByName("Income Table").getDataRange().getValues().slice(1);
const categoriesTable = spreadsheet.getSheetByName("Categories").getDataRange().getValues().slice(1);

//Filter data by dates
const filteredExpenses = expensesTable; //WIP
const filteredIncome = incomeTable; //WIP



function mainPieChartData() {
  //1.Resolve Category IDs
  const data = replaceCategoryIDs(categoriesTable, filteredExpenses);
  
  //2. Main Category List
  const mainCategories = getMainCategoryList(categoriesTable);

  //3. Generate data for pie chart
  //3.1 Make a map with totals set to 0
  const totalsMap = {}
  mainCategories.forEach(category => {
    totalsMap[category] = 0;
  })

  //3.2 Acumulat the totals in the map 
  data.slice(1).forEach((row)=> {
    totalsMap[row[3]] += row[1]
  })

  //3.3 Create the totalsArray in the format [[category1, total1], [category2, total2]]
  //3.3.1 When the totals are added up, a value of "="undefined"" appears, so I had to remove it
  const totalsArray = Object.keys(totalsMap).map(category => [category, totalsMap[category]]).filter(row => row[1] != "undefined");
  totalsArray.unshift(["Category", "Total"])
  
  return totalsArray
}

function mainLineChart() {
  //1. Get dates array
  //1.1 Get the number of days betwend the dates
  const amountOfDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  //1.2 Create empty array and populate it
  const datesArray = [];
  for(let i = 0; i < amountOfDays; i++) {
    let date = new Date(startDate); // Create a copy of startDate
    date.setDate(startDate.getDate() + i); // Update the date
    datesArray.push(date)
  }

  //2 Get Expenses data
  const expensesForLineChart = expensesTable.filter((row) => row[1] >= startDate && row[1] <= endDate).map(row => row.slice(0, -3).slice(1));

  //3.Get income data
  const incomeForLineChart = incomeTable.filter((row) => (row[1] >= startDate && row[1] <= endDate)).map(row => row.slice(0, -3).slice(1));

  //4. Prepare final data array
  //4.1 initialice with headers
  const dataArray =[["Date", "Income", "Expenses"]]
  //4.2 Create variables for running totals
  let acumulatedExpenses = 0;
  let acumulatedIncome = 0;

  //4.3 Traverse the dates array to accumulate totals based on the date
  datesArray.forEach(date => {
    //Date compared as a string to avoid precision errors with ms
    const formatedDate = formatDate(date);

    //4.3.1 Travers the income and expenses array to find a match on each date
    expensesForLineChart.forEach(row => {
      if(formatDate(row[0]) === formatedDate) {
        acumulatedExpenses += row[1]
      }
    })

    incomeForLineChart.forEach(row => {
      if(formatDate(row[0]) === formatedDate) {
        acumulatedIncome += row[1]
      }
    })
    //4.4 Push the generated totals and date into the maun array
    dataArray.push([formatDate(date), acumulatedIncome, acumulatedExpenses]);
  })

  Logger.log(dataArray)
  return dataArray;

}
