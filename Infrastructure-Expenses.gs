//Implement CRUD upperations

//CREATE
//This is done by the form, might add this later
//READ

function getAllExpenses() {
  return expensesTable;
}

function getExpenseByDate(startDate, endDate) {
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
  return expensesTable.filter((row) => row[1] >= startDate && row[1] <= endDate);
}

//UPDATE
function updateExpense(expenseArray) {}

//DELETE

function deleteExpense(expenseID) {}

