//Implement CRUD upperations

//CREATE
//This is done by the form, might add this later
//READ

function getAllCategories() {
    return categoriesTable.filter(row => {
        return row[0] != ""
    });
}

function getMainCategoriesList(){
    const mainCategories = []

    categoriesTable.forEach((row) => {
        if(row[3] == "Main"){
            mainCategories.push(row[1])
        }
  })

    return mainCategories;
}

function getSubCategoriesList() {
    const subCategories = []

    categoriesTable.forEach((row) => {
        if(row[3] != "Main"){
        subCategories.push(row[1])
        }
    })

    return subCategories;
}

function getMainCategory(subCategoryString) {
    let mainCategoryString
    let mainCategoryID
    categoriesTable.forEach(row => {
        if(row[1] === subCategoryString){
            mainCategoryID = row[2]
        };
    });
    categoriesTable.forEach(row => {
        if(row[0] === mainCategoryID) {
            mainCategoryString = row[1]
        }
    });

    return mainCategoryString;
}

function getAllSubCategories(){}

//UPDATE
function updateCategory(categoryID, categoryArray) {}

//DELETE

function deletCategory(expenseID) {}
