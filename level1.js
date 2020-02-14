//input
var level1 = "100000  ATIVO             1000  300   500   1200"
+"\n"+"110000  ATIVO CIRCULANTE  500   100   200   600"
+"\n"+"111000  DISPONIVEL        200   100   50    150"
+"\n"+"200000  PASSIVO           800   250   450   1000";

//separates the lines from the input 
function rows(text) {
    var rows = text.split("\n");
    return rows; 
}

//checks if is a number
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//string into a collection
function data(){

    var rows = this.rows(this.level1); 
    var r= []; 
    
    for (let index = 0; index < rows.length; index++) {
        //split line from the white spaces
        var result = rows[index].split(/\ +/);
        
        //checks if the description has one or two words
        if (isNumber(result[2])) {
            classifier = result[0]; 
            description = result[1]; 
            openingBalance = result [2]; 
            debit = result[3]; 
            credit = result[4];
            finalBalance = result[5]; 
            parent = null; 
        } else {
            classifier = result[0]; 
            description = result[1] + ' ' + result[2]; 
            openingBalance = result [3]; 
            debit = result[4]; 
            credit = result[5];
            finalBalance = result[6]; 
            parent = null; 
        }
        
        var map = new Map(); 


        map.set("description", description);   
        map.set("classifier", classifier);   
        map.set("openingBalance", openingBalance);   
        map.set("debit", debit);   
        map.set("credit", credit);   
        map.set("finalBalance", finalBalance);   
        map.set("parent", parent);
        
        //add the map to an array
        r[index] = map; 
    }

    return r; 
}

r = data(level1); 
//shows the result on the console
console.log(r);