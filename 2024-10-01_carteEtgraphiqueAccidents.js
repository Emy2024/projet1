////////////////////////////////////MAP //////////////////////////////////////

var mapAccidents = L.map('mapAccidents').setView([43.28, 1.49], 8.5);
L.tileLayer('  http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &#65372; Contenu développé par Emmanuelle Rey &#65372; Données extraites du fichier BAAC 2022'
}).addTo(mapAccidents);


var osmGeocoder = new L.Control.OSMGeocoder({
    placeholder: 'Tapez le nom d\'une commune',
    collapsed: false,
    position: 'bottomright',
    text: 'Localiser'
  });
  
  mapAccidents.addControl(osmGeocoder);
 

///////////////////////////// FETCH CONTOUR COMMUNES ///////////////////////////////


var geojsonCommunes; // pour activer le hover sur les communes

const urlCommunes31 = fetch('projet1geojson/communes-haute-garonne-586-communes-simplified.geojson')
    .then(response =>response.json())
    .then(tableauDataCommunes => {
        //console.log(tableauDataCommunes.features[0].properties.com_code)
        

       // J'ajoute l'objet geoJSON (https://leafletjs.com/reference.html#geojson)
       geojsonCommunes = L.geoJSON(tableauDataCommunes, {
            style: function (feature) {
                return {
                    "fillColor": "black",
                    "color": "white",
                    "weight": 2,
                    "opacity": 0.6,
                    "fillOpacity": 0.2,
                    "dashArray": 2.8
                };
            }

        }).addTo(mapAccidents);
    })







/////////////////////////////CONTENU DES POPUP AVEC LA FONCTION ONEACHFEATURE ///////////////////////////////

function onEachFeatureAccidents(feature, layer) {
    let popupUpConditionCol = feature.properties.col;
    if(feature.properties.col=="-1"){
        popupUpConditionCol = "non renseigné."
    } 
    else if (feature.properties.col=="1") {
        popupUpConditionCol = "deux véhicules - frontale"
    }
    else if (feature.properties.col=="2") {
        popupUpConditionCol = "deux véhicules – par l’arrière"
    }
    else if (feature.properties.col=="3") {
        popupUpConditionCol = "deux véhicules – par le coté"
    }
    else if (feature.properties.col=="4") {
        popupUpConditionCol = "trois véhicules et plus – en chaîne"
    }
    else if (feature.properties.col=="5") {
        popupUpConditionCol = "trois véhicules et plus - collisions multiples"
    }
    else if (feature.properties.col=="6") {
        popupUpConditionCol = "Autre collision"
    }
    else if (feature.properties.col=="7") {
        popupUpConditionCol = "Sans collision"
    }



    let popupUpConditionAtm = feature.properties.atm;
    if(feature.properties.atm=="-1"){
        popupUpConditionAtm = "non renseignées"
    } 
    else if (feature.properties.atm=="1") {
        popupUpConditionAtm = "normales"
    }
    else if (feature.properties.atm=="2") {
        popupUpConditionAtm = "pluie légère"
    }
    else if (feature.properties.atm=="3") {
        popupUpConditionAtm = "pluie forte"
    }
    else if (feature.properties.atm=="4") {
        popupUpConditionAtm = "neige / grêle"
    }
    else if (feature.properties.atm=="5") {
        popupUpConditionAtm = "brouillard / fumée"
    }
    else if (feature.properties.atm=="6") {
        popupUpConditionAtm = "vent fort / tempête"
    }
    else if (feature.properties.atm=="7") {
        popupUpConditionAtm = "temps éblouissant"
    }
    else if (feature.properties.atm=="8") {
        popupUpConditionAtm = "temps couvert"
    }
    else if (feature.properties.atm=="9") {
        popupUpConditionAtm = "Autre"
    }


    let popupUpConditionInt = feature.properties.int;
    if(feature.properties.int=="1"){
        popupUpConditionInt = "Hors intersection"
    } 
    else if (feature.properties.int=="2") {
        popupUpConditionInt = "Intersection en X"
    }
    else if (feature.properties.int=="3") {
        popupUpConditionInt = "Intersection en T"
    }
    else if (feature.properties.int=="4") {
        popupUpConditionInt = "Intersection en Y"
    }
    else if (feature.properties.int=="5") {
        popupUpConditionInt = "Intersection à plus de 4 branches"
    }
    else if (feature.properties.int=="6") {
        popupUpConditionInt = "Giratoire"
    }
    else if (feature.properties.int=="7") {
        popupUpConditionInt = "Place"
    }
    else if (feature.properties.int=="8") {
        popupUpConditionInt = "Passage à niveau"
    }
    else if (feature.properties.int=="9") {
        popupUpConditionInt = "Autre intersection"
    }


    let popupUpLumiere = feature.properties.lum;
    if(feature.properties.lum=="1"){
        popupUpLumiere = "Plein jour"
    } 
    else if (feature.properties.lum=="2") {
        popupUpLumiere = "Crépuscule ou aube"
    }
    else if (feature.properties.lum=="3") {
        popupUpLumiere = "Nuit sans éclairage public"
    }
    else if (feature.properties.lum=="4") {
        popupUpLumiere = "Nuit avec éclairage public non allumé"
    }
    else if (feature.properties.lum=="5") {
        popupUpLumiere = "Nuit avec éclairage public allumé"
    }


    let popupUpObstacleHeurte = feature.properties.obsm;
    if(feature.properties.obsm=="-1"){
        popupUpObstacleHeurte = "Non renseigné"
    } 
    else if (feature.properties.obsm=="0") {
        popupUpObstacleHeurte = "Aucun"
    }
    else if (feature.properties.obsm=="1") {
        popupUpObstacleHeurte = "Piéton"
    }
    else if (feature.properties.obsm=="2") {
        popupUpObstacleHeurte = "Véhicule" 
        /* popupUpObstacleHeurte = "<img src='css/images/voiture.png' alt='' style='width: 10%; heigth: 10%'>"  */
          
    }
    else if (feature.properties.obsm=="4") {
        popupUpObstacleHeurte = "Véhicule sur rail"
    }
    else if (feature.properties.obsm=="5") {
        popupUpObstacleHeurte = "Animal domestique"
    }
    else if (feature.properties.obsm=="6") {
        popupUpObstacleHeurte = "Animal sauvage"
    }
    else if (feature.properties.obsm=="9") {
        popupUpObstacleHeurte = "Autre"
    }
    

    var popupText = `
    <table>
    <tr>
    <h3 class="titreDansPopup"> Détail concernant l'accident </h3>
    </tr>
    <tr>
    <div><strong> Type de collision : </strong> ${popupUpConditionCol}</div></br> 
    </tr>
    <tr>
    <div><strong> Obstacle mobile heurté : </strong> ${popupUpObstacleHeurte} </div></br>
    </tr>
    <tr>
    <div><strong> Conditions atmosphériques : </strong> ${popupUpConditionAtm}</div></br>
    </tr>
    <tr>
    <div><strong> Intersection : </strong> ${popupUpConditionInt} </div></br>
    </tr>
    <tr>
    <div><strong> Conditions d'éclairage : </strong> ${popupUpLumiere} </div></br>
    </tr>
    </table>
`;

    layer.bindPopup(popupText, {
        closeButton: true,
        offset: L.point(0, 0),
        keepInView: true
    });
    
}







/////////////////////////////CARTE FETCH DATA : voitures  ///////////////////////////////

var iconVoitures = L.icon({
    iconUrl: 'projet1css/images/voiture.png',
    iconSize: [12, 14],
})



const urlCatVehiculesVoitures = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataCategorieVoitures =>{
    /* console.log(`Cat véhic ${dataCategorieVehicules.features[0].properties.catv}`) */
    
     let voitures = L.geoJSON(dataCategorieVoitures, {
        pointToLayer: function(feature, latlng) {
            feature.properties.catv;
            if(feature.properties.catv=="7"){
                    return L.marker(latlng, {icon: iconVoitures});
                }
        },
        onEachFeature: onEachFeatureAccidents
        }).addTo(mapAccidents)



    var elementIdVoitures = document.getElementById("voituresCheckbox");
    elementIdVoitures.addEventListener('change',clickCheckbox1)

    function clickCheckbox1() {
        if (elementIdVoitures.checked == true){
            mapAccidents.addLayer(voitures)
        } else {
            mapAccidents.removeLayer(voitures)
        }
    } 

})



/////////////////////////////CARTE FETCH DATA : véhicules utilitaires  ///////////////////////////////


var iconVehiculesUtilitaires = L.icon({
    iconUrl: 'projet1css/images/vehiculeUtilitaire.png',
    iconSize: [12, 14],
})


const urlVehiculesUtilitaires = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataCategorieVehiculesUtilitaires =>{
    /* console.log(`Cat véhic ${dataCategorieVehicules.features[0].properties.catv}`) */
    
    var vehiculesUtilitaires = L.geoJSON(dataCategorieVehiculesUtilitaires, {
        pointToLayer: function(feature, latlng) {
            vehiculesUtilitaires = feature.properties.catv;
            if(feature.properties.catv=="10"){
                    return L.marker(latlng, {icon: iconVehiculesUtilitaires});
                }
        },
        onEachFeature: onEachFeatureAccidents
        })

    var elementIdVehiculesUtilitaires = document.getElementById("vehiculesUtilitairesCheckbox");
    elementIdVehiculesUtilitaires.addEventListener('change',clickCheckbox1)

    function clickCheckbox1() {
        if (elementIdVehiculesUtilitaires.checked == true){
            mapAccidents.addLayer(vehiculesUtilitaires)
        } else {
            mapAccidents.removeLayer(vehiculesUtilitaires)
        }
    } 
})



/////////////////////////////CARTE FETCH DATA : vélos  /////////////////////////////////////////////////////////////


var iconVelo = L.icon({
    iconUrl: 'projet1css/images/velo.png',
    iconSize: [12, 14],
})



const urlCatVehiculesVelo = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataCategorieVelo =>{
    /* console.log(`Cat véhic ${dataCategorieVehicules.features[0].properties.catv}`) */
    
        var velo = L.geoJSON(dataCategorieVelo, {
        pointToLayer: function(feature, latlng) {
            velo = feature.properties.catv;
            if(feature.properties.catv=="1"){
                    return L.marker(latlng, {icon: iconVelo});
                }
        },
        onEachFeature: onEachFeatureAccidents
        })


        var elementIdVelo = document.getElementById("veloCheckbox");
        elementIdVelo.addEventListener('change',clickCheckbox1)
    
        function clickCheckbox1() {
            if (elementIdVelo.checked == true){
                mapAccidents.addLayer(velo)
            } else {
                mapAccidents.removeLayer(velo)
            }
        } 


})



/////////////////////////////CARTE FETCH DATA : scooters motos  ///////////////////////////////


var iconScootersMotos = L.icon({
    iconUrl: 'projet1css/images/scootersMotos.png',
    iconSize: [12, 14],
})


const urlCatVehiculesScootersMotos = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataCategorieMotos =>{
    /* console.log(`Cat véhic ${dataCategorieVehicules.features[0].properties.catv}`) */
    
        var scootersMotos = L.geoJSON(dataCategorieMotos, {
        pointToLayer: function(feature, latlng) {
            scootersMotos = feature.properties.catv;
            if(feature.properties.catv=="30"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
            if(feature.properties.catv=="32"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
            if(feature.properties.catv=="34"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
            if(feature.properties.catv=="2"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
            if(feature.properties.catv=="31"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
            if(feature.properties.catv=="33"){
                return L.marker(latlng, {icon: iconScootersMotos});
            }
        },
        onEachFeature: onEachFeatureAccidents
        })


        var elementIdScooters = document.getElementById("cyclomoteursScooterCheckbox");
        elementIdScooters.addEventListener('change',clickCheckbox1)
    
        function clickCheckbox1() {
            if (elementIdScooters.checked == true){
                mapAccidents.addLayer(scootersMotos)
            } else {
                mapAccidents.removeLayer(scootersMotos)
            }
        } 

})



/////////////////////////////CARTE FETCH DATA : engins déplacements perso ///////////////////////////////

var iconEnginsDeplacementsPersonnels = L.icon({
    iconUrl: 'projet1css/images/enginsDeplacementsPersonnels.png',
    iconSize: [12, 14],
})


const urlCatVehiculesEnginsDeplacementsPersonnels = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataCategorieEnginsDeplacementsPersonnels =>{
    /* console.log(`Cat véhic ${dataCategorieVehicules.features[0].properties.catv}`) */
    
        var enginsDeplacementsPersonnels = L.geoJSON(dataCategorieEnginsDeplacementsPersonnels, {
        pointToLayer: function(feature, latlng) {
            enginsDeplacementsPersonnels = feature.properties.catv;
            if(feature.properties.catv=="50"){
                return L.marker(latlng, {icon: iconEnginsDeplacementsPersonnels});
            }
            if(feature.properties.catv=="60"){
                return L.marker(latlng, {icon: iconEnginsDeplacementsPersonnels});
            }
        },
        onEachFeature: onEachFeatureAccidents
        })


        var elementIdEnginsDeplacementsPersonnels = document.getElementById("EDPCheckbox");
        elementIdEnginsDeplacementsPersonnels.addEventListener('change',clickCheckbox1)
    
        function clickCheckbox1() {
            if (elementIdEnginsDeplacementsPersonnels.checked == true){
                mapAccidents.addLayer(enginsDeplacementsPersonnels)
            } else {
                mapAccidents.removeLayer(enginsDeplacementsPersonnels)
            }
        } 

})











/////////////////////////////PARTIE DROITE : TOTAUX ///////////////////////////////



// Compte le length dans JavaScript pour Total accident

let elementIdTotalAccident = 0

const totalAccidents = fetch('projet1geojson/caracteristiquesLieuxGPS31.geojson')
.then(response => response.json())
.then(tableauAccidents =>{
    //console.log(tableauJsonAccidents.features[0].properties.Num_Acc)

    const tableau = tableauAccidents.features
    //console.log(Object.keys(tableau).length)
    elementIdTotalAccident = document.getElementById('elementIdTotalAccident').innerText=Object.keys(tableau).length

})



// Compte le length dans JavaScript pour Total personnes impliquées


let elementIdPersonnesImpliquees = 0


const totalAccidentsPersonnesImpliquees = fetch('projet1geojson/usagersGPS31.geojson')
.then(response => response.json())
.then(tableauAccidents =>{
    //console.log(tableauJsonAccidents.features[0].properties.Num_Acc)

    const tableau = tableauAccidents.features
    elementIdPersonnesImpliquees = document.getElementById('elementIdPersonnesImpliquees').innerText=Object.keys(tableau).length
    
})




// Compte le length dans JavaScript pour Total personnes impliquées


let elementIdVehiculesImpliques = 0


const totalAccidentsVehiculesImpliques = fetch('projet1geojson/vehiculesGPS31.geojson')
.then(response => response.json())
.then(tableauJsonAccidents =>{
    //console.log(tableauJsonAccidents.features[0].properties.Num_Acc)

    const tableau = tableauJsonAccidents.features
    elementIdVehiculesImpliques = document.getElementById('elementIdVehiculesImpliques').innerText=Object.keys(tableau).length
    
})




// Compte le length dans JavaScript pour Total personnes décédées


let elementIdDeces = 0


const totalDeces = fetch('projet1geojson/usagersGPS31.geojson')
.then(response => response.json())
.then(tableauDataDeces =>{
    //console.log(`Décés: ${tableauDataDeces.features[0].properties.grav}`)
    
    var sommeDeces =0;

    for (var i=0; i<tableauDataDeces.features.length;i++){
        if(tableauDataDeces.features[i].properties.grav === "2"){
            sommeDeces++
        }
    }
    //console.log(sommeDeces)
    elementIdDeces = document.getElementById('elementIdDeces').innerText=sommeDeces
    
    })

    







/////////////////////////////GRAPHIQUE PAR TRAJET/////////////////////////////// OK


// Calcul nombre d'accidents par trajets

const urlAccidentsChart = fetch('projet1geojson/usagersGPS31.geojson')
.then(response => response.json())
.then(dataAccidents31 =>{
    //console.log(dataAccidents31.features[0].properties.trajet)
    
    let sommeNonRenseigne1=0;
    let sommeNonRenseigne0=0;
    let sommeDomicileTravail=0;
    let sommeDomicileEcole = 0;
    let sommeCoursesAchats = 0;
    let sommeUtilisationPro =0;
    let sommePromenadeLoisirs=0;
    let sommeAutre =0;


    for (var i =0; i<dataAccidents31.features.length;i++){
        //console.log(dataAccidents31.features[i])  
        if (dataAccidents31.features[i].properties.trajet === "-1")
        sommeNonRenseigne1++
        if (dataAccidents31.features[i].properties.trajet === "0")
        sommeNonRenseigne0++
        if (dataAccidents31.features[i].properties.trajet === "1")
        sommeDomicileTravail++
        if (dataAccidents31.features[i].properties.trajet === "2")
        sommeDomicileEcole++
        if (dataAccidents31.features[i].properties.trajet === "3")
        sommeCoursesAchats++
        if (dataAccidents31.features[i].properties.trajet === "4")
        sommeUtilisationPro++
        if (dataAccidents31.features[i].properties.trajet === "5")
        sommePromenadeLoisirs++
        if (dataAccidents31.features[i].properties.trajet === "9")
        sommeAutre++
    }
    
    // Calcul Autre (car regroupe 2 catégories : -1 et 0)
    //var sommeNonRenseigneTotal = sommeNonRenseigne1 + sommeNonRenseigne0

    //console.log(`Calculs trajets : ${sommeNonRenseigne1} + ${sommeNonRenseigne0} + ${sommeDomicileTravail} + ${sommeDomicileEcole} + ${sommeCoursesAchats} + ${sommeUtilisationPro} + ${sommePromenadeLoisirs} + ${sommeAutre}`)
    // Calculs en pourcentages 
   


        // const labelsAccidentsTrajets = ["Domicile/Travail", "Domicile/Ecole", "Courses", "Usage pro ", "Loisirs", "Autres trajets"] 
        // const dataTrajets = [sommeDomicileTravail, sommeDomicileEcole,sommeCoursesAchats, sommeUtilisationPro,sommePromenadeLoisirs,sommeAutre]

         var options = {
            series: [
            {
              data: [
                {
                  x: 'Loisirs',
                  y: sommePromenadeLoisirs
                },
                {
                  x: 'Domicile/Travail',
                  y: sommeDomicileTravail
                },
                {
                  x: 'Usage professionnel',
                  y: sommeUtilisationPro
                },
                {
                    x: 'Autres trajets',
                    y: sommeAutre
                },
                {
                    x: 'Domicile/Ecole',
                    y: sommeDomicileEcole
                },
                {
                    x: 'Courses',
                    y: sommeCoursesAchats
                }
              ]
            }
          ],
            legend: {
            show: false
          },
          chart: {
            height: 450, 
            type: 'treemap',
            toolbar: {
                show: true,
                tools: {
                  download: false
                }
              }
          }, 
          colors: ["#FF6347"]
          };
  
          var chart = new ApexCharts(document.querySelector("#chartParTrajet"), options);
          chart.render();
        
        

      
})





/////////////////////////////GRAPHIQUE PAR CONDITION LUMIERE///////////////////////////////


//chartConditionsLum

const urlAccidentsCaracterisquesLum = fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataAccidentsLum =>{
    //console.log(dataAccidentsLum.features[0].properties)

    let sommeLum1PleinJour = 0
    let sommeLum2CrepusculeAube = 0
    let sommeLum3NuitSansEclairagePub = 0
    let sommeLum4NuitAvecEclairagePubNonAllume = 0
    let sommeLum5NuitAvecEclairagePubAllum = 0

    for (var i=0 ; i<dataAccidentsLum.features.length;i++){
       
        if(dataAccidentsLum.features[i].properties.lum =="1"){
            sommeLum1PleinJour++
        }
        if(dataAccidentsLum.features[i].properties.lum =="2"){
            sommeLum2CrepusculeAube++
        }  
        if(dataAccidentsLum.features[i].properties.lum =="3"){
            sommeLum3NuitSansEclairagePub++
        }
        if(dataAccidentsLum.features[i].properties.lum =="4"){
            sommeLum4NuitAvecEclairagePubNonAllume++
        }
        if(dataAccidentsLum.features[i].properties.lum =="5"){
            sommeLum5NuitAvecEclairagePubAllum++
        }
    }
   
    var sommeLumTOTAL = sommeLum1PleinJour + sommeLum2CrepusculeAube + sommeLum3NuitSansEclairagePub + sommeLum4NuitAvecEclairagePubNonAllume + sommeLum5NuitAvecEclairagePubAllum

    // Calculs en pourcentages 
    sommeLum1PleinJour = ((sommeLum1PleinJour/sommeLumTOTAL)*100).toFixed(0)
    sommeLum2CrepusculeAube = ((sommeLum2CrepusculeAube/sommeLumTOTAL)*100).toFixed(0)
    sommeLum3NuitSansEclairagePub = ((sommeLum3NuitSansEclairagePub/sommeLumTOTAL)*100).toFixed(0)
    sommeLum4NuitAvecEclairagePubNonAllume = ((sommeLum4NuitAvecEclairagePubNonAllume/sommeLumTOTAL)*100).toFixed(0)
    sommeLum5NuitAvecEclairagePubAllum = ((sommeLum5NuitAvecEclairagePubAllum/sommeLumTOTAL)*100).toFixed(0)

    console.log(sommeLum1PleinJour)
    console.log(sommeLum2CrepusculeAube)
    console.log(sommeLum3NuitSansEclairagePub)
    console.log(sommeLum4NuitAvecEclairagePubNonAllume)
    console.log(sommeLum5NuitAvecEclairagePubAllum)


    const labelLumChart = ["Plein jour", "Crépuscule / aube", "Nuit sans éclairage public", "Nuit avec éclairage public non allumé", "Nuit avec éclairage public allumé"]

    const dataLumChart = [sommeLum1PleinJour,sommeLum2CrepusculeAube, sommeLum3NuitSansEclairagePub,sommeLum4NuitAvecEclairagePubNonAllume,sommeLum5NuitAvecEclairagePubAllum]

    // réglages à faire ici : https://www.chartjs.org/docs/latest/charts/doughnut.html
    
   
     const data = {
        labels: labelLumChart,
        datasets: [
          {
            data: dataLumChart,
            
          }
        ],
        labels: labelLumChart
    };


    const config = {
        type: 'pie',
        data: data,
        options: {
          responsive: true,

          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: false,
              text: 'Chart.js Pie Chart'
            }
          }
        },
      };


      const DATA_COUNT = 5;
      const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
      
       // render init block
       const myChart = new Chart(
        document.getElementById('chartConditionsLum'),
        config
    );
    })
         










/////////////////////////////GRAPHIQUE PAR CONDITIONS ATMOSPHERIQUES ///////////////////////////////



const urlAccidentsConditionsAtmosph = fetch('projet1geojson/caracteristiquesLieuxGPS31.geojson')
.then(response => response.json())
.then(dataAccidentsConditionsAtmosph =>{
    //console.log(dataAccidentsConditionsAtmosph.features[0].atm)

    var conditionsAtmNonRenseigne = 0;
    var conditionsAtmNormales = 0;
    var conditionsAtmPluiesLegeres = 0;
    var conditionsAtmPluiesFortes = 0;
    var conditionsAtmNeigeGrele = 0;
    var conditionsAtmBrouillard = 0;
    var conditionsAtmVentFortTempete = 0;
    var conditionsAtmTempsEblouissant = 0;
    var conditionsAtmTempsCouvert = 0;
    var conditionsAtmAutre = 0;


    for (var i = 0; i < dataAccidentsConditionsAtmosph.features.length;i++){
        if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="1") {
            conditionsAtmNormales++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="2") {
            conditionsAtmPluiesLegeres++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="3") {
            conditionsAtmPluiesFortes++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="4") {
            conditionsAtmNeigeGrele++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="5") {
            conditionsAtmBrouillard++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="6") {
            conditionsAtmVentFortTempete++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="7") {
            conditionsAtmTempsEblouissant++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="8") {
            conditionsAtmTempsCouvert++
        }
        else if (dataAccidentsConditionsAtmosph.features[i].properties.atm=="9") {
            conditionsAtmAutre++
        }
    

    }

    var conditionsAtmTotal = conditionsAtmNormales + conditionsAtmPluiesLegeres + conditionsAtmPluiesFortes + conditionsAtmNeigeGrele + conditionsAtmBrouillard + conditionsAtmVentFortTempete + conditionsAtmTempsEblouissant + conditionsAtmTempsCouvert + conditionsAtmAutre
    //console.log(`Conditions atmosphériques totales : ${conditionsAtmTotal}`)

    var conditionsAtmNormalesPourcentage = ( ( conditionsAtmNormales / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmPluiesLegeresPourcentage = (  ( conditionsAtmPluiesLegeres / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmPluiesFortesPourcentage = ( ( conditionsAtmPluiesFortes / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmNeigeGrelePourcentage = (  ( conditionsAtmNeigeGrele / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmBrouillardPourcentage = (  ( conditionsAtmBrouillard / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmVentFortTempetePourcentage = (  ( conditionsAtmVentFortTempete / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmTempsEblouissantPourcentage = (  ( conditionsAtmTempsEblouissant / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmTempsCouvertPourcentage = (  ( conditionsAtmTempsCouvert / conditionsAtmTotal ) *100 ).toFixed(1)
    var conditionsAtmAutrePourcentage = (  ( conditionsAtmAutre / conditionsAtmTotal ) *100 ).toFixed(1)
    

    //console.log(`Conditions atmosphériques normales : ${conditionsAtmNormalesPourcentage} %`)


    console.log(`Conditions atmosphériques : ${conditionsAtmNormales}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmPluiesLegeres}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmPluiesFortes}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmNeigeGrele}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmBrouillard}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmVentFortTempete}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmTempsEblouissant}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmTempsCouvert}`)
    console.log(`Conditions atmosphériques : ${conditionsAtmAutre}`)


    const labelsAccidentsConditionsAtmosphPourChart = ["Normales", "Pluie légère", "Pluie forte", "Neige / grêle","Brouillard / fumée","Vent fort / tempête","Temps éblouissant", "Temps couvert", "Conditions autres"]
    
    const dataAccidentsConditionsAtmosphPourChart = [conditionsAtmNormalesPourcentage,conditionsAtmPluiesLegeresPourcentage,conditionsAtmPluiesFortesPourcentage, conditionsAtmNeigeGrelePourcentage,conditionsAtmBrouillardPourcentage, conditionsAtmVentFortTempetePourcentage, conditionsAtmTempsEblouissantPourcentage, conditionsAtmTempsCouvertPourcentage,  conditionsAtmAutrePourcentage  ]

     const data = {
        labels: labelsAccidentsConditionsAtmosphPourChart,
        datasets: [
          {
            /* label: 'Dataset 1', */
            data: dataAccidentsConditionsAtmosphPourChart,
            
          }
        ],
        labels: labelsAccidentsConditionsAtmosphPourChart
    };


    const config = {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: false,
              text: 'Chart.js Pie Chart'
            }
          }
        },
      };


      const DATA_COUNT = 5;
      const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
      
       // render init block
       const myChart = new Chart(
        document.getElementById('chartConditionsAtmospheriques'),
        config
    );


})



/////////////////////////////GRAPHIQUE PAR CONDITIONS ATMOSPHERIQUES API TESTS ///////////////////////////////




/* 

const urlAccidentsConditionsAtmosph1 = fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records?select=atm%2C%20lat%2C%20long&limit=100')
.then(response => response.json())
.then(dataAccidentsConditionsAtmosphAPI =>{
    console.log(`Test API OpenDataSoft : ${dataAccidentsConditionsAtmosphAPI.results[0].atm}`)

    var conditionsAtmNonRenseigne = 0;
    var conditionsAtmNormales = 0;
    var conditionsAtmPluiesLegeres = 0;
    var conditionsAtmPluiesFortes = 0;
    var conditionsAtmNeigeGrele = 0;
    var conditionsAtmBrouillard = 0;
    var conditionsAtmVentFortTempete = 0;
    var conditionsAtmTempsEblouissant = 0;
    var conditionsAtmTempsCouvert = 0;
    var conditionsAtmAutre = 0;


    for (var i = 0; i < dataAccidentsConditionsAtmosphAPI.results.length;i++){
        if (dataAccidentsConditionsAtmosphAPI.results[i].atm=="1") {
            conditionsAtmNormales++
        }
        console.log(`Test API OpenDataSoft : ${dataAccidentsConditionsAtmosphAPI.results[i].atm}`)
    }


}) */








///////////////////////////// CHART.JS GRAVITE ACCIDENT/////////////////////////////// OK



const urlAccidentsChartGravite = fetch('projet1geojson/usagersGPS31.geojson')
.then(response => response.json())
.then(dataAccidentsGravite =>{
    //console.log(dataAccidentsGravite.features[0].properties.trajet)
    
    let sommeGraviteIndemne=0;
    let sommeGraviteTue = 0;
    let sommeGraviteBlesseHospitalise = 0;
    let sommeGraviteBlesseLeger =0;


    for (var i =0; i<dataAccidentsGravite.features.length;i++){
        //console.log(dataAccidentsVelo31[i])  
        if (dataAccidentsGravite.features[i].properties.grav === "1")
        sommeGraviteIndemne++
        if (dataAccidentsGravite.features[i].properties.grav === "2")
        sommeGraviteTue++
        if (dataAccidentsGravite.features[i].properties.grav === "3")
        sommeGraviteBlesseHospitalise++
        if (dataAccidentsGravite.features[i].properties.grav === "4")
        sommeGraviteBlesseLeger++
    }


        const labelsGraviteAccidents = ["Décés", "Indemnes", "Blessés hospitalisés", "Blessés légers"]

        const dataGraviteAccidents = [sommeGraviteTue, sommeGraviteIndemne, sommeGraviteBlesseHospitalise, sommeGraviteBlesseLeger]

        // setup 
        const data = {
            labels: labelsGraviteAccidents,
            datasets: [{
            //label: 'Weekly Sales',
            data: dataGraviteAccidents,
            backgroundColor: [
                'rgba(255,103,76,1)'
            ],
            borderColor: [
                'white'
            ],
            borderWidth: 1
            }]
        };

        // config 
        const config = {
            type: 'bar',
            data,
            options: {
                indexAxis: 'x',
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins : {
                    legend : {
                        display: false
                    }
                }
            }
        };

        // render init block
        const myChart = new Chart(
            document.getElementById('chartParGravite'),
            config
        );





})




///////////////////////////// CHART.JS catégorie véhicules ///////////////////////////////



//chartParSexe

const urlAccidentsCatVehicule= fetch('projet1geojson/caracteristiques-lieux-vehiculesVF.geojson')
.then(response => response.json())
.then(dataAccidentsCatvehicule =>{
    //console.log(dataAccidentsCatvehicule.features[0].properties.catv)

    var sommeCategorieVehiculeIndeterminable = 0; 

    var sommeCategorieVehiculeBicyclette = 0;  
    var sommeCategorieVehiculeVoiturette = 0; 
    var sommeCategorieVehiculeVoiture = 0; // Voitures (VL sel) 
    var sommeCategorieVehiculeVUtilitaire = 0; 
    
    var sommeCategorieVehiculeTracteurRoutierSeul = 0;
    var sommeCategorieVehiculeTracteurRoutierEtSemiRemorque = 0;
    var sommeCategorieVehiculeTracteurRoutierToutconfondu = 0;  
    
    var sommeCategorieVehiculePoidLoudSeul3T5PTCA = 0;
    var sommeCategorieVehiculePoidLoudSeulSuperieur7T5 = 0;
    var sommeCategorieVehiculePoidLoudSuperieur3T5EtRemorque = 0;
    var sommeCategorieVehiculePoidLoudToutConfondu = 0; 

    var sommeCategorieVehiculeEnginSpecial = 0;   
    var sommeCategorieVehiculeTracteurAgricole = 0;  
    
   
    var sommeCategorieVehiculeScooterSous50cm3=0
    var sommeCategorieVehiculeScooterEntre50cm3et125cm3=0
    var sommeCategorieVehiculeScooterPlus125cm3=0
    var sommeCategorieVehiculeCyclomoteur50m3 = 0; 
    var sommeCategorieVehiculeMotocyclette50et125cm3 = 0; 
    var sommeCategorieVehiculeMotocyclettePlus125cm3 = 0     
    var sommeScooterMoto = 0;  // tout confondu  

    var sommeCategorieVehiculeQuadLeger=0;
    var sommeCategorieVehiculeQuadLourd=0;
    var sommeCategorieVehiculeQuadToutConfondu = 0; 
    
    var sommeCategorieVehiculeAutobus = 0; 
    var sommeCategorieVehiculeAutocar = 0; 
    var sommeCategorieVehiculeAutobusEtAutocarToutConfondu = 0;

    var sommeCategorieVehiculeTrain = 0; 
    var sommeCategorieVehiculeTramway = 0; 
    
    var sommeCategorieVehicule3RMMoins50 = 0 
    var sommeCategorieVehicule3RMEntre50et125m3 = 0 
    var sommeCategorieVehicule3RMSup125m3 = 0 
    var sommeCategorieVehicule3RMToutConfondu = 0 // tout confondu  - il s'agit de véhicules légers
    
    var sommeCategorieVehiculeEDPmoteur = 0
    var sommeCategorieVehiculeEDPSansmoteur = 0
    var sommeCategorieVehiculeEDPToutConfondu = 0 // tout confondu - engin de déplacement personnel (trottinettes, skateboards etc) 

    var sommeCategorieVehiculeVAE = 0 // vélo à assistance électrique 


    var sommeCategorieVehiculeAutreCategorie = 0 

for (var i=0; i<dataAccidentsCatvehicule.features.length;i++){
    if (dataAccidentsCatvehicule.features[i].properties.catv === "0"){
    sommeCategorieVehiculeIndeterminable++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "1"){
    sommeCategorieVehiculeBicyclette++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "3"){
    sommeCategorieVehiculeVoiturette++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "7"){
    sommeCategorieVehiculeVoiture++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "10"){
    sommeCategorieVehiculeVUtilitaire++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "13"){
        sommeCategorieVehiculePoidLoudSeul3T5PTCA++
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "14"){
        sommeCategorieVehiculePoidLoudSeulSuperieur7T5++
        }

        if (dataAccidentsCatvehicule.features[i].properties.catv === "15"){
        sommeCategorieVehiculePoidLoudSuperieur3T5EtRemorque++
        }
        
        sommeCategorieVehiculePoidLoudToutConfondu=sommeCategorieVehiculePoidLoudSeul3T5PTCA+sommeCategorieVehiculePoidLoudSeulSuperieur7T5+sommeCategorieVehiculePoidLoudSuperieur3T5EtRemorque
    

    if (dataAccidentsCatvehicule.features[i].properties.catv === "16"){
        sommeCategorieVehiculeTracteurRoutierSeul++
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "17"){
        sommeCategorieVehiculeTracteurRoutierEtSemiRemorque++
        }      
    
        sommeCategorieVehiculeTracteurRoutierToutconfondu=sommeCategorieVehiculeTracteurRoutierSeul+sommeCategorieVehiculeTracteurRoutierEtSemiRemorque
    

    if (dataAccidentsCatvehicule.features[i].properties.catv === "20"){
    sommeCategorieVehiculeEnginSpecial++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "21"){
    sommeCategorieVehiculeTracteurAgricole++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "30"){
        sommeCategorieVehiculeScooterSous50cm3++
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "32"){
        sommeCategorieVehiculeScooterEntre50cm3et125cm3++
        }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "34"){
        sommeCategorieVehiculeScooterPlus125cm3++
        }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "2"){
        sommeCategorieVehiculeCyclomoteur50m3++
        }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "31"){
        sommeCategorieVehiculeMotocyclette50et125cm3++
        }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "33"){
        sommeCategorieVehiculeMotocyclettePlus125cm3++
        }
        
        sommeScooterMoto=sommeCategorieVehiculeScooterSous50cm3+sommeCategorieVehiculeScooterEntre50cm3et125cm3+sommeCategorieVehiculeScooterPlus125cm3+sommeCategorieVehiculeCyclomoteur50m3+sommeCategorieVehiculeMotocyclette50et125cm3+sommeCategorieVehiculeMotocyclettePlus125cm3

    
    

    if (dataAccidentsCatvehicule.features[i].properties.catv === "35"){
        sommeCategorieVehiculeQuadLeger++ 
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "36"){
        sommeCategorieVehiculeQuadLourd++
        }     

        sommeCategorieVehiculeQuadToutConfondu=sommeCategorieVehiculeQuadLeger+sommeCategorieVehiculeQuadLourd
   

    if (dataAccidentsCatvehicule.features[i].properties.catv === "37"){
        sommeCategorieVehiculeAutobus++ 
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "38"){
        sommeCategorieVehiculeAutocar++
        }

        sommeCategorieVehiculeAutobusEtAutocarToutConfondu=sommeCategorieVehiculeAutobus+sommeCategorieVehiculeAutocar
   

    if (dataAccidentsCatvehicule.features[i].properties.catv === "39"){
    sommeCategorieVehiculeTrain++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "40"){
        sommeCategorieVehiculeTramway++
    }

    if (dataAccidentsCatvehicule.features[i].properties.catv === "41"){
        sommeCategorieVehicule3RMMoins50++ 
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "42"){
        sommeCategorieVehicule3RMEntre50et125m3++
        }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "43"){
        sommeCategorieVehicule3RMSup125m3++
        }
        sommeCategorieVehicule3RMToutConfondu=sommeCategorieVehicule3RMMoins50+sommeCategorieVehicule3RMEntre50et125m3+sommeCategorieVehicule3RMSup125m3
   


    if (dataAccidentsCatvehicule.features[i].properties.catv === "50"){
        sommeCategorieVehiculeEDPmoteur++
    }
        if (dataAccidentsCatvehicule.features[i].properties.catv === "60"){
        sommeCategorieVehiculeEDPSansmoteur++
        }
        sommeCategorieVehiculeEDPToutConfondu=sommeCategorieVehiculeEDPmoteur+sommeCategorieVehiculeEDPSansmoteur
    
    if (dataAccidentsCatvehicule.features[i].properties.catv === "80"){
    sommeCategorieVehiculeVAE++
    } 
    if (dataAccidentsCatvehicule.features[i].properties.catv === "99"){
    sommeCategorieVehiculeAutreCategorie++
    }
    
}

    /* console.log(`Somme véhicule indeterminable : ${sommeCategorieVehiculeIndeterminable}`) 
    console.log(`Somme bicyclette : ${sommeCategorieVehiculeBicyclette}`)
    console.log(`Somme voiturette : ${sommeCategorieVehiculeVoiturette}`)
    console.log(`Somme voiture : ${sommeCategorieVehiculeVoiture}`)
    console.log(`Somme véhicule utilitaire : ${sommeCategorieVehiculeVUtilitaire}`)
    console.log(`Somme tracteurs routiers : ${sommeCategorieVehiculeTracteurRoutierToutconfondu}`)
    console.log(`Somme poid lourd : ${sommeCategorieVehiculePoidLoudToutConfondu}`)
    console.log(`Somme engin spécial : ${sommeCategorieVehiculeEnginSpecial}`)
    console.log(`Somme tracteur agricole : ${sommeCategorieVehiculeTracteurAgricole}`)
    console.log(`Somme scooter moto : ${sommeScooterMoto}`)
    console.log(`Somme quad : ${sommeCategorieVehiculeQuadToutConfondu}`)
    console.log(`Somme autobus / autocar : ${sommeCategorieVehiculeAutobusEtAutocarToutConfondu}`)
    console.log(`Somme train : ${sommeCategorieVehiculeTrain}`)
    console.log(`Somme tramway : ${sommeCategorieVehiculeTramway}`)
    console.log(`Somme 3RMT tout confondu : ${sommeCategorieVehicule3RMToutConfondu}`)
    console.log(`Somme véhicule EDP : ${sommeCategorieVehiculeEDPToutConfondu}`)
    console.log(`Somme véhicule VAE : ${sommeCategorieVehiculeVAE}`)
    console.log(`Somme véhicule autre catégorie : ${sommeCategorieVehiculeAutreCategorie}`) */



   /*  console.log(`Scooter sous 50cm3 TOTAL ${sommeCategorieVehiculeScooterSous50cm3}`)
    console.log(`Scooter 50-125cm3 TOTAL : ${sommeCategorieVehiculeScooterEntre50cm3et125cm3}`)
    console.log(`Scooter 125cm3 TOTAL : ${sommeCategorieVehiculeScooterPlus125cm3}`)
    console.log(`Cyclomoteur 50cm3 TOTAL : ${sommeCategorieVehiculeCyclomoteur50m3}`)
    console.log(`Motocyclette 50-125 TOTAL : ${sommeCategorieVehiculeMotocyclette50et125cm3}`)
    console.log(`Motocyclette +125 TOTAL : ${sommeCategorieVehiculeMotocyclettePlus125cm3}`)
    console.log(`ScooterMoto TOTAL : ${sommeScooterMoto}`)  */

    //Calcul top5 des catégories de véhicules qui ont eu le plus d'accidents
    const sommeCategorieVehiculesTop5 = sommeCategorieVehiculeVoiture+sommeCategorieVehiculeVUtilitaire+sommeCategorieVehiculeBicyclette+sommeScooterMoto+sommeCategorieVehiculeEDPToutConfondu
    //console.log(`Somme  : ${sommeCategorieVehiculeEDPToutConfondu}`)

    //Calcul pourcentage top 5 des catégories de véhicules qui ont eu le plus d'accidents
    const voituresPourcentage = ((sommeCategorieVehiculeVoiture /sommeCategorieVehiculesTop5)*100).toFixed(0)
    const vehiculesUtilitairesPourcentage = ((sommeCategorieVehiculeVUtilitaire /sommeCategorieVehiculesTop5)*100).toFixed(0)
    const vehiculesBicylettesPourcentage = ((sommeCategorieVehiculeBicyclette /sommeCategorieVehiculesTop5)*100).toFixed(0)
    const vehiculesScooterMotoPourcentage = ((sommeScooterMoto /sommeCategorieVehiculesTop5)*100).toFixed(0)
    const vehiculesEDPPourcentage = ((sommeCategorieVehiculeEDPToutConfondu /sommeCategorieVehiculesTop5 )*100).toFixed(0)

  //console.log(`Catégorie Véhicules en % : ${voitures} + ${vehiculesUtilitaires} + ${vehiculesBicylettes} + ${vehiculesCyclomoteur} + ${vehiculesScooter} `)
  //console.log(`Véhicules cyclomoteurs ${vehiculesCyclomoteurPourcentage}`)


    var options = {
        series: [
        {
        data: [
            {
                x: 'Voitures',
                y: voituresPourcentage
            },
            {
                x: 'Motos et scooters',
                y: vehiculesScooterMotoPourcentage
            },
            {
                x: 'Véhicules utilitaires',
                y: vehiculesUtilitairesPourcentage
            },
            {
                x: 'Vélos',
                y: vehiculesBicylettesPourcentage
            },
            {
                x: 'Engins de déplacement personnels',
                y: vehiculesEDPPourcentage
            },
        ]
        }
    ],
        legend: {
        show: false
    },
    chart: {
        height: 450, 
        type: 'treemap',
        toolbar: {
            show: true,
            tools: {
            download: false
            }
        }
    }, 
    colors: ["#FF6347"]
    };

    var chart = new ApexCharts(document.querySelector("#chartParCategorieDeVehicule"), options);
    chart.render();


})





