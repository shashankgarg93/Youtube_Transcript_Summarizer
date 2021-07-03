document.getElementById("Summarize").addEventListener("click",
function()
{
    chrome.runtime.sendMessage('get-summary');
    chrome.runtime.onMessage.addListener(
      (message,sender,sendResponse)=>{
        document.getElementById("summary").innerHTML(<p>message</p>)
      })
})

