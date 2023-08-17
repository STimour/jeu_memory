let nodeList = document.querySelectorAll(".tile"); // Получаем все элементы с классом "tile"
let elements = Array.from(nodeList); // Преобразуем коллекцию в массив

let firstClickedTile = null; // Переменная для хранения первой нажатой плитки

elements.forEach((element, i) => {
    element.addEventListener("click", () => { // Добавляем обработчик клика для каждой плитки
        if (element.classList.contains("not-revealed")) { // Если плитка не открыта
            element.classList.remove("not-revealed");
            element.classList.add("revealed"); // Показываем плитку

            if (!firstClickedTile) { // Если еще нет первой нажатой плитки
                firstClickedTile = element; // Запоминаем эту плитку
            } else {
                if (firstClickedTile.style.backgroundColor === element.style.backgroundColor) { // Если цвета совпадают
                    firstClickedTile = null; // Сбрасываем первую нажатую плитку для следующей пары
                } else {
                    // Если цвета не совпадают, переворачиваем обе плитки обратно
                    setTimeout(() => {
                        firstClickedTile.classList.remove("revealed");
                        firstClickedTile.classList.add("not-revealed");
                        element.classList.remove("revealed");
                        element.classList.add("not-revealed");
                        firstClickedTile = null;
                    }, 1000); // Даем 1 секунду задержки перед переворотом
                }
            }
        } else { // Если плитка уже открыта
            element.classList.remove("revealed");
            element.classList.add("not-revealed"); // Переворачиваем ее обратно
        }
    });
});
