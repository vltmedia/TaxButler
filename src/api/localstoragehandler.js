

var taxbultercache = localStorage.getItem("taxbutler_amazon");

if(taxbultercache == null){
    console.log("Taxbutler not filled");
}
else{
    console.log("Taxbutler filled");
}