
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message === 'get-summary') {
        var url = '';
        chrome.tabs.getCurrent(function(tab){
            url = tab.url;
            console.log(tab.url);
    });
    const xhr = new XMLHttpRequest();


// create a `GET` request
xhr.open('GET', 'http://127.0.0.1:5000/api/summarize?youtube_url='+url);

// send request
xhr.send();
var summary = '';
xhr.onload = () => {
    // get JSON response
    const user = xhr.response;
summary = user;
    // log details
    console.log(user); // John Doe
}
chrome.runtime.sendMessage(user);
    }
  });