
try{
let apikey = 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c';
}catch{
    
}
Launch();

function Launch(){
    console.log("Getting User Info");
    chrome.storage.local.get('crawler_CurrentInfo', function (items) {
       console.log('crawler_CurrentInfo');
       console.log(items);
       window.location.href = items.crawler_CurrentInfo.links[items.crawler_CurrentInfo.id];
       done();
    //    setTimeout(done, 2000);
    });

}
function done() {
    var msg = { command: 'processdone', result: 'LaunchURL' };
    chrome.runtime.sendMessage(msg);
}


