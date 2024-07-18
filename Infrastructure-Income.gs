//Implement CRUD upperations

//CREATE
//This is done by the form, might add this later
//READ

function getAllIncomes() {
  return incomeTable;
}

function getIncomeByDate(startDate, endDate) {
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
  return incomeTable.filter((row) => row[1] >= startDate && row[1] <= endDate).map(row => row.slice(0, -3).slice(1));
}

//UPDATE
function updateIncome(incomeArray) {}

//DELETE

function deletIncome(incomeID) {}
