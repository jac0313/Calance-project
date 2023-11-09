// To Do:
// -get proper data from API
// -display data in table
// -turn table data to csv format
// -create csv download and make button


const apiUrl = 'https://api.github.com/repos/twbs/bootstrap/releases'
$.get(apiUrl).then((data) =>
// jquery get request takes the data from the api, forEach method performs the function on each element to then append to the table body
  data.forEach((release) => {
    $('tbody').append(
      $(`
    <tr>
      <td>${release.id}</td>
      <td>${release.created_at}</td>
      <td>${release.tag_name}</td>
      <td>${release.url}</td>
    </tr>`)
    )
    // template literal fills in the table body dynamically
  })
)
function tableToCSV() {
    var csvData = [];
    // Variable to store the final csv data
    var rows = document.getElementsByTagName('tr')
    for(var i=0; i<rows.length; i++)
    // Gets data from each row
    var cols = rows[i].querySelectorAll('th,td')
        // Gets data from each column
        var csvRow = [];
        // Stores each csv row data
        for (var j = 0; j < cols.length; j++) {
            
            csvRow.push(cols[j].innerHTML);
        }
        // Gets the text data of each cell of a row and pushes it to csvRow
        csvData.push(csvRow.join(","));
    }
     // Combines each column value with comma
    csvData = csvData.join('\n');
    // Combines each row data with new line character
    downloadCSVFile(csvData);
// Call this function to download csv file 
function downloadCSVFile(csvData) {

    // Create CSV file object and feed our csvData into it
    CSVFile = new Blob([csvData], {
        type: "text/csv"
    });
    // Create to temporary link to initiate download process
    var temp_link = document.createElement('a');
    // Download csv file
    temp_link.download = "GfG.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    // This link should not be displayed, solely for triggering purposes
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}