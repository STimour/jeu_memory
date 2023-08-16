const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

const mainDiv = document.createElement('mainDiv') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;

btnStart.addEventListener("click", () => {
    init()
});
nb_jeu = 0;


function init(){
    console.log('init');
    btnStart.remove();
    
}
