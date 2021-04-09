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
    words: { // Words displayed into the countdown
            days: { singular: ' dia', plural: ' dies' },
            hours: { singular: ' hora', plural: ' hores' },
            minutes: { singular: ' minut', plural: ' minuts' },
            seconds: { singular: ' segon', plural: ' segons' }
           },
    plural: true, // Use plurals
    inline: true, // Set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
    inlineClass: 'simply-countdown-inline', // Inline css span class in case of inline = true
                                            // In case of inline set to false
    enableUtc: false, // Use UTC or not - default : false
    onEnd: function() { return }, // Callback on countdown end, put your own function here
    refresh: 1000, // Default refresh every 1s
    sectionClass: 'simply-section', // Section css class
    amountClass: 'simply-amount', // Amount css class
    wordClass: 'simply-word', // Word css class
    zeroPad: false,
    countUp: false
});

// Funció que obté els valors entrats a el formulari HTML, i que amb els mateixos inicialitza un objecte data que el passarem al 
// navegador (POST) a una ruta determinada (/api) indicant que el body (cos) del document serà tipus JSON.
function RegistreFamilia() {
   const nomFamilia = document.getElementById("nom-familia");
   const numMembres = document.getElementById("num-membres");
   
   if (nomFamilia.value === "") {
       alert("Upps!... No has omplert els camps!");   
   } else {
       const paginaReg = window.open("","nomFamilia.value, numMembres.value","top=300,left=700,width=350,height=270,toolbar=no,resizable=no"); 
       
       paginaReg.document.write("<title>Inscripció Fideuà 2021 (Escola Mireia)</title><body style=background-color:white;><h3 style=font-family:Verdana;text-align:center;color:green;>Inscripció realitzada correctament!</h3><hr style=height:5px;color:black;background-color:grey;border-width:0px;><span style=font-family:Verdana;font-weight:bold;>Nom família: </span>" +
                               nomFamilia.value + "<br><span style=font-family:Verdana;font-weight:bold;>Nombre de persones: </span>" + numMembres.value +
                               "<br><hr style=height:15px;color:grey;background-color:grey;border-width:0px;><center><input type=button value=Dacord onclick=window.close();><h5 style=font-family:Verdana;text-align:center;color:grey;>Fideuà 2021 Escola Mireia de Barcelona</h5></center></body>"                        
                               );
   
   // Capturo les dades del formulari HTML, les inicialitzo en un objecte tipus JSON i ho indico en el fetch.
   const NomFamilia = nomFamilia.value;
   const NumMembres = numMembres.value;
   const data = { NomFamilia, NumMembres};
   const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   };
   fetch('/api', options);
   
   EsborraFormulari(); // Elimino les dades entrades al formulari (perque quedi net).
   location.reload(); // Refresco la pàgina HTML per reflexar el registre acabat d'entrar (i no haver d'esperar a que es recarregui la pàgina).
   PintaDades(); // Mostro les dades per pantalla HTML.       
   }
 }

function EsborraFormulari() {
    let nomFamiliaInput = document.getElementById("nom-familia");
    let numMembresInput = document.getElementById("num-membres");
        
    let nomFamilia = "";
    let numMembres = "";
    
    nomFamiliaInput.value = nomFamilia;
    numMembresInput.value = numMembres;
}

// Funció que mostra en una posició-zona de la pàgina HTML el contingut
// de la BBDD documental (fitxer 'fideua2021').
async function PintaDades() {
    const response = await fetch('/api'); // Busco el que hi ha a la ruta /api i ho coloco a la constant response.
    const data = await response.json(); // Creo la const data amb el contingut de response que li dic que serà del tipus objecte dades json.
    const itemList = document.getElementById("mostra-familia"); // Creo constant que té la posició el tag HTML (identificador) on es mostrarán les dades.
    
    // Recorro el array d'objectes json i els vaig passant (DOM) per pantalla HTML.
    for (item of data) {
       itemList.innerHTML += item.NomFamilia + " (" + item.NumMembres + ")" + "<br>";    
    }
}