const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
let nbCoups = 0;
let nb_jeu = 0;
let time = 500;
let nb_remise = 0;

//ANCHOR - la selection de la div principal
const app = document.querySelector("#app")

// ANCHOR - Premier Button(commencer le jeu)
const btnStart = document.createElement('button') as HTMLButtonElement; 
    btnStart.textContent = "Commencer la partie";
    btnStart.addEventListener("click", () => {
        nbCoups = 0
        init()
    });

    app.appendChild(btnStart);

// ANCHOR - Deuxieme Button(recommencer le jeu)
const newBtnStart = document.createElement("button") as HTMLButtonElement;
    newBtnStart.textContent = "Faire une nouvelle partie";
    newBtnStart.addEventListener("click", () => {
    nbCoups = 0
    init();
});

//ANCHOR - Troisième btn pour recommencer le jeu;
const remiseBtnStart = document.createElement("button") as HTMLButtonElement;
    remiseBtnStart.textContent = "Récommencer le jeu";
    remiseBtnStart.addEventListener("click", () => {
    nb_remise++
    nbCoups = 0
    init();
});

//ANCHOR - La div qui contient le jeu
const jeuDiv = document.createElement('div') as HTMLDivElement;
    jeuDiv.setAttribute("id", "jeuDiv")
    jeuDiv.setAttribute("class", "argent")
    jeuDiv.style.width = "450px"
    jeuDiv.style.margin = "auto auto 30px auto"
    jeuDiv.style.display = "flex"
    jeuDiv.style.border = "1px solid black"

//ANCHOR - Victoire - La div qui apparait en remplaçant jeuDiv une fois le jeu terminé + fonction
const victoire = document.createElement("div") as HTMLDivElement
    victoire.setAttribute("id", "victoire")
    victoire.setAttribute("class", "argent")
function victoireFunc() {
    jeuDiv.remove()
    remiseBtnStart.remove()
    app.appendChild(victoire)
    victoire.innerHTML = `
        <h1>Bravo!</h1>
        <h2>Vous avez gagné</h2>
        <p>Vous avez fait ${nbCoups} coups pour gagner.</p>
        <p>Vous avez joué ${nb_jeu} fois.</p>
        
        `
    victoire.appendChild(newBtnStart)
}

// ANCHOR - Fonction qui réinitialise le jeu
function init() {
    console.log('init');
    console.log(time);
    btnStart.remove();
    app.innerHTML = `
        <p>Vous avez recommencé le jeu:${nb_remise} fois</p>
    `
    
    app.appendChild(jeuDiv);
    app.appendChild(remiseBtnStart)

// ANCHOR - Creation des carte avec des couleur
    const tiles = new Array(16).fill('').map((_, i) => {
        const tile = document.createElement("div");
        tile.setAttribute("class", "tile not-revealed");
        tile.setAttribute("color", colors[Math.floor(i / 2)])
        tile.style.width = "50px";
        tile.style.height = "50px";
        tile.style.border = "1px solid black";
        tile.style.margin = "20px";
        tile.classList.add(colors[Math.floor(i / 2)]);
        return tile;

    });

    // Shuffle the new tiles
    tiles.sort(() => Math.random() - 0.5);
    
    // Clear previous tiles in jeuDiv
    jeuDiv.innerHTML = '';
    
    // Add the new tiles to jeuDiv
    tiles.forEach(tile => jeuDiv.appendChild(tile));


// On selection les tiles pour boucler dessus
    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);

    let carreChoisi = null;
    let propCol = null;
    let count = 0;
    
// Ajout de l'ecouteur d'evenement click aux tiles
    elements.forEach((element, i) => {
        element.addEventListener("click", () => {
            count++
            if(count%2 === 0){
                nbCoups++
            }
            console.log(nbCoups)                         // C'est ici plus bas que ca bug je pense 
            if (element.classList.contains("not-revealed")) { // le bug est present parfois
                element.classList.remove("not-revealed"); // si je clique tres vite sur les carrés
                if (!carreChoisi) {                       //y en a trois carré qui reste retourné 
                    carreChoisi = element;                // je viens de penser que ç'arrive uniquement quand t'as deux meme couleurs qui sont tompe parmis les trois carrés, peut être c'est une coincidences 
                    propCol = carreChoisi.getAttribute("color")
                } else {
                    if(propCol === element.getAttribute("color") ) {
                        element.classList.add("revealed")
                        carreChoisi = null;
                        propCol = null;
                    } else {
                        setTimeout(() => {
                            carreChoisi.classList.add("not-revealed");
                            element.classList.add("not-revealed");
                            carreChoisi = null;
                            propCol = null;
                            
                        }, time);
                    }
                }
           
            } 
            // vérification de la condition de victoire(toute les tiles ne doivent plus avec not-revealed)
            const win = elements.every(tile => !tile.classList.contains("not-revealed"));
            if (win) {
                console.log("Toutes les tuiles ont été révélées !");
                if(time > 100){
                time-=25;
                }
                nb_jeu++;
                victoireFunc();
            } 
        });
        
    });

  

}