// inititalize empty array as global variable to carry the JSON object 
let json = [];
$("#findings").text('Loading Results...')
const drawTable = (imported_table) => {
    const results = imported_table.filter(record => record[1].includes($("#input").val().trim().toUpperCase()))
    const results_count = results.length

    var tbody = $('<tbody>');
    const screen_size = window.innerWidth;

    results.forEach(result => {
        const tr = $('<tr>');
        const alphas = $(`<td>${result[0]}</td>`);
        const name = $(`<td class="exchange">${result[1]}</td>`);
        const address = $(`<td class="exchange">${result[2]}</td>`);
        const navLink = $(`<td><a class="map" href=https://maps.google.com/?q=${result[4]},${result[5]} target="_blank" >Navigate</a></td>`)
        if (screen_size > 450) {
            tr.append(alphas, name, address, navLink);
        } else {
            tr.append(alphas, name, navLink);
        }
        tbody.append(tr)
    })


    const table = $('<table>')
    table.append(tbody)
    // add table to table container
    $(".table-container").append(table)
    // Display Number of records found matching user search text
    $("#findings").text(`We have found ${results_count} matching records`);
}
// Call backend from google script deployed web app
$.getJSON('https://script.google.com/macros/s/AKfycbzfPbiLLpGN5gOEHLprf7w2EY31Lgfg4E_ChmAx6c7ET3MXo-fP/exec?callback=?', imported_table => {
    json = imported_table;
    drawTable(imported_table)

});
$("#input").keyup(() => { //re-run the function for each key stroke
    $(".table-container").empty();
    if ($('#input').val().trim().length < 3) {
        $("#findings").text(`Type 3 characters at least to see results`);
        return
    }
    const imported_table = json;
    drawTable(imported_table)

})
