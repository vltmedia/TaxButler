import 'regenerator-runtime/runtime';
import WebCombRoutes from '../api/webcomb/routes';
let WebCombRoutes_ = new WebCombRoutes();
// import WebCombRoutes from '../api/webcomb/routes';
// import crawler_Target from '../api/webcomb/crawler/crawler_Target/crawler_Target';
import * as browser from 'webextension-polyfill';
// browser.storage.local.get('userinfo').then(result => console.log(     result));

// browser.storage.local.get('userinfo').then(result => loggedin = true);

// let WebCombRoutes_ = new WebCombRoutes();
// WebCombRoutes_.CheckLocalUser().then(response => console.log(response));
browser.storage.local.get('userinfo').then(response => console.log(response));

// /* eslint-disable no-undef */
// console.log('Background.js file loaded');
// console.log(WebCombRoutes_.LoginURL);

/* const defaultUninstallURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://wwww.github.com/kryptokinght'
    : '';
}; */
// function FindShippingButton(){
//   browser.tabs.executeScript({
//     file: './crawler_Target_FindShippingButton.js'
//   })
//     .then(res => {
//       console.log(res);

//     })
//     .catch(err =>{
//       console.log(err.toString());
//     });

// }

// function ProductPageHandler(){
//   browser.tabs.executeScript({
//     file: './crawler_Target_ProductPageHandler.js'
//   })
//     .then(res => {
//       console.log(res);
//       console.log('ProductPageHandler | A');
//       // browser.storage.local.get('crawler_CurrentInfo').then(reso=>{console.log(reso);});
//       browser.storage.local.get('crawler_CurrentInfo').then(reso=>{
//         console.log('ProductPageHandler | B');
//         var nextt = reso.crawler_CurrentInfo.id + 1;
//         reso.crawler_CurrentInfo.id  = nextt;
//         console.log('ProductPageHandler | C');
//         browser.storage.local.set({'crawler_CurrentInfo': reso.crawler_CurrentInfo});
//         console.log('ProductPageHandler | D');
//         if(nextt < reso.crawler_CurrentInfo.lastid ){
//           console.log('ProductPageHandler | E');

//           // if(nextt < reso.crawler_CurrentInfo.lastid){
//           // setTimeout(() => {
//           //   console.log('Item In Cart!');
//           //   Crawler_TargetLoop();
//           // //   // FindShippingButton();
//           // }, 2000);

//           // Crawler_TargetLoop();

//         } else{
//           console.log('Stopping!');
//           console.log(nextt);
//         }
//       });

//     })
//     .catch(err =>{
//       console.log(err);
//       console.log('ProductPageHandler | FAIL');
//     });

// }

function Crawler_TargetLoop() {
  // console.log('Setting Link | ' + link);
  browser.storage.local.get('crawler_CurrentInfo').then(reso => {
    console.log(reso);
    // browser.storage.local.set({'crawler_CurrentLink': link}).then(res => {

    console.log(reso);
    browser.tabs
      .executeScript({
        file: './crawlerLauncher_Target.js'
      })
      .then(() => {
        console.log('ProductPageHandler Looping!  ');
        // setTimeout(() => {
        //   // Crawler_TargetLoop();

        //   // ProductPageHandler();
        // }, 4000);

        // console.log(res);
      })
      .catch(err => {
        console.log(err.toString());
        console.log('Crawler_TargetLoop | FAIL');
      });

    // }).catch(err => {

    //   console.log(err);

    // });
  });
}

async function LaunchCrawler() {
  let UserCrawlQueue = await WebCombRoutes_.GetUserCrawlQueue();
  browser.storage.local.set({ crawlqueues: UserCrawlQueue.data });
  console.log(UserCrawlQueue);
  LaunchCrawler_Target(UserCrawlQueue.data.crawlqueues[0]);
}

function LaunchCrawler_Target(crawlqueue) {
  console.log('LaunchCrawler_Target ');

  // var linkss = ['https://www.target.com/p/pokemon-cereal-family-size-17oz-general-mills/-/A-81576569#lnk=sametab','https://www.target.com/p/funko-pop-games-pokemon-10-34-cubone/-/A-79641748#lnk=sametab'];
  // var count = 0;

  var currentq = crawlqueue;
  console.log(currentq);
  var linkss = [];
  currentq.crawlsettings.forEach(function(item) {
    linkss.push(item.link);
  });

  console.log(linkss);

  browser.storage.local.set({
    crawler_CurrentInfo: {
      id: 0,
      lastid: linkss.length,
      links: linkss,
      link: linkss[0]
    }
  });
  Crawler_TargetLoop();

  // runSerial();
}

function LaunchAmazonPageProcess() {
  browser.tabs
    .executeScript({
      file: './amazoncart.js'
    })
    .then(res => {
      console.log(res);
      console.log('amazoncart | Ran!');
    })
    .catch(err => {
      console.log('amazoncart | FAIL!');
      alert('Failed LaunchAmazonPageProcess , please try refreshing the page.');
      console.log(err);
    });
}

function LaunchPaypalPageProcess() {
  console.log('LaunchPaypalPageProcessB');

  browser.tabs
    .executeScript({
      file: './paypalcart.js'
    })
    .then(res => {
      console.log(res);
      console.log('paypalcart | Ran!');
    })
    .catch(err => {
      console.log('paypalcart | FAIL!');
      alert('Failed LaunchPaypalPageProcess , please try refreshing the page.');
      console.log(err);
    });
}

browser.runtime.onMessage.addListener(function(message) {
  console.log(message);

  console.log('message.data ', message.data);
  console.log('message.data.command ', message.data.command);

  if (message.data.command == 'GetStorage') {
  }

  if (message.data.command == 'ClearCache') {
    browser.storage.local
      .remove('taxbutler')
      .then(() => {
        browser.storage.local
          .remove('taxbutleramazon')
          .then(() => {
            browser.storage.local
              .remove('taxbutlerpaypal')
              .then(() => {
                browser.tabs
                  .executeScript({
                    file: './clearcache.js'
                  })
                  .then(res => {
                    console.log(res);
                    alert(
                      'Cleared Cache for this Page! Make sure to open the order pages to clear their caches too!'
                    );
                  })
                  .catch(err => {
                    alert('Cleared Cache Failed!');

                    console.log('Cleared Cache  | FAIL!');
                    console.log(err);
                  });
              })
              .catch(err => {
                alert('Cleared Cache Failed 2 !');

                console.log('Cleared Cache  | FAIL 2!');
                console.log(err);
              });
          })
          .catch(err => {
            alert('Cleared Cache Failed 3 !');

            console.log('Cleared Cache  | FAIL 1!');
            console.log(err);
          });
      })
      .catch(err => {
        alert('Cleared Cache Failed 1 !');

        console.log('Cleared Cache  | FAIL 3!');
        console.log(err);
      });

    // browser.tabs.executeScript({ code: 'localStorage.removeItem("taxbutler")";' });
    // browser.tabs.executeScript({ code: 'localStorage.removeItem("taxbutleramazon")";' });
    // browser.tabs.executeScript({ code: 'localStorage.removeItem("taxbutlerpaypal")";' });
  }

  if (message.data.command == 'SetName') {
    browser.tabs.executeScript({
      code: 'const usernamee = "' + message.data.name + '";'
    });
  }

  if (message.data.command == 'ProcessPage') {
    browser.tabs
      .executeScript({
        // code: 'const usernamee = "' + message.data.name + '";'
        code:
          'const usernamee = "' +
          message.data.name +
          '";\n const previousdata = true;\n const loadedData = ' +
          message.data.loadData +
          ';'
      })
      .then(() => {
        console.log('just set the load data');
        //    browser.tabs.executeScript({
        //   code: 'const previousdata = true;\n const loadedData = "' + message.data.loadData + '";'
        // }).then(()=>{

        // });

        if (message.data.crawler == 'Amazon') {
          console.log('LaunchAmazonPageProcess');

          LaunchAmazonPageProcess();
        }
        if (message.data.crawler == 'Paypal') {
          console.log('LaunchPaypalPageProcess');

          LaunchPaypalPageProcess();
        }
      })
      .catch(err => {
        alert('Failed Setting Parameters, please try refreshing the page.');
        console.log('Failed Setting Parameters', err);
      });
  }
  if (message.data.command == 'log') {
    console.log(message);
  }
  if (message.command == 'crawlerTargetStart') {
    // browser.storage.local.get('userinfo').then(result =>{
    //   console.log(result);

    //   console.log('poooo');
    //   fetch('https://vltapi.com/api/v2/merchcomb/_table/crawl_queue?filter=user%20=4', {
    //     method: 'GET',
    //     headers: {'Content-type': 'application/json;charset=UTF-8' ,
    //       'X-DreamFactory-Api-Key': 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c',
    //       'X-DreamFactory-Session-Token': result.userinfo.session_token,
    //     }
    //   })
    //     .then(response => {

    //       console.log('response!');
    //       console.log(response);
    //       response.json().then(js => console.log(js));

    //     });
    LaunchCrawler();

    // });

    // // const tabId = 0;
    // var crawler_target_ = new crawler_Target();

    // crawler_target_.LaunchCrawler_Target();
    // if(message.command=='2'){
    //   LaunchCrawler_Target();
    // }
  }

  if (message.command == 'processdone') {
    if (message.result == 'Amazon-PageProcess') {
      browser.storage.local.set({ taxbutler: message.data });
      browser.storage.local.set({ taxbutleramazon: message.data });
      console.log('Finished Amazon-PageProcess!');
      SetCategories(message.data, 'Amazon');
      // setTimeout(() => {
      //   console.log('Launching ProductPageHandler!');
      //   // ProductPageHandler();
      // }, 1000);
    }

    if (message.result == 'Paypal-PageProcess') {
      // browser.storage.local.set({ taxbutler: message.data });
      // browser.storage.local.set({ taxbutlerpaypal: message.data });
      SetCategories(message.data, 'Paypal');
      console.log('Finished Paypal-PageProcess!');

      // setTimeout(() => {
      //   console.log('Launching ProductPageHandler!');
      //   // ProductPageHandler();
      // }, 1000);
    }

    // if(message.result == 'ClickedShipping'){
    //   console.log('Clicked Shipping!');
    //   setTimeout(() => {
    //     console.log('Launching Next!');
    //     browser.storage.local.get('crawler_CurrentInfo').then(reso=>{
    //       // var nextt = reso.crawler_CurrentInfo.id + 1;
    //       // reso.crawler_CurrentInfo.id = nextt;
    //       // browser.storage.local.set({'crawler_CurrentInfo':reso.crawler_CurrentInfo});
    //       console.log('ProductPageHandler Looping!   ' + reso.crawler_CurrentInfo.id.toString());
    //       console.log(reso.crawler_CurrentInfo.id);
    //       console.log(reso.crawler_CurrentInfo.lastid);
    //       if (reso.crawler_CurrentInfo.id < reso.crawler_CurrentInfo.lastid){

    //         Crawler_TargetLoop();

    //       }
    //     });
    //     // ProductPageHandler();
    //   }, 1000);

    // }
  }
});



function SetCategories(data, typee) {
  for (var i = 0; i < data.Orders.length - 1; i++) {
    var newcategory = data.Orders[i].Category;

    for (var item = 0; item < data.Orders.length - 1; item++) {
      var ItemSelected = data.Orders[i].Items[item];
      try {
        newcategory = GetOrderType(ItemSelected.Title);
        data.Orders[i].Category = newcategory;

        // console.log(newcategory);
      } catch {}
    }
  }
  // browser.storage.local.set({ taxbutler: message.data });
  if (typee == 'Paypal') {
    browser.storage.local
      .set({ taxbutlerpaypal: data })
      .then(() => {
        console.log('Updated Paypal Data!');
        alert('Updated!');
      })
      .catch(err => {
        console.log('Failed!', err);
        alert('Failed!', err);
      });
  } else {
    browser.storage.local
      .set({ taxbutleramazon: data })
      .then(() => {
        console.log('Updated Amazon Data!');
        alert('Updated!');
      })
      .catch(err => {
        console.log('Failed!', err);
        alert('Failed!', err);
      });
  }
}
function GetOrderType(title) {

  var typee = 'Undefined';
  this.PCPart.forEach(word => {
    if (title.includes(word)) {
      typee = 'PCPart';
    }
  });
  this.HomeOffice.forEach(word => {
    if (title.includes(word)) {
      typee = 'HomeOffice';
    }
  });
  this.PCHardDrive.forEach(word => {
    if (title.includes(word)) {
      typee = 'PCHardDrive';
    }
  });
  this.LivingExpenses.forEach(word => {
    if (title.includes(word)) {
      typee = 'LivingExpenses';
    }
  });
  this.VideoGames.forEach(word => {
    if (title.includes(word)) {
      typee = 'VideoGames';
    }
  });
  this.ProductionAsset.forEach(word => {
    if (title.includes(word)) {
      typee = 'ProductionAsset';
    }
  });
  this.ConvenienceStore.forEach(word => {
    if (title.includes(word)) {
      typee = 'ConvenienceStore';
    }
  });
  this.ProductionSubscription.forEach(word => {
    if (title.includes(word)) {
      typee = 'ProductionSubscription';
    }
  });
  return typee;
}
