//To serve the html file
function doGet() {
  
  return HtmlService.createTemplateFromFile("index").evaluate().setTitle("Personal finance 💰");

}

//To replace the HTMl expressions (<?!=  ?>) with the contents of the HTML files
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

