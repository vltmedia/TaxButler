import * as browser from 'webextension-polyfill';
// const checkElement = async selector => {
//   while ( document.querySelector(selector) === null) {
//     await new Promise( resolve =>  requestAnimationFrame(resolve) );
//   }
//   return document.querySelector(selector); 
// };

class crawler_Target {

  constructor() {
    this.name = 'poo';
    this.StartCrawler = this.StartCrawler.bind(this);
    this.ProductPageHandler = this.ProductPageHandler.bind(this);
    this.OpenLink = this.OpenLink.bind(this);
    this.LaunchCrawler_Target = this.LaunchCrawler_Target.bind(this);

  }

  StartCrawler(){
    var testlinke = 'https://www.target.com/p/heyday-apple-watch-scrunchie-band/-/A-82709808?preselect=81506086#lnk=sametab';
    this.OpenLink(testlinke);

  }


  // OpenLink(urlToOpen){
  //   // browser.tabs.update({active: true, url: urlToOpen});
  //   // this.LookForShippingButton();
    
  // }
  

  ProductPageHandler(){
    browser.tabs.executeScript({
      file: './crawler_Target_ProductPageHandler.js'
    })
      .then(res => {
        console.log(res); 
  
        setTimeout(() => { 
          console.log('FindShippingButton');
          // FindShippingButton();
        }, 2000);
      })
      .catch(err =>{
        console.log(err.toString());
      });
    
  }
  
  
  LaunchCrawler_Target(){
    console.log('foooo');
    browser.tabs.executeScript({
      file: './crawlerLauncher_Target.js'
    })
      .then(res => {
  
        setTimeout(() => { 
          console.log('ProductPageHandler');
          this.ProductPageHandler();
        }, 2000);
      
  
        console.log(res); 
      })
      .catch(err =>{
        console.log(err.toString());
      });
    
  }



}

export default crawler_Target;