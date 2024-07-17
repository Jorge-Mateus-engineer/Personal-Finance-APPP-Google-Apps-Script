function replaceCategoryIDs(categoriesTable, tableToResolve) {

  //1 Create a map with categories and IDs
  const categoryMap = {};
  categoriesTable.forEach((row)=> {
    categoryMap[row[0]] = row[1]; // row[0] is CategoryID, row[1] is CategoryName
  })
  //2 Generate 2D array with category names instead of IDs
  const result = [["Date", "Amount", "Description", "Main Category", "Sub Category"]];

  tableToResolve.forEach((row) => {
    //Prepare each row to be added
    const date = Utilities.formatDate(new Date(row[1]), Session.getScriptTimeZone(), "dd/MM/YYY");
    const amount = row[2];
    const description = row[3];
    const mainCategory = categoryMap[row[4]];
    const subCategory = categoryMap[row[5]];

    result.push([date, amount, description, mainCategory, subCategory])

  })
  
  return result;
}

function getMainCategoryList(categoriesTable) {
  const mainCategories = []

  categoriesTable.forEach((row) => {
    if(row[3] == "Main"){
      mainCategories.push(row[1])
    }
  })

  return mainCategories;
}

function getSubCategoryList(categoriesTable) {
  const subCategories = []

  categoriesTable.forEach((row) => {
    if(row[3] != "Main"){
      subCategories.push(row[1])
    }
  })

  return subCategories;
}

function filterByDates(tableToFilter, startDate, endDate) {
  return tableToFilter.filter((row)=>{
    return row[1] >= startDate && row[1] <= endDate;
  })
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}