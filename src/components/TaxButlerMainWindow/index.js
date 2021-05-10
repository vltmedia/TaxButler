import React from 'react';
import * as browser from 'webextension-polyfill';

class TaxButlerMainWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      NameToFind: '',
      taxbutlerAmazon: {},
      taxbutlerPaypal: {}
    };
    this.ProcessAmazon = this.ProcessAmazon.bind(this);
    this.ProcessPaypal = this.ProcessPaypal.bind(this);
    this.SetEmail = this.SetEmail.bind(this);
    this.SetPassword = this.SetPassword.bind(this);
    this.ClearCache = this.ClearCache.bind(this);
    this.DownloadAmazonJson = this.DownloadAmazonJson.bind(this);
    this.DownloadPaypalJson = this.DownloadPaypalJson.bind(this);
    this.DownloadCombinedJson = this.DownloadCombinedJson.bind(this);
    this.GetOrderType = this.GetOrderType.bind(this);
    this.SetCategories = this.SetCategories.bind(this);
    this.SetCategoriesQuiet = this.SetCategoriesQuiet.bind(this);
    this.SetCategoriesRegular = this.SetCategoriesRegular.bind(this);

    this.PCPart = ["Windows", "USB", "Mac", "DRAM", "DDR4", "Noctua", "Fan", "Processor", "Motherboard", "LGA1", "HDMI", "Raspberry", "Breadboard", "Cable", "Arduino", "Threaded", "Brass", "Solder", "OLED"
    , "Smooth-On", "LED", "Battery", "Fastener", "Magnet", "Electric wire", "Soldering", "5V", "12V","3V","3.3V", "3D Printer", "Printer", "M5", "M6", "RGB", "Mouse", "M6", "trash"];
    this.HomeOffice = ["Home Office", "Office", "Solder", "Pen", "Light Bulb", "Outlet", "Paper", "A4", "Bento", "Bowls", "Glasses"];
    this.LivingExpenses = ["Olive Oil", "Forehad", "Nails", "Plant", "Goldfish", "Cofee", "AT&T", "Home Depot", "Magic Candle Company"];
    this.VideoGames = ["Steam", "Xbox", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "Electronic Arts", "Sony Interactive", "Facebook", "Humble Bundle"];
    this.ProductionAsset = ["Envato", "Turbo", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "CG Cookie", "DTS", "Gumroad", "DAZ", "Google" , "Ableton AG", "VB-Audio Software"];
    this.ProductionSubscription = ["Otoy", "Unity", "Epic", "Nintendo", "Sony", "Nintendo Switch", "Resilio", "Derivative", "Simplify", "Adobe", "Rebrandly", "WakaTime", "Paddle.com" ,"GitHub", "A2 Hosting", "Pluralsight"];
    this.PCHardDrive = ["SSD", "HDD", "3.5", "2.5", "SDSSA"];
  }
  componentDidMount() {
    browser.storage.local.get('taxbutler').then(result => {
      console.log(result);

      browser.storage.local.get('taxbutlerpaypal').then(resultt => {
        this.setState({ taxbutlerPaypal: resultt });

        console.log(resultt);

        browser.storage.local.get('taxbutleramazon').then(amazon => {
          this.setState({ taxbutlerAmazon: amazon });
          console.log(amazon);
          // console.log(JSON.parse(result));
        });
        // console.log(JSON.parse(result));
      });
      // console.log(JSON.parse(result));
    });
  }

  GetOrderType(title){
    var typee = "Undefined";
    this.PCPart.forEach(word => {
        if(title.includes(word)){
            typee = "PCPart";
        }
    });
    this.HomeOffice.forEach(word => {
        if(title.includes(word)){
            typee = "HomeOffice";
        }
    });
    this.PCHardDrive.forEach(word => {
        if(title.includes(word)){
            typee = "PCHardDrive";
        }
    });
    this.LivingExpenses.forEach(word => {
        if(title.includes(word)){
            typee = "LivingExpenses";
        }
    });
    this.VideoGames.forEach(word => {
        if(title.includes(word)){
            typee = "VideoGames";
        }
    });
    this.ProductionAsset.forEach(word => {
        if(title.includes(word)){
            typee = "ProductionAsset";
        }
    });
    this.ProductionSubscription.forEach(word => {
        if(title.includes(word)){
            typee = "ProductionSubscription";
        }
    });
    return typee;
}

SetCategories(quiet){
  browser.storage.local.get('taxbutlerpaypal').then(paypal => {
    for(var i =0 ; i < paypal.taxbutlerpaypal.Orders.length - 1; i++){
      var order = paypal.taxbutlerpaypal.Orders[i];
      var newcategory = order.Category;

      for(var item =0 ; item < paypal.taxbutlerpaypal.Orders.length - 1; item++){
        var ItemSelected = order.Items[item];
        try{
          newcategory = this.GetOrderType(ItemSelected.Title);
          order.Category = newcategory;

        console.log(newcategory);
        }catch{

        }
  
  
      }
    

    }
    if(!quiet){
    browser.storage.local.set({ taxbutlerpaypal: paypal.taxbutlerpaypal }).then(()=>{console.log("Updated!"); alert("Updated!");}).catch(err=>{console.log("Failed!", err);alert("Failed!", err);});
    }else{
    browser.storage.local.set({ taxbutlerpaypal: paypal.taxbutlerpaypal }).then(()=>{console.log("Updated!");}).catch(err=>{console.log("Failed!", err);});

    }
  });

}
  SetEmail() {
    // this.setState({ email: e.target.value });
  }
  SetCategoriesQuiet() {
    this.SetCategories(true);
    // this.setState({ email: e.target.value });
  }
  SetCategoriesRegular() {
    this.SetCategories(false);
    // this.setState({ email: e.target.value });
  }
  DownloadAmazonJson() {
    browser.storage.local.get('taxbutleramazon').then(amazon => {
      this.setState({ taxbutlerAmazon: amazon });
      console.log(amazon);
      // console.log(JSON.parse(result));
      var a = document.createElement('a');
      var file = new Blob([JSON.stringify(amazon.taxbutleramazon, null, 2)], {
        type: 'text/plain'
      });
      a.href = URL.createObjectURL(file);
      a.download = 'TaxButler-AmazonOrders.json';
      a.click();
    });
  }
  
  DownloadPaypalJson() {
    browser.storage.local.get('taxbutlerpaypal').then(paypal => {
      this.setState({ taxbutlerPaypal: paypal });
      // for(var i =0 ; i < paypal.taxbutlerpaypal.Orders.length - 1; i++){
      //   var order = paypal.taxbutlerpaypal.Orders[i];
      //   var newcategory = order.Category;
  
      //   for(var item =0 ; item < paypal.taxbutlerpaypal.Orders.length - 1; item++){
      //     var ItemSelected = order.Items[item];
      //     try{
      //       newcategory = this.GetOrderType(ItemSelected.Title);
      //       order.Category = newcategory;
  
      //     // console.log(newcategory);
      //     }catch{
  
      //     }
    
    
      //   }
      
  
      // }
      console.log(paypal);
      // console.log(JSON.parse(result));
      var a = document.createElement('a');
      var file = new Blob([JSON.stringify(paypal.taxbutlerpaypal, null, 2)], {
        type: 'text/plain'
      });
      a.href = URL.createObjectURL(file);
      a.download = 'TaxButler-PaypalOrders.json';
      a.click();
    });
  }



  DownloadCombinedJson() {
    var OutOrders = {
      Orders: this.state.taxbutlerAmazon.taxbutleramazon.Orders
    };
    for(var i = 0; i < this.state.taxbutlerPaypal.taxbutlerpaypal.Orders.length - 1 ; i ++){
      OutOrders.Orders.push(this.state.taxbutlerPaypal.taxbutlerpaypal.Orders[i]);

    }

  
    // console.log(JSON.parse(result));
    var a = document.createElement('a');
    var file = new Blob([JSON.stringify(OutOrders, null, 2)], {
      type: 'text/plain'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'TaxButler-CombinedOrders.json';
    a.click();
  }
  SetPassword(e) {
    this.setState({ password: e.target.value });
  }
  ProcessAmazon() {
    browser.storage.local
      .get('taxbutleramazon')
      .then(amazon => {
        this.setState({ taxbutlerAmazon: amazon });
        console.log(amazon);
        // console.log(JSON.parse(result));
        console.log('this.state.taxbutlerAmazon ', amazon);

        // browser.runtime.sendMessage({data:'test 123'});
        browser.storage.local
          .set({ 'taxbutler-name': this.state.NameToFind })
          .then(() => {
            browser.runtime.sendMessage({
              data: {
                crawler: 'Amazon',
                command: 'ProcessPage',
                name: this.state.NameToFind,
                loadData: JSON.stringify(amazon)
              }
            });
          })
          .catch(() => console.log('Failed Setting Name'));
      })
      .catch(() => console.log('Failed Setting taxbutleramazon'));

    // browser.runtime.sendMessage({data:'test 123'});
    // this.props.LoginClick({data: {email :this.state.email, password:this.state.password }});
  }
  ClearCache() {
    // browser.runtime.sendMessage({data:'test 123'});

    browser.runtime.sendMessage({
      data: { command: 'ClearCache', name: this.state.NameToFind }
    });

    // browser.runtime.sendMessage({data:'test 123'});
    // this.props.LoginClick({data: {email :this.state.email, password:this.state.password }});
  }
  ProcessPaypal() {
    // browser.runtime.sendMessage({data:'test 123'});
    browser.storage.local
      .get('taxbutlerpaypal')
      .then(resultt => {
        this.setState({ taxbutlerAmazon: resultt });
        browser.storage.local
          .set({ 'taxbutler-name': this.state.NameToFind })
          .then(() => {
            browser.runtime.sendMessage({
              data: {
                crawler: 'Paypal',
                command: 'ProcessPage',
                name: this.state.NameToFind,
                loadData: JSON.stringify(resultt)
              }
            });

            console.log('Set Name');
          })
          .catch(() => console.log('Failed Setting Name'));
      })
      .catch(() => console.log('Failed Setting taxbutlerpaypal'));
  }

  render() {
    // let devbutton = <div></div>;

    // if(this.props.showdev == true){
    //   devbutton = <button type="submit" onClick={this.ProcessAmazonDebug}>Login Dev</button>;
    // }

    return (
      <div>
        <div className="container">
          <input
            onChange={e => this.setState({ NameToFind: e.target.value })}
            placeholder="John Smith"
          />
          <button onClick={this.ProcessAmazon}>Process Amazon Page</button>
          <button onClick={this.ProcessPaypal}>Process Paypal Page</button>
          <button onClick={this.SetCategoriesRegular}>Update Categories</button>

          <button onClick={this.DownloadAmazonJson}>
            Download Amazon Orders Json
          </button>
          <button onClick={this.DownloadPaypalJson}>
            Download Paypal Orders Json
          </button>
          <button onClick={this.DownloadCombinedJson}>
            Download Combined Orders Json
          </button>
          <button onClick={this.ClearCache}>Clear Cache</button>
        </div>
      </div>
    );
  }
}
export default TaxButlerMainWindow;
