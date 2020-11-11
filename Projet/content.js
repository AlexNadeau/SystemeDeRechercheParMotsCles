console.log("Content is running");
window.addEventListener('mouseup', highlighted);


function highlighted(){
  //alert("Test");
  var hText = window.getSelection().toString();
  console.log(hText);
  if (hText.length > 0 && hText){
    //alert(hText);
    chrome.runtime.sendMessage(hText);
  }
}
