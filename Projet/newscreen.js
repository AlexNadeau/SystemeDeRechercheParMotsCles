let data = [];
let dataHTML = "";
chrome.storage.local.get(null, function(items){
  for (let a in items){
    if (items.hasOwnProperty(a)){
      if (items[a].hasOwnProperty('url')){
        var lil = {
          keyword : a,
          data : items[a]['data'],
          url : items[a]["url"]
        };
        data.push(lil);
      }
      else{
        var lil = {
          keyword : a,
          data : items[a],
          url : ""
        };
        data.push(lil);
      }
    }
  }
  //console.log(data);
  loadTableData(data);
});
var search_input = document.querySelector("#search_input");

search_input.addEventListener("keyup", function(e){
  var span_items = document.querySelectorAll(".keyword");
  var search_item = e.target.value.toLowerCase();

 span_items.forEach(function(item){
   if(item.textContent.toLowerCase().indexOf(search_item) != -1){
      item.closest("tr").style.display = "table-row";
   }

   else{
     item.closest("tr").style.display = "none";
   }
 })

});



function loadTableData(data){
  const tableBody = document.getElementById("tableData");
  if (data.length == 0){
    dataHTML += '<tr><td> Empty </td><td></td><td></td><td></td></tr>';
  }
  else{
    for (let e of data){
      dataHTML += '<tr><td class = "keyword">' + e.keyword + '</td>';
      if (e.data.includes("data:image")){
        dataHTML += '<td><img src =' + e.data + ' height = "300" width = "300"></td>';
      }
      else{
        dataHTML += '<td>' + e.data + '</td>';
      }
      if (e.url == ""){
        dataHTML += "<td>--------" + '</td>';
      }
      else{
        dataHTML += '<td><a href=' + e.url + '>' + e.url + '</a></td>';
      }
      dataHTML += '<td><button class = "buttons" id = "keyword" ><i class = "icons" id = "icon"></i></button></td></tr>';
    }
  }
  tableBody.innerHTML = dataHTML;

}
document.body.addEventListener("click", function(e){
  if (e.srcElement.id == "keyword"){
    //console.log(e.path[2].firstChild.outerText);
    var tempObj = {
      task : "delete keyword",
      key : e.path[2].firstChild.outerText
    };
    if (confirm("Do you wish to delete: " + tempObj.key)){
      chrome.runtime.sendMessage(tempObj);
      location.reload();
    }
  }
  else if (e.srcElement.id == "icon"){
    //console.log(e.path[3].firstChild.outerText);
    var tempObj = {
      task : "delete keyword",
      key : e.path[3].firstChild.outerText
    };
    if (confirm("Do you wish to delete: " + tempObj.key)){
      chrome.runtime.sendMessage(tempObj);
      location.reload();
    }
  }
});
