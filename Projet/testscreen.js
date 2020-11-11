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
function loadTableData(data){
  const tableBody = document.getElementById("tableData");
    for (let e of data){
      let element = document.createElement("div");
      element.setAttribute("id", e.keyword);
      element.setAttribute("class", "tabcontent");
      let tempData = document.createElement("p");
      let tempURL = document.createElement("p");
      dataHTML += '<button class="tablinks" id = "keyword" name =' + e.keyword + ' >' + e.keyword + '</button>';
      tempData.innerHTML = e.data;
      if (e.url == ""){
        tempURL.innerHTML = "URL: ";
      }
      else {
        tempLink = document.createElement("a");
        tempLink.setAttribute("href", e.url);
        tempURL.innerHTML = "URL: " + e.url;
      }
      element.appendChild(tempData);
      element.appendChild(tempURL);
      document.body.appendChild(element);
    }
    tableBody.innerHTML = dataHTML;
}
document.body.addEventListener("click", function(e){
  if (e.srcElement.id == "keyword"){
    //console.log(e.srcElement.name);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    tablinks = document.getElementsByName(e.srcElement.name).color = "black";
    document.getElementById(e.srcElement.name).style.display = "block";

  }
});
