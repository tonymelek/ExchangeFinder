// inititalize empty array as global variable to carry the JSON object 
var json = [];

// Call backend from google script deployed web app
$.getJSON('https://script.google.com/macros/s/AKfycbzfPbiLLpGN5gOEHLprf7w2EY31Lgfg4E_ChmAx6c7ET3MXo-fP/exec?callback=?', function (imported_table) {

    json = imported_table;
});
$("#input").keyup(function () { //re-run the function for each key stroke

    let imported_table = json;
    let results = [];
    let results_count = 0;
    for (let i in imported_table) {
        // The imported imported_table is a two dimensionl array with the following structure
        // First column ==> 4 Alpha code for the Exchange
        // Second Column ==> Exchange Name
        // Third Column ==> Exchange Address
        // Fourth and Fifth==> The long and lat (coordinates)



        if (imported_table[i][1].includes($("#input").val().toUpperCase())) { //check input from user after converting to upper case (to make the search NOT case sensetive)to build the table to be displayed
            results[results_count] = [imported_table[i][0], imported_table[i][1], imported_table[i][2], imported_table[i][4], imported_table[i][5]];
            results_count = results_count + 1;
        }
    }

    var display_table = "";
    const screen_size = window.innerWidth;
    for (let i in results) {
        if (screen_size > 450) {
            display_table = display_table + '<tr><td>' + results[i][0] + '</td><td class="exchange">' + results[i][1] + '</td><td>' + results[i][2] + '</td><td><a class="map" href=https://maps.google.com/?q=' + results[i][3] + ',' + results[i][4] + ' target="_blank" >Navigate</a></td></tr>';
        }
        else {
            display_table = display_table + '<tr><td>' + results[i][0] + '</td><td class="exchange">' + results[i][1] + '</td><td><a class="map" href=https://maps.google.com/?q=' + results[i][3] + ',' + results[i][4] + ' target="_blank" >Navigate</a></td></tr>';
        }

    }
    output = '<table ><tbody>' + display_table + '</tbody></table>';
    // add html content to table elemnt
    $(".table-container").html(output);
    // Display Number of records found matching user search text
    $("#findings").text("We have found " + (results.length) + " matching records");
})