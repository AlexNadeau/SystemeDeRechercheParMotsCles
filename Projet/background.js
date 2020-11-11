console.log("Background running");
chrome.runtime.onMessage.addListener(received);


chrome.commands.onCommand.addListener(function(command){
  alert("Command: " + command);
});


let data  = [];

function received(request, sender, sendResponse){
  var notifOptions = {
    type: 'basic'
  };
  if (request.hasOwnProperty('task') && request.task == "delete keyword"){
    chrome.storage.local.remove(request.key, function(){
      var error = chrome.runtime.lastError;
      if (error){
        alert(error);
      }
      else{
        //alert(request.key + " has been deleted");
        notifOptions = {
          type: 'basic',
          iconUrl : 'icons8-view-50.png',
          title : 'Deleted',
          message : "'" + request.key + "'"+ ' has been deleted'
        };
        chrome.notifications.create("errorNotif", notifOptions);
        chrome.notifications.clear("errorNotif");
      }
    });
  }
  else if (request.hasOwnProperty("task") && request.task == "registerKeyWord"){
    var lilObj;
    if (request.hasOwnProperty("data")){
      lilObj = {
        data: request.data,
        url: request.url
      };
      var dataObject = {};
      dataObject[request.key] = lilObj;
      chrome.storage.local.set(dataObject, function(){
        notifOptions = {
          type : "basic",
          iconUrl: "icons8-view-50.png",
          title : "Saved",
          message : request.key + " succesfully saved!"
        };
        data[0] = "";
        chrome.notifications.create("errorNotif", notifOptions);
        chrome.notifications.clear("errorNotif");
      });
    }
    else{
      if (data.length == 0){
        window.alert("Nothing highlighted");
      }
      else{
        lilObj = {
          data: data[0],
          url: request.url
        };
        var dataObject = {};
        dataObject[request.key] =lilObj;
        chrome.storage.local.set(dataObject, function(){
          notifOptions = {
            type : "basic",
            iconUrl: "icons8-view-50.png",
            title : "Saved",
            message : request.key + " succesfully saved!"
          };
          data[0] = "";
          chrome.notifications.create("errorNotif", notifOptions);
          chrome.notifications.clear("errorNotif");

        });
      }
    }
  }
  else{
    data[0] = request;
  }
}
