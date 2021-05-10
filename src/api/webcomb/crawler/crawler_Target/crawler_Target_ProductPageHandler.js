
// alert('yo inside A')
var SignIn = 'https://login.target.com/gsp/static/v1/login/?client_id=ecom-web-1.0.0&ui_namespace=ui-default&back_button_action=browser&keep_me_signed_in=true&kmsi_default=false&actions=create_session_signin';
var url = 'https://www.target.com/p/heyday-apple-watch-scrunchie-band/-/A-82709808?preselect=81506086#lnk=sametab';
var ShipButtonExist = false;
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



function LookForVariationButton(){
  const checkElement = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector); 
    };
  
  checkElement('[alt="Misty Blue"]').then((selector) => {
    // alert('worked');
  console.log(selector);
  document.querySelector('[alt="Misty Blue"]').click();
  // setTimeout(() => { 
  
  //   console.log("Looking for Ship Buttoin");
  //   ClickShippingButton();
  
  // }, 200);
  console.log("Looking for Ship Buttoin");
  ClickShippingButton();
  // document.querySelector('[data-test="shipItButton"]').click();

  }).catch(()=>alert('failed') );

}console.log("Sleeping B");

function ClickShippingButton(){
  const checkElement = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector); 
    };
  
  checkElement('[data-test="shipItButton"]').then((selector) => {
    // alert('worked');
  console.log('FOUND SHIP BUTTON!');
  
  document.querySelector('[data-test="shipItButton"]').click();
  done();
  // document.querySelector('[data-test="shipItButton"]').click();

  }).catch(()=>alert('failed') );

}
function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      PreorderExists = true;
      callback();
      return;
    }
    else {
      PreorderExists = false;
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
var PreorderExists = false;
function CheckPreorder(){
  
  waitForElementToDisplay('[data-test="preorderFulfillment"]',function(){console.log("FOUND Preorder!");  PreorderExists = true;},1000,5000);
  if(!PreorderExists){
    ClickShippingButton();

  }else{
    console.log('Preorder Exists! ');
    done();
  }
  // console.log('After Preorder! ');
  
  

}


function DetectForShippingButton(){
  const checkElement = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector); 
    };
  
  checkElement('[data-test="shipItButton"]').then((selector) => {
    // alert('worked');
  console.log('FOUND SHIP BUTTON!');
  ShipButtonExist = true;
  ClickShippingButton();
  // LookForVariationButton();
    // document.querySelector('[data-test="shipItButton"]').click();

  }).catch(()=>alert('failed') );

}

function Main(){

  console.log("Starting Target Product Page Handling | " , url);


  setTimeout(() => { 
    
    console.log("World!");
    CheckPreorder();
    // ClickShippingButton();

  }, 5000);
console.log("Sleeping B");



}
Main();

function done() {
  var msg = { command: 'processdone', result: 'ClickedShipping' };
  chrome.runtime.sendMessage(msg);
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