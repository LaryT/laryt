var pinakas =[1,2,3,4,5,6,7,8,9,10,
1,2,3,4,5,6,7,8,9,10],
			akalyptes = 0,
			ready=true,
			mylistener = null,
			teleytaiaKarta = [],
      pinakasLogos = [],
      pinakasNameLogos = [],
      pinakasBathmoi = [];
			

//---- var dockey="0AjrqMWGJ6suYdFJ4VXJjZzFSUjlMZ0QxZkJKQzRtWkE";

var kartaTPL = function(TPL, kartaName){
	var template = TPL.format(kartaName, kartaName);
	return template;
}

String.prototype.format = function(){
  var args = arguments;

 var strReturn = this.replace(/{(\d+)}/g, function(match, number){

    return typeof args[number] != 'undefined' ? args[number] : match;
  });
   //alert(arguments[1]);
  var myImgStr= pinakasLogos[arguments[1]-1];
  myImgStr = myImgStr.replace("/s36/","/s144/");
  strReturn = strReturn.replace("https://lh3.googleusercontent.com/-hJ2A6vZjctI/UJJRufMHhAI/AAAAAAAAvsw/v2eS0QoSYNM/s125/eskanaLogoTrans200.png",myImgStr);
  strReturn = strReturn.replace("Πίσω", pinakasNameLogos[arguments[1]-1]);
  strReturn = strReturn.replace("Επικεφαλίδα", pinakasNameLogos[arguments[1]-1] + ", " + pinakasBathmoi[arguments[1]-1]);

  return strReturn;
}


var anakatepsePinaka = function(array){
	for(var i=array.length-1; i>0; i--){
		var j = Math.floor(Math.random() * (i+1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

var kaneKartes = function (ypodoxeas, theTPL){
	pinakas = anakatepsePinaka(pinakas);
	for(var i=0;i<pinakas.length;i++){
		ypodoxeas.innerHTML+=kartaTPL(theTPL, pinakas[i]);
	}

	console.log(pinakas);

}

function paixnidi(){

  document.getElementById("kartes").innerHTML='';
	var match = document.getElementById("kartes"),
	myTPL = document.getElementById("kartaProtypo").innerHTML;

	kaneKartes(match, myTPL);
}


var setFixed = function(karta){
	karta.className="fixed";
	karta.removeChild(karta.childNodes[1]);
	karta.onclick=null;

}

var checkRules = function(karta){

	if(teleytaiaKarta.id == karta.id){
		setFixed(karta);
		setFixed(teleytaiaKarta);
	}else{
		karta.classList.toggle("flipped");
		teleytaiaKarta.classList.toggle("flipped");
	}
	karta.removeEventListener("transitionend",mylistener,false);
	akalyptes=0;
	ready=true;
}

paixnidi.gyrnaKarta = function(karta){

	if(teleytaiaKarta!=karta && akalyptes<2 && ready){
		karta.classList.toggle("flipped");
		akalyptes++;

		if(akalyptes==2){
			ready=false;
			mylistener = function() {checkRules(karta)};
			karta.addEventListener("transitionend", mylistener,false);

		}else{
			teleytaiaKarta = karta;

		}
	}

}


//----------
//----------



function loadCategories(dockey){

//  alert(dockey);
  var myURLfeedTab1 = "https://docs.google.com/spreadsheet/ccc?key="+ dockey +"&gid=6&headers=1";
  var queryTab1 = new google.visualization.Query(myURLfeedTab1);

 var strQTab1='select E, H';

  
  queryTab1.setQuery(strQTab1);   
  queryTab1.send(handleQueryResponseTab1); 

}

function handleQueryResponseTab1(response) {
 document.getElementById("divIDTab1").innerHTML = ''; 
 if (response.isError()) {
    alert('Error in query_members: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
 }

 var data = response.getDataTable();
 var posesEggrafes = data.getNumberOfRows();
 var html4group2 =[]; 

// alert('test ' + posesEggrafes);

//------- mpoliasma
 if(posesEggrafes > 0) {
    html4group2.push(' Κατηγορία : ');
    html4group2.push('<select id="query-category-rosters" onchange="createSelectionForTeamsCategories(this.value)">');
    html4group2.push('<option value="">Επιλογή Κατηγορίας...</option>');
    for (var row = 2; row < posesEggrafes; row++) {
      html4group2.push('<option value="'+data.getFormattedValue(row, 1)+'">'+data.getFormattedValue(row, 0)+'</option>');  
    }
    html4group2.push('</select>');
    document.getElementById("myTitleID").innerHTML = html4group2.join('');
  }
}


function createSelectionForTeamsCategories(mySelectedCategory) {

  document.getElementById("divIDTab1").innerHTML = '<img src="https://lh3.googleusercontent.com/-zISmF0i4SbU/UCiI5UIpV-I/AAAAAAAAq8o/a6iqS-tKbI8/s800/loading.gif" />';
  
    console.log(mySelectedCategory);

  var queryTheTeamsInCategory = new google.visualization.Query(mySelectedCategory);

// AF= ONOMA, AV=src logo, AI=baumoi, AE Θέση, AJ Αγώνες, ΑΜ =Νίκες, ΑΝ = ΗΤΤΕΣ, AP=Epi, AQ Am
  var strQ='select AF, AV, AI, AE, AJ, AM, AN, AP, AQ where AI >= 0 ';

 queryTheTeamsInCategory.setQuery(strQ);   
 queryTheTeamsInCategory.send(handleQueryResponseTab1_TeamLogos);

}

function handleQueryResponseTab1_TeamLogos(response) {
    if (response.isError()) {
       alert('Error in query_members: ' + response.getMessage() + ' ' + response.getDetailedMessage());
       return;
  }
  var data = response.getDataTable();
  var posesEggrafes = data.getNumberOfRows();

   //--  fillPinakasWithValues
      
    pinakas.length=0;

    for(var i = 0; i < posesEggrafes*2; i++){
      pinakas[i] = (i % posesEggrafes) +1;
    }
    for(var i = 0; i < posesEggrafes; i++){
        pinakasLogos[i] = data.getFormattedValue(i, 1);
        pinakasNameLogos[i] = data.getFormattedValue(i, 0);
        pinakasBathmoi[i] = "Στην " + data.getFormattedValue(i, 3) + "η Θέση με " + data.getFormattedValue(i, 2) + " βαθμούς σε " + data.getFormattedValue(i, 4) +" αγώνες, με ";
        pinakasBathmoi[i] +=  data.getFormattedValue(i, 5) + " | " + data.getFormattedValue(i, 6) + " (Ν|Η) και " + data.getFormattedValue(i, 7) +":" + data.getFormattedValue(i, 8) + " (Επ:Αμ)"
    }
    console.log(pinakasLogos);
    console.log(pinakasNameLogos);
    console.log(pinakasBathmoi);

    document.getElementById("divIDTab1").innerHTML = '';
    var paixe = new paixnidi();
}
