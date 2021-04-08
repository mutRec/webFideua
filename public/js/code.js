// Llibreria utilitzada per colocar el contador.
// #contador és l'identificador que faig servir a l'html per tal de colocar-lo on vulgui a la pàgina.
// Aquest procediment inicialitza les opcions disponibles pel contador.
simplyCountdown('#contador', {
    year: 2021, // required
    month: 5, // required
    day: 29, // required
    hours: 13, // Default is 0 [0-23] integer
    minutes: 30, // Default is 0 [0-59] integer
    seconds: 00, // Default is 0 [0-59] integer
    words: { //words displayed into the countdown
            days: { singular: ' dia', plural: ' dies' },
            hours: { singular: ' hora', plural: ' hores' },
            minutes: { singular: ' minut', plural: ' minuts' },
            seconds: { singular: ' segon', plural: ' segons' }
           },
    plural: true, // use plurals
    inline: true, // set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
    inlineClass: 'simply-countdown-inline', // inline css span class in case of inline = true
                                            // in case of inline set to false
    enableUtc: false, // Use UTC or not - default : false
    onEnd: function() { return }, // Callback on countdown end, put your own function here
    refresh: 1000, // default refresh every 1s
    sectionClass: 'simply-section', //section css class
    amountClass: 'simply-amount', // amount css class
    wordClass: 'simply-word', // word css class
    zeroPad: false,
    countUp: false
});

function RegistreFamilia() {
   var nomFamilia = document.getElementById("nom-familia");
   var numMembres = document.getElementById("num-membres");
   
   if (nomFamilia.value === "") {
       alert("Upps!... No has omplert els camps!");   
   } else {
       var paginaReg = window.open("","nomFamilia.value, numMembres.value","top=300,left=700,width=350,height=270,toolbar=no,resizable=no"); 
       
       paginaReg.document.write("<title>Inscripció Fideuà 2021 (Escola Mireia)</title><body style=background-color:white;><h3 style=font-family:Verdana;text-align:center;color:green;>Inscripció realitzada correctament!</h3><hr style=height:5px;color:black;background-color:grey;border-width:0px;><span style=font-family:Verdana;font-weight:bold;>Nom família: </span>" +
                                 nomFamilia.value + "<br><span style=font-family:Verdana;font-weight:bold;>Nombre de persones: </span>" + numMembres.value +
                                 "<br><hr style=height:15px;color:grey;background-color:grey;border-width:0px;><center><input type=button value=Dacord onclick=window.close();><h5 style=font-family:Verdana;text-align:center;color:grey;>Fideuà 2021 Escola Mireia de Barcelona</h5></center></body>"                        
                                 );
       //aqui és on hauré d'enregistrar i guardar permanentment les dades en un fitxer
       //o a la bbdd documental. De moment, les mostro per pantalla.
      // document.getElementsById("mostra-familia").innerHTML = "-" + nomFamilia.value;
      // document.getElementById("mostra-num-membres").innerHTML = " (" + numMembres.value + ")";
      }

   //capturo i busco (fetch) les dades de formulari.
   var nf = nomFamilia.value;
   var nm = numMembres.value;
   const data = { nf, nm};
   const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   };
   fetch('/api', options);
   
   EsborraFormulari();
   location.reload();
   PintaDades();
 }

function EsborraFormulari() {
    var nomFamiliaInput = document.getElementById("nom-familia");
    var numMembresInput = document.getElementById("num-membres");
        
    var nomFamilia = "";
    var numMembres = "";
    
    nomFamiliaInput.value = nomFamilia;
    numMembresInput.value = numMembres;
}

// Funció que retorna tot el contingut de la taula inscrits de la BBDD documental fideua2021.
async function PintaDades() {
    const response = await fetch('/api');
    const data = await response.json();
    
    var itemList = document.getElementById("mostra-familia");
    console.log(data);
    for (item of data) {
         //console.log(item);        
        itemList.innerHTML += item.nf + " (" + item.nm + ")" + "<br>";    
    }
}
