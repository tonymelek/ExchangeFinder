var x=[];
            
$.getJSON('https://script.google.com/macros/s/AKfycbzfPbiLLpGN5gOEHLprf7w2EY31Lgfg4E_ChmAx6c7ET3MXo-fP/exec?callback=?',function(ttt){

x=ttt;
});
$("#input").keyup(function(){

    let ttt=x;
    let k=[];
    let m=0;
    for (let i in ttt){
//                    alert($("#input").val());
    if(ttt[i][1].includes($("#input").val().toUpperCase())){
      k[m]=[ttt[i][0],ttt[i][1],ttt[i][2],ttt[i][4],ttt[i][5]] ;
        m=m+1;
    }}
    // console.log(k);
    var y="";
    for(let i in k){
    y=y+'<tr><td>'+k[i][0]+'</td><td class="exchange">'+k[i][1]+'</td><td>'+k[i][2]+'</td><td><a class="map" href=https://maps.google.com/?q='+k[i][3]+','+k[i][4]+' target="_blank" >Navigate</a></td></tr>';}
    output= '<table ><tbody>'+y+'</tbody></table>';

    $(".table-container").html(output);
    $("#findings").text("We have found "+(k.length)+" matching records");
})