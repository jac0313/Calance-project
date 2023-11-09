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
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get data from each row
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        // Get data from each column
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file  
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "GfG.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}