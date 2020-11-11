document.getElementById("showAll").addEventListener("click", showAllKeys);
document.getElementById("register").addEventListener("click", registerKeyWord);;


document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

document.getElementById("txtBoxTwo").addEventListener("keyup", function(event){
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("register").click();
  }
});


function registerKeyWord(){
  var tempObj;
  var data  = document.getElementById("txtBox").value;
  var keyfromTxtBox = document.getElementById("txtBoxTwo").value;
  document.getElementById("txtBox").value = "";
  document.getElementById("txtBoxTwo").value = "";
  if (data.length > 0 && document.getElementsByClassName("drop-zone__thumb").length == 1){
    window.alert("Too many things");
  }
  else if (document.getElementsByClassName("drop-zone__thumb").length == 1){
    var element = document.getElementsByClassName("drop-zone__thumb");
    var string = element[0].outerHTML.toString();
    string = string.slice(string.lastIndexOf("data"), string.length - 16);
    if (string.includes("data:image")){
      tempObj = {
        task: "registerKeyWord",
        data: string,
        key: keyfromTxtBox,
        url: ""
      };
      //console.log(tempObj);
      chrome.runtime.sendMessage(tempObj);
    }
    else{
      window.alert("Must be PNG JPG or GIF file");
    }
  }
  else if (data.length > 0 && keyfromTxtBox.length > 0){
    if (document.getElementById("URL1").checked){
      var activeTab;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      activeTab = tabs[0];
      activeTab = activeTab.url.toString();
      tempObj = {
        task: "registerKeyWord",
        data: data,
        key: keyfromTxtBox,
        url: activeTab
      }
      chrome.runtime.sendMessage(tempObj);
      });
    }
    else{
      tempObj = {
        task: "registerKeyWord",
        data: data,
        key: keyfromTxtBox,
        url: ""
      };
      chrome.runtime.sendMessage(tempObj);
    }
  }
  else if (keyfromTxtBox.length > 0){
    if (document.getElementById("URL1").checked){
      var activeTab;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      activeTab = tabs[0];
      activeTab = activeTab.url.toString();
      tempObj = {
        task: "registerKeyWord",
        key: keyfromTxtBox,
        url: activeTab
      }
      chrome.runtime.sendMessage(tempObj);
      });
    }
    else{
      tempObj = {
        task: "registerKeyWord",
        key: keyfromTxtBox,
        url: ""
      };
      chrome.runtime.sendMessage(tempObj);
    }
  }
  else{
    alert("No keyword in text box");
  }
}


function showAllKeys(){
  //var tempObj = {
    //task : "showAllKeys"
  //};
  //chrome.runtime.sendMessage(tempObj);

  chrome.tabs.create({url: chrome.extension.getURL('newscreen.html')});
  //chrome.tabs.create({url: chrome.extension.getURL('testscreen.html')});


}
