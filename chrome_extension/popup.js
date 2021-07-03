document.getElementById("Summarize").addEventListener("click",
function()
{
    chrome.runtime.sendMessage({method:'getComments'}
    ,(response)=>{
      document.getElementById("summary").innerHTML=response.arr;
    });
    // chrome.runtime.onMessage.addListener(
    //   (message,sender,sendResponse)=>{
    //     document.getElementById("summary").innerHTML=message;
    //   });
});

