const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
let nbCoups = 0;

const mainDiv = document.createElement('div') as HTMLDivElement;
    mainDiv.setAttribute("id", "mainDiv")
    mainDiv.style.width = "50%"
    mainDiv.style.margin = "auto"
    mainDiv.style.display = "flex"
    mainDiv.style.backgroundColor = "gray"
    mainDiv.style.border = "1px solid black"

const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
btnStart.addEventListener("click", () => {
    init()
});

let nb_jeu = 0;


function init() {
    console.log('init');
    btnStart.remove();
    nbCoups = 0;
    nb_jeu++;
    container.innerHTML = `
        <button id="init-button">Nouveau Click</button>
        <p>nombre de tour:${nb_jeu}</p>
        <p>nombre de tour:${nbCoups}</p>
     
    `;
    
    container.appendChild(mainDiv);

    // Create new tiles for this round
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
    
    // Clear previous tiles in mainDiv
    mainDiv.innerHTML = '';
    
    // Add the new tiles to mainDiv
    tiles.forEach(tile => mainDiv.appendChild(tile));
    
    // Add an event listener
    const newBtnStart = document.querySelector("#init-button") as HTMLButtonElement;
    newBtnStart.addEventListener("click", () => {
        init();
    });


    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);

    let carreChoisi = null;
    let propCol = null;

    let revealed = true;
    
    elements.forEach((element, i) => {
        element.addEventListener("click", () => {
            nbCoups++;
            if (element.classList.contains("not-revealed")) {
                element.classList.remove("not-revealed");
                if (!carreChoisi) {
                    carreChoisi = element;
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
                        }, 500);
                    }
                }
            } else {
                console.log("eeee")
            }
        });
        
    });

  

}
