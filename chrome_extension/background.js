'use strict';
console.log("background.js runs");

var prevUrl = '';
var prevSummary = '';

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "initializeSummary") {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        if (tabs[0] == null) {
          chrome.runtime.sendMessage({action: "respondToButton", result: "Not a youtube video"});
          return;
        }
        var videourl = tabs[0].url;
        if (videourl != null) {
          console.log(videourl);
          getSummary(videourl);
        } else {
          chrome.runtime.sendMessage({action: "respondToButton", result: "Not a youtube video"});
        }
      });
      return true;
    }
    return true;
});



function getSummary(videourl) {
  console.log("Starting to obtain summary")
  var oReq = new XMLHttpRequest();
//   oReq.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var json = this.responseText;
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//           chrome.runtime.sendMessage({action: "obtainedSummary", result: json, vidId: videourl});
//         });
//       }
//   };
//   https://cors-anywhere.herokuapp.com/
  oReq.open("GET", "http://127.0.0.1:5000/api/summarize?youtube_url=" + videourl, true);
  oReq.send();
  chrome.runtime.sendMessage({action: "obtainedSummary", result: json, vidId: videourl});
}






//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     //alert("above if")
//     if (request.method === 'getComments') {
//         chrome.tabs.query({
//             'active': true,
//             'lastFocusedWindow': true
//         }, function(tabs) {
//             let serverUrl = tabs.url;
//             var xhr = new XMLHttpRequest();
//             xhr.open('GET', 'http://127.0.0.1:5000/api/summarize?youtube_url='+serverurl);            
//             xhr.setRequestHeader("Content-type", "application/json");
//             xhr.onload = () => {
//                 sendResponse({
//                     arr: 'something'
//                 }); //it seems this is not working
//             };
//             xhr.send();
//         });
// //         var url = '';
// //         chrome.tabs.getCurrent(function(tab){
// //             url = tab[0].url;
// //             console.log(tab.url);
// //     });
// //     const xhr = new XMLHttpRequest();


// // // create a `GET` request
// // xhr.open('GET', 'http://127.0.0.1:5000/api/summarize?youtube_url='+url, true);

// // // send request
// // xhr.send();
// // var summary = '';
// // xhr.onload = () => {
// //     // get JSON response
// //     const user = xhr.response;
// // summary = user;
// //     // log details
// //     sendResponse({message:"hi hello"});
// //  // John Doe
// // }
// return true;
//   }});