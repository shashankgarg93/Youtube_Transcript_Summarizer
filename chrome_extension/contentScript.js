
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //alert("above if")
    if (request.method === 'getComments') {
        chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true
        }, function(tabs) {
            let serverUrl = tabs.url;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:5000/api/summarize?youtube_url='+serverurl);            
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = () => {
                sendResponse({
                    arr: 'something'
                }); //it seems this is not working
            };
            xhr.send();
        });
//         var url = '';
//         chrome.tabs.getCurrent(function(tab){
//             url = tab[0].url;
//             console.log(tab.url);
//     });
//     const xhr = new XMLHttpRequest();


// // create a `GET` request
// xhr.open('GET', 'http://127.0.0.1:5000/api/summarize?youtube_url='+url, true);

// // send request
// xhr.send();
// var summary = '';
// xhr.onload = () => {
//     // get JSON response
//     const user = xhr.response;
// summary = user;
//     // log details
//     sendResponse({message:"hi hello"});
//  // John Doe
// }
return true;
  }});