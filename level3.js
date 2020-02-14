var level1 = "100000  ATIVO             1000  300   500   1200"+"\n"+"110000  ATIVO CIRCULANTE  500   100   200   600"
+"\n"+"111000  DISPONIVEL        200   100   50    150"+"\n"+"200000  PASSIVO           800   250   450   1000";

var level2 = "1				  ATIVO							1.120.807,67D		527.081,41					464.716,15			1.183.172,93D" 
+"\n" +"1.1				     Ativo Circulante							130.288,57D		527.081,41					464.716,15			192.653,83D"					
+"\n" +"1.1.1				        Caixa							4.000,98D		104.653,71					108.648,69			6,00D"
+"\n" +"1.1.1.01				           Caixa							4.000,98D		104.653,71					108.648,69			6,00D";					

var level3 = "Balancete Contábil									Pág.: 1 de 3"
+"\n" + "Empresa: Space Exploration Technologies Corp. - CNPJ: 99.999.999/9999-99									Software Contábil"
+"\n" +"Período: 01/01/2018 a 31/01/2018; Estabelecimento(s): Todos; Centro(s) de Resultados: Todos"									
+"\n" + "Conta	Descrição		Saldo Anterior		Débitos	Créditos			Saldo Atual"
+"\n" +"1	*** Ativo ***	82997,66	D		247726,89	240377,5		90347,05	D"
+"\n" +"11	Ativo Circulante	32573,59	D		247726,89	239574,01		40726,47	D"
+"\n" +"111	Disponível	24059,92	D		200259,03	187061,24		37257,71	D"
+"\n" +"11101	Caixa Geral	3758,78	D		145995,84	146317,86		3436,76	D"
+"\n" +"111010001	Caixa Fixo	3758,78	D		145995,84	146317,86		3436,76	D"
+"\n" +"11102	Depósitos Bancários à Vista	19316,93	D		54213,19	40743,38		32786,74	D";

// divides text into lines ignoring  the header
function rows(text) {
    var rows = text.split("\n");
    var cont = 0; 
    var result = []; 

    for (let index = 0; index < rows.length; index++) {
        if (isNumber(rows[index].substring(0,1)) && rows[index] != "\n") {
            result[cont] = rows[index];
            cont++;  
        }
    }
    return result; 
}

//checks if is a number
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//check if there is a number
function haveNumber(n){
    const regex = /[0-9]/;
    return regex.test(n);
}

//string into a collection
function data(data){
    var rows = this.rows(data); 

    var r= []; 
    for (let index = 0; index < rows.length; index++) {
        //split line from the white spaces
        const regexWhiteSpace = /\s+/g;
        var result = rows[index].replace(/\*([^\*]+?)\*(?!\*)/, "");
        var result = rows[index].replace(regexWhiteSpace, "split")
        result = result.split("split");

        if (haveNumber(result[2])) {
            classifier = result[0].replace(/[^\d]+/g,'');
            description = result[1]; 
            openingBalance = result[2].replace(/[^\d]+/g,''); 
            debit = result[3]; 
            credit = result[4];
            finalBalance = result[5].replace(/[^\d]+/g,''); ; 
            if (result[6] == undefined){
                parent = null; 
            } else {
                parent = result[6];
            }
        } else {
            classifier = result[0].replace(/[^\d]+/g,'');
            description = result[1] + ' ' + result[2]; 
            openingBalance = result[3].replace(/[^\d]+/g,''); ; 
            debit = result[4]; 
            credit = result[5];
            finalBalance = result[6].replace(/[^\d]+/g,''); 
            if (result[7] == undefined){
                parent = null; 
            } else {
                parent = result[7];
            }
        }
        
        var map = new Map(); 

       //converts values ​​to float
       map.set('description', description);   
       map.set('classifier', classifier);   
       map.set('openingBalance', parseFloat(openingBalance.replace(",",'.')));   
       map.set('debit', parseFloat(debit.replace(",",".")));   
       map.set('credit', parseFloat(credit.replace(",",".")));   
       map.set('finalBalance', parseFloat(finalBalance.replace(",",".")));   
       map.set('parent', parent);
       
       //add the map to an array
       r[index] = map; 
    }
    return r; 
}

r = data(level2); 
//shows the result on the console
console.log(r);