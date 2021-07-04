// document.getElementById("Summarize").addEventListener("click",
// function()
// {
//     chrome.runtime.sendMessage({method:'getComments'}
//     ,(response)=>{
//       document.getElementById("summary").innerHTML=response.arr;
//     });
//     // chrome.runtime.onMessage.addListener(
//     //   (message,sender,sendResponse)=>{
//     //     document.getElementById("summary").innerHTML=message;
//     //   });
// });

console.log("popup.js runs");

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', initializeSummary);
});

function initializeSummary() {

  chrome.runtime.sendMessage({action: "initializeSummary"}, (response) => {});
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "respondToButton") {
      document.getElementById('text-out').innerHTML = msg.result;
      return true;
    }
    return true;
});
