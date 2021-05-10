// alert('yo inside A')
var SignIn = 'https://login.target.com/gsp/static/v1/login/?client_id=ecom-web-1.0.0&ui_namespace=ui-default&back_button_action=browser&keep_me_signed_in=true&kmsi_default=false&actions=create_session_signin';
var testlinke = 'https://www.target.com/p/heyday-apple-watch-scrunchie-band/-/A-82709808?preselect=81506086#lnk=sametab';

function waitFor(selector) {
    return new Promise(function (res, rej) {
        waitForElementToDisplay(selector, 100);
        function waitForElementToDisplay(selector, time) {
            if (document.querySelector(selector) != null) {
                res(document.querySelector(selector));
            }
            else {
                setTimeout(function () {
                    waitForElementToDisplay(selector, time);
                }, time);
            }
        }
    });
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
console.log("Sleeping A");
setTimeout(() => { 
  
  console.log("World!");
  LookForShippingButton();

}, 1000);
console.log("Sleeping B");

function LookForShippingButton(){
  const checkElement = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector); 
    };
  
  checkElement('[data-test="shipItButton"]').then((selector) => {
    // alert('worked');
  console.log(selector);
  document.querySelector('[data-test="shipItButton"]').click();

  }).catch(()=>alert('failed') );

}

// while(!document.querySelector('[alt="Misty Blue"]')) {
//     await new Promise(r => setTimeout(r, 500));
//     alert('worked');
//   }

// waitFor('[data-test="shipItButton"]').then(()=> {
    
//     document.querySelector('[data-test="shipItButton"]').click();
    
//     alert('worked')



// }).catch(()=>alert('failed'));

// waitFor('[alt="Misty Blue"]').then(()=> {
    
//     document.querySelector('[alt="Misty Blue"]').click();
    
//     alert('worked')



// }).catch(()=>alert('failed'));
// chrome.tabs.update({active: true, url: urlToOpen});
// import crawler_Target from './crawler_Target.js';

// let crawler = new crawler_Target()
// crawler.StartCrawler();
// alert('yo inside B')