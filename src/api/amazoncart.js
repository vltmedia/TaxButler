

class AmazonOrdersCrawler {
    
    constructor(props){
        // this.LocalStorageCacheKey = this.LocalStorageCacheKey;
        this.LocalStorageCacheKey = "taxbutler";
        this.SetTaxButlerCache = this.SetTaxButlerCache.bind(this);

        this.chosenPieces = [];
        this.chosenPrices = [];
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

        this.CheckBoxForName = this.CheckBoxForName.bind(this);
        this.GetOrderType = this.GetOrderType.bind(this);
        this.CalculateOverallPayments = this.CalculateOverallPayments.bind(this);
        this.downloadCurrentJson = this.downloadCurrentJson.bind(this);
        this.CheckForCurrentOrderId = this.CheckForCurrentOrderId.bind(this);
    }
    
    
    
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
            if(loadedData.taxbutleramazon.Orders != undefined){
            // var obj = JSON.parse(taxbultercache);
            var obj = loadedData.taxbutleramazon;
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
    CheckForCurrentOrderId(orderId){

        // var orderId = "12lk3jlkjfhkl";
        for(var i = 0; i < this.OutUserDicts.Orders.length - 1; i ++){
            var order = this.OutUserDicts.Orders[i];

            if(order.Vendor == "Amazon" ){
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
    CheckBoxForName( name){

        var orders = document.getElementsByClassName("order");
        for(var i = 0; i < orders.length - 1; i ++){
            var order = orders[i];
        // orders.forEach(order=>{
            var boxes = order.getElementsByClassName("a-col-left");

            for(var b = 0; b < boxes.length - 1; b ++){
                var box = boxes[b];
            // boxes.forEach(box=>{
    

        var v =box.querySelectorAll(".trigger-text");
        if (v[0] != undefined){
        var pricebox =box.querySelectorAll(".a-span2");
        var price =pricebox[0].querySelectorAll(".value");

        var textt = v[0].innerText;
        var pricetextt = price[0].innerText;
        var DateArea =order.querySelectorAll(".a-span3");
        var DateAreaText =DateArea[0].querySelectorAll(".value");

        var userdict = {"User":textt, "Price" : pricetextt, "Items": [], "Date": DateAreaText[0].innerText, "OrderId": order.getElementsByTagName("bdi")[0].innerText , "Category":"None", "Vendor": "Amazon"};
        // console.log(textt,name );
        var Links =order.querySelectorAll(".a-link-normal");
        if (this.Preloaded == true){


        // this.OutUserDicts.Orders.forEach(orderr => {
        //     if(orderr.OrderId == order.getElementsByTagName("bdi")[0].innerText ){
        //         console.log("Order Exists");
        //         this.SkipOrder = true;
        //     }

        // });

        if(this.CheckForCurrentOrderId(order.getElementsByTagName("bdi")[0].innerText)){

            console.log("Order Exists");
                // this.SkipOrder = true;
        }




    }

 
    if(this.SkipOrder == false){
        Links.forEach(Link=>{
    
    if(Link.innerText != "" && Link.innerText != "Archive order" && Link.innerText != "View invoice" && Link.innerText != "View order details"  && Link.innerText != "View order details " ){
        if( this.GetOrderType(Link.innerText) !="None"){
            // console.log("WOAH ITS NOT NONE ", this.GetOrderType(Link.innerText));
            userdict.Category = this.GetOrderType(Link.innerText);
        }
        var itemdict = {"Title" :Link.innerText, "Link" : Link.href, "Category": this.GetOrderType(Link.innerText)}
        
        userdict.Items.push(itemdict);

    
    }
    });
    if(name != ""){
        if (textt == name){

        this.chosenPieces.push(box);
        this.chosenPrices.push(price);
        this.OutUserDicts.Orders.push(userdict);

    }
    }else{

        this.chosenPieces.push(box);
        this.chosenPrices.push(price);
        this.OutUserDicts.Orders.push(userdict);


    }
        }

    }
        }
        // );

    }
    this.SaveTaxButlerCache();
    // this.downloadJson(JSON.stringify(this.OutUserDicts, null, 2), 'AmazonOrders.json', 'text/plain');

        console.log(this.OutUserDicts);
    return(this.OutUserDicts);
}
}
function done(data) {
    var msg = { command: 'processdone', result: 'Amazon-PageProcess', data: data};
    chrome.runtime.sendMessage(msg);
}

function Main(){
  

console.log(previousdata);
console.log(loadedData.taxbutleramazon);


try{
var AmazonOrdersCrawler_ = new AmazonOrdersCrawler();
// Grab Single Person's orders on a page
done(AmazonOrdersCrawler_.CheckBoxForName(usernamee));


}catch (err){
    console.log("Failed 1");
    console.log(err);
    done(AmazonOrdersCrawler_.CheckBoxForName(usernamee));


}


// Grab all orders on a page
// AmazonOrdersCrawler_.CheckBoxForName("");

// Download Amazon Json
// AmazonOrdersCrawler_.downloadCurrentJson( 'AmazonOrders.json', 'text/plain');
// }
}
// localStorage.getItem("taxbutler-name")
// console.log("dfsdffdfffffffffffff");
Main();