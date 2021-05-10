

class PaypalOrdersCrawler {
    
    constructor(props){
        this.LocalStorageCacheKey = "taxbutler";
        this.SetTaxButlerCache = this.SetTaxButlerCache.bind(this);

        this.chosenPieces = [];
        this.chosenPrices = [];
        this.TransactionBoxes = [];
        this.Preloaded = false;
        this.SkipOrder = false;
        this.PCPart = ["Windows", "USB", "Mac", "DRAM", "DDR4", "Noctua", "Fan", "Processor", "Motherboard", "LGA1", "HDMI", "Raspberry", "Breadboard", "Cable", "Arduino", "Threaded", "Brass", "Solder", "OLED"
        , "Smooth-On", "LED", "Battery", "Fastener", "Magnet", "Electric wire", "Soldering", "5V", "12V","3V","3.3V", "3D Printer", "Printer", "M5", "M6", "RGB", "Mouse", "M6", "trash"];
        this.HomeOffice = ["Home Office", "Office", "Solder", "Pen", "Light Bulb", "Outlet", "Paper", "A4", "Bento", "Bowls", "Glasses"];
        this.LivingExpenses = ["Olive Oil", "Forehad", "Nails", "Plant", "Goldfish", "Cofee", "AT&T", "Home Depot", "Magic Candle Company"];
        this.VideoGames = ["Steam", "Xbox", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "Electronic Arts", "Sony Interactive", "Facebook", "Humble Bundle"];
        this.ProductionAsset = ["Envato", "Turbo", "PS", "Nintendo", "Sony", "Nintendo Switch", "Valve", "CG Cookie", "DTS", "Gumroad", "DAZ", "Google" , "Ableton AG", "VB-Audio Software"];
        this.ProductionSubscription = ["Otoy", "Unity", "Epic", "Nintendo", "Sony", "Nintendo Switch", "Resilio", "Derivative", "Simplify", "Adobe", "Rebrandly", "WakaTime", "Paddle.com" ,"GitHub", "A2 Hosting", "Pluralsight"];
        this.PCHardDrive = ["SSD", "HDD", "3.5", "2.5", "SDSSA"];
        this.CurrentOrder = {};
        this.SetTaxButlerCache();
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);

        // if(taxbultercache == null){
        //     console.log("Taxbutler not filled");
        // this.OutUserDicts = {"Orders" :[]};

        // }
        // else{
        // this.OutUserDicts = taxbultercache;

        //     console.log("Taxbutler filled");
        // }

        this.CheckOrders = this.CheckOrders.bind(this);
        this.GetOrderType = this.GetOrderType.bind(this);
        this.CalculateOverallPayments = this.CalculateOverallPayments.bind(this);
        this.downloadCurrentJson = this.downloadCurrentJson.bind(this);
        this.HandleSeeMoreButton = this.HandleSeeMoreButton.bind(this);
        this.StartOrderCrawl = this.StartOrderCrawl.bind(this);
        this.GetOrderInfoFromBoxes = this.GetOrderInfoFromBoxes.bind(this);
        this.GetOrderIdText = this.GetOrderIdText.bind(this);
        this.GetDateText = this.GetDateText.bind(this);
        this.GetLinkText = this.GetLinkText.bind(this);
        this.DownloadTaxButlerCache = this.DownloadTaxButlerCache.bind(this);
    }

    // SetTaxButlerCache(){
    //     var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);

    //     if(taxbultercache == null){
    //         console.log("Taxbutler not filled");f
    //     this.OutUserDicts = {"Orders" :[]};
    //     this.Preloaded = false;

    //     }
    //     else{
    //         var obj = JSON.parse(taxbultercache);
    //         console.log(obj);
    //         // this.OutUserDicts = {"Orders" :[]};
    //     this.OutUserDicts = obj;
    //     this.Preloaded = true;
    //         console.log("Taxbutler filled");
    //     }
    // }


    SetTaxButlerCache(){
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);
        // var taxbultercache = localStorage.getItem(this.LocalStorageCacheKey);

        // if(taxbultercache == null){

        if(previousdata == undefined | previousdata == null | previousdata == false | loadedData == "{}" | loadedData == {} ){
            console.log("Taxbutler not filled");
        this.OutUserDicts = {"Orders" :[]};
        this.Preloaded = false;

        }
        else{
            try{
            if(loadedData.taxbutlerpaypal.Orders != undefined){
            // var obj = JSON.parse(taxbultercache);
            var obj = loadedData.taxbutlerpaypal;
            console.log(loadedData);
            console.log(obj);
            // this.OutUserDicts = {"Orders" :[]};
        this.OutUserDicts = obj;
        this.Preloaded = true;
            console.log("Taxbutler filled");
            }else{
                console.log("Taxbutler not filled");
                this.OutUserDicts = {"Orders" :[]};
                this.Preloaded = false;

            }
        }catch (err){

            console.log(err);
            console.log("Taxbutler not filled");
            this.OutUserDicts = {"Orders" :[]};
            this.Preloaded = false;
    
        }
        }
    }



    SaveTaxButlerCache(){
        localStorage.setItem(this.LocalStorageCacheKey, JSON.stringify(this.OutUserDicts, null, 2));
        var msg = { command: 'processdone', result: 'Paypal-PageProcess' , data:this.OutUserDicts};
        chrome.runtime.sendMessage(msg);
    }
    DownloadTaxButlerCache(){
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.OutUserDicts, null, 2)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'taxbutlerpaypalOrders.json';
        a.click();
    }

    downloadJson(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    downloadCurrentJson(fileName, contentType) {
    this.CalculateOverallPayments();
        
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.OutUserDicts, null, 2)], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
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

    CalculateOverallPayments(){
        var NoneChoices = [];
        var NoneChoicesPrice = 0;
        var PCParts = [];
        var PCPartsPrice = 0;
        var HomeOfficePrice = 0;
        var PCHardDrivePrice = 0;
        var LivingExpensesPrice = 0;
        var VideoGamesPrice = 0;
        var HomeOffice = [];
        var PCHardDrive = [];
        var LivingExpenses = [];
        var VideoGames = [];
        this.OutUserDicts.Orders.forEach(orderr => {
            var Category = orderr.Category;
            var OrderPrice = parseFloat(orderr.Price.replace(/\$/g,''));
            console.log(Category);
            if(Category == "PCPart"){
                PCPartsPrice += OrderPrice;
                PCParts.push(orderr);
            }
            if(Category == "HomeOffice"){
                HomeOfficePrice += OrderPrice;
                HomeOffice.push(orderr);
            }
            if(Category == "LivingExpenses"){
                LivingExpensesPrice += OrderPrice;
                LivingExpenses.push(orderr);
            }
            if(Category == "VideoGames"){
                VideoGamesPrice += OrderPrice;
                VideoGames.push(orderr);
            }
            
            if(Category == "PCHardDrive"){
                PCHardDrivePrice += OrderPrice;
                PCHardDrive.push(orderr);
            }
            
            if(Category == "NoneChoices"){
                NoneChoicesPrice += OrderPrice;
                NoneChoices.push(orderr);
            }
            
            if(Category == "Undefined"){
                NoneChoicesPrice += OrderPrice;
                NoneChoices.push(orderr);
            }
            
            
        }
        
        );
        this.OutUserDicts.Summary = {Undefined : NoneChoices, UndefinedPrice : NoneChoicesPrice,
            PCParts : PCParts, PCPartsPrice : PCPartsPrice,
            HomeOffice : HomeOffice, HomeOfficePrice : HomeOfficePrice,
            PCHardDrive : PCHardDrive, PCHardDrivePrice : PCHardDrivePrice,
            LivingExpenses : LivingExpenses, LivingExpensesPrice : LivingExpensesPrice,
            VideoGames : VideoGames, VideoGamesPrice : VideoGamesPrice
        }

    }
    HandleSeeMoreButton(){
        var LoadMoreButton = document.getElementsByClassName("js_loadMore")[0];
        console.log("Checking for another Loading Button | Waiting 8 Seconds");
        if(document.getElementsByClassName("js_loadMore").count != 0){
            console.log("Found! another Loading Button  " );

            try{
            LoadMoreButton.click();
            }catch{
                console.log("No more Loading Buttons! " );

                this.CheckOrders();
            }


            setTimeout(

                this.HandleSeeMoreButton
             
    
              , 8000);

                

            }else{
            console.log("No more Loading Buttons! " );

                this.CheckOrders( );
            }



    }

    StartOrderCrawl(){
        this.HandleSeeMoreButton();

    }

    GetHeaderText(box){
        return box.querySelector('.counterparty-text').innerText;
    }

    GetLinkText(box){

        try{
            var payboxes = box.getElementsByClassName('halfColForPrint')[1];
        var counterparty = payboxes.getElementsByTagName('a')[0].href

            // var transactionid = payboxes[1].getElementsByClassName('ppvx_text--sm')[4].innerText;
            return counterparty;
            }catch{
                return "http://Paypal.com";
    
    
            }
    }

    GetDateText(box){
        return box.querySelector('.relative-time').innerText;
    }

    GetPriceText(box){
        try{
        box.getElementsByClassName('netAmount')[0].innerText;
        // var transactionid = payboxes[1].getElementsByClassName('ppvx_text--sm')[4].innerText;
        return box.getElementsByClassName('netAmount')[0].innerText;
        }catch{
            return "0.00";


        }
    }

    GetOrderIdText(box){
        var payboxes = this.TransactionBoxes[1].getElementsByClassName('halfColForPrint');
        var transactionid = payboxes[0].getElementsByClassName('ppvx_text--sm')[4].innerText;
        return transactionid;
    }

    GetDateText(box){
        return box.querySelector('.relative-time').innerText;
    }

    GetOrderInfoFromBoxes(){
        for(var i = 0; i < this.TransactionBoxes.length - 1; i ++){
            var box = this.TransactionBoxes[i];
            if (this.Preloaded == true){


                // this.OutUserDicts.Orders.forEach(orderr => {
                //     if(orderr.OrderId == order.getElementsByTagName("bdi")[0].innerText ){
                //         console.log("Order Exists");
                //         this.SkipOrder = true;
                //     }
        
                // });
        
                if(this.CheckForCurrentOrderId( this.GetOrderIdText(box))){
        
                    console.log("Order Exists");
                        // this.SkipOrder = true;
                }
        
        
        
        
            }

            if(this.SkipOrder == false){
            var userdict = {"User":"User", "Price" : this.GetPriceText(box), "Items": [], "Date": this.GetDateText(box), "OrderId": this.GetOrderIdText(box) , "Category":"None" , "Vendor":"Paypal"};
            // var userdict = {"User":"User", "Price" : this.GetPriceText(box), "Items": [], "Date": this.GetHeaderText(box), "OrderId": "" , "Category":"None"};
            // if( this.GetOrderType(Link.innerText) !="None"){
            //     // console.log("WOAH ITS NOT NONE ", this.GetOrderType(Link.innerText));
            //     userdict.Category = this.GetOrderType(Link.innerText);
            // }
            var itemdict = {"Title" :this.GetHeaderText(box), "Link" : this.GetLinkText(box), "Category": this.GetOrderType(this.GetDateText(box))}
            
            userdict.Items.push(itemdict);
    
            // this.GetHeaderText(box);

            this.OutUserDicts.Orders.push(userdict);
            }

        }
        this.SaveTaxButlerCache();
 
    }
    CheckForCurrentOrderId(){

        var orderId = "12lk3jlkjfhkl";
        for(var i = 0; i < this.OutUserDicts.Orders.length - 1; i ++){
            var order = this.OutUserDicts.Orders[i];

            if(order.Vendor == "Paypal" ){
        for(var v = 0; v < order.Items.length - 1; v ++){
            var itemm =  order.Items[v];
            if(itemm.OrderId == orderId){

                return true;
            }


        }
        return false;

    }


        }


    }
    CheckOrders(){
        console.log("Checking Orders");
        
        var transactionboxes = document.getElementsByClassName("transactionRow");
        var objs = [];
        for(var i = 0; i < transactionboxes.length - 1; i ++){
        var box = transactionboxes[i];
        if(!box.innerHTML.includes("dateBucketText")){
        
        
            this.TransactionBoxes.push(box);
            var linkedBlock = box.getElementsByClassName("linkedBlock")[0];
            linkedBlock.click();

         

                

            }


           
            objs.push(box);
        }
        console.log("waiting 10seconds");

        setTimeout(

            // Check objects
            this.GetOrderInfoFromBoxes
         

          , 10000);


                // var a = document.createElement("a");
                // var file = new Blob([JSON.stringify(this.OutUserDicts, null, 2)], {type: 'text/plain'});
                // a.href = URL.createObjectURL(file);
                // a.download = 'Test.json';
                // a.click();
        // console.log(transactionboxes);

   
}
}
function done(data) {
    var msg = { command: 'processdone', result: 'Paypal-PageProcess' , data:data};
    chrome.runtime.sendMessage(msg);
}


function Main(){
var PaypalOrdersCrawler_ = new PaypalOrdersCrawler();

// Grab Single Person's orders on a page
PaypalOrdersCrawler_.CheckOrders();
// done(PaypalOrdersCrawler_.OutUserDicts);
// PaypalOrdersCrawler_.StartOrderCrawl();

}

console.log(previousdata);
console.log(loadedData.taxbutleramazon);
console.log("Checking Orders");

Main();