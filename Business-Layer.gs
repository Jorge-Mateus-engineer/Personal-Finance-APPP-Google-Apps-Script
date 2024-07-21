//Global variables
initializeGlobals();

//Dates for filtering
let todayDate = new Date();
let startDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
let endDate = todayDate;

//Totals
let totalExpenses = 0;
let totalIncome = 0;


//Filter data by dates
const filteredExpenses = getExpenseByDate(startDate, endDate);
const filteredIncome = getIncomeByDate(startDate, endDate);

function mainPieChartData() {
  //1.Resolve Category IDs
  const data = replaceCategoryIDs(categoriesTable, filteredExpenses);
  //2. Main Category List
  const mainCategories = getMainCategoriesList();

  //3. Generate data for pie chart
  //3.1 Make a map with totals set to 0
  const totalsMap = {}
  mainCategories.forEach(category => {
    totalsMap[category] = 0;
  })

  //3.2 Acumulate the totals in the map 
  data.slice(1).forEach((row)=> {
    totalsMap[row[3]] += row[1]
  })

  //3.3 Create the totalsArray in the format [[category1, total1], [category2, total2]]
  //3.3.1 When the totals are added up, a value of "="undefined"" appears, so I had to remove it
  const totalsArray = Object.keys(totalsMap).map(category => [category, totalsMap[category]]).filter(row => row[1] != "undefined");
  totalsArray.unshift(["Category", "Total"])

  return totalsArray
}

function mainLineChartData() {
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
    dataArray.push([formatDate(date).substring(5), acumulatedIncome, acumulatedExpenses]);
  })

  return dataArray;
}


function mainTreemapData() {
  //1.Resolve Category IDs and call Categories table
  const expensesData = replaceCategoryIDs(categoriesTable, filteredExpenses);
  const categoryData = getAllCategories();

  //2. Get array for categories hierarchy [Sub]
  //2.1 Initialize with headers
  const dataArray = [["Sub-Category", "Category", "Expenses"],
                    ["Categories", null, 0]]

  //2.2 Populate array with categories and all values set to 0
  categoryData.forEach(row => {
    if(row[3] === "Main"){
      dataArray.push([row[1], "Categories",0])
    } else {
      dataArray.push([row[1], getMainCategory(row[1]), 0])
    }
  });
  
  //3.Acumulate by sub categories
  dataArray.forEach(row =>{
    if(row[1] !== "Categories"){
      expensesData.filter(expenseRow => {
        return expenseRow[4] === row[0]
      }).forEach(filteredExpense => {
        row[2] += filteredExpense[1]
      })
    }
  })

  //4. Return array without empty nodes
  return dataArray.filter((row, y) => {
    if( y === 0 || y === 1) {
      return true
    } else if(row[1] === "Categories") {
      return true
    } else {
      return row[2] === 0 ? false : true
    }
  })
}

function getTotalIncome() {
  filteredIncome.forEach(row => {
    totalIncome += row[1]
  });

  return totalIncome;
}

function getTotalExpense() {
  filteredExpenses.forEach(row => {
    totalExpenses += row[2];
  })
  return totalExpenses;
}

function getBalance() {

  const balance = getTotalIncome() - getTotalExpense();
  return balance.toFixed(2);
}