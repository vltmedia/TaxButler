import * as browser from 'webextension-polyfill';


// api key for WebComb
let apikey = 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c';


class WebCombRoutes {
  constructor() {
    this.apikey = apikey;
    this.LoginURL = 'https://vltapi.com/api/v2/user/session';
    this.LoginUser = this.LoginUser.bind(this);
    this.CheckLocalUser = this.CheckLocalUser.bind(this);
    this.SignOutUser = this.SignOutUser.bind(this);
    this.GetUserCrawlQueue = this.GetUserCrawlQueue.bind(this);
    this.GetUserCrawlSettings = this.GetUserCrawlSettings.bind(this);
    this.AddCrawlSetting = this.AddCrawlSetting.bind(this);


  }

  async GetUserCrawlQueue(){
    // Returns : {data :{ crawlqueues : [{crawlsettings : [ ... ] }] , id: #, name :"", status: "", user: #  } }
    const userinf = await browser.storage.local.get('userinfo');
    console.log(userinf);
    const requestOptions = {
      method: 'GET',
      headers: {'Content-type': 'application/json;charset=UTF-8' ,
        'X-DreamFactory-Api-Key': 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c',
        'X-DreamFactory-Session-Token': userinf.userinfo.session_token
      }
    };
    
    const response = await fetch('https://vltapi.com/api/v2/merchcomb/_table/crawl_queue?filter=user%20='+userinf.userinfo.id, requestOptions);
    const userr = await response.json();
    if (userr.hasOwnProperty('error')) {
      return {data :userr, result:'error'};
    } else {
      let crawlss = {crawlqueues : []};
      
      for (var i = 0; i < userr.resource.length; i++) {
        var crawlq = userr.resource[i];
       
      
        const crawlsettings_ = await this.GetUserCrawlSettings(crawlq.id.toString());
        crawlq.crawlsettings = crawlsettings_.data;
        crawlss.crawlqueues.push(crawlq);
      }
      
      let outdata = crawlss;






      return {data :outdata, result:'success'};
    }
 
    // await fetch(this.LoginURL, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {return(data);})
    //   .catch(err => {return(err);});

  }
  async GetUserCrawlSettings(crawlqid){

    const userinf = await browser.storage.local.get('userinfo');
    console.log(userinf);
    const requestOptions = {
      method: 'GET',
      headers: {'Content-type': 'application/json;charset=UTF-8' ,
        'X-DreamFactory-Api-Key': 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c',
        'X-DreamFactory-Session-Token': userinf.userinfo.session_token
      }
    };
    
    const response = await fetch('https://vltapi.com/api/v2/merchcomb/_table/crawl_setting?filter=crawl_queue%20='+crawlqid, requestOptions);
    const crawlsettings = await response.json();
    if (crawlsettings.hasOwnProperty('error')) {
      return {data :crawlsettings, result:'error'};
    } else {
      return {data :crawlsettings.resource, result:'success'};
    }
 
    // await fetch(this.LoginURL, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {return(data);})
    //   .catch(err => {return(err);});

  }

  async LoginUser(UserInfo){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-DreamFactory-Api-Key': this.apikey  },
      body: JSON.stringify({ email: UserInfo.data.email , password:UserInfo.data.password })
    };
    
    const response = await fetch(this.LoginURL, requestOptions);
    const userr = await response.json();
    if (userr.hasOwnProperty('error')) {
      return {data :userr, result:'error'};
    } else {
      return {data :userr, result:'success'};
    }
    // await fetch(this.LoginURL, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {return(data);})
    //   .catch(err => {return(err);});

  }

  async AddCrawlSetting(CrawlSettings){
    
    const userinf = await browser.storage.local.get('userinfo');
    const requestOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json;charset=UTF-8' ,
        'X-DreamFactory-Api-Key': 'cb1dd4d2791d4abd89240e04323095c1209928cc286c638fbdd01e3c493baf5c',
        'X-DreamFactory-Session-Token': userinf.userinfo.session_token
      },
      body: JSON.stringify({ resource: [CrawlSettings] })
    };
    console.log(JSON.stringify({ resource: [CrawlSettings] }));
    const response = await fetch('https://vltapi.com/api/v2/merchcomb/_table/crawl_setting', requestOptions);
    const userr = await response.json();
    if (userr.hasOwnProperty('error')) {
      return {data :userr, result:'error'};
    } else {
      return {data :userr, result:'success'};
    }
    // await fetch(this.LoginURL, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {return(data);})
    //   .catch(err => {return(err);});

  }


  async SignOutUser(){
  
    
    const response = await fetch(this.LoginURL, { method: 'DELETE' });
    return {response};
   
    // await fetch(this.LoginURL, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {return(data);})
    //   .catch(err => {return(err);});

  }


  CheckLocalUser(){
    return new Promise( resolve =>{
      browser.storage.local.get('userinfo', function (response) {
        if(browser.runtime.lasteError) resolve({userinfo:{}});

        resolve(response.userinfo === undefined ? 
          {userinfo: {}}:
          {userinfo: response.userinfo}
        );


      });

    });


  }




}

export default WebCombRoutes;