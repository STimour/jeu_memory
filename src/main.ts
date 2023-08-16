const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

const mainDiv = document.createElement('div') as HTMLDivElement;
    mainDiv.setAttribute("id", "mainDiv")
    mainDiv.style.width = "80%"
    mainDiv.style.margin = "auto"
    mainDiv.style.display = "flex"
    mainDiv.style.backgroundColor = "gray"
    mainDiv.style.border = "1px solid black"
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
btnStart.addEventListener("click", () => {
    init()
});
const container = document.querySelector('#container') as HTMLDivElement;
    container.style.margin = "0 0 20px 0";



let nb_jeu = 0;
function init() {
    console.log('init');
    btnStart.remove();
    nb_jeu++;
    container.innerHTML = `
        <button id="init-button">Nouveau Click</button>
        <p>nombre de tour:${nb_jeu}</p>
        <div id="mainDiv"></div> 
    `;
    
    container.appendChild(mainDiv);

    // Create new tiles for this round
    const tiles = new Array(16).fill('').map((_, i) => {
        const tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        tile.style.width = "50px";
        tile.style.height = "50px";
        tile.style.margin = "20px";
        tile.style.backgroundColor = colors[Math.floor(i / 2)];
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
}