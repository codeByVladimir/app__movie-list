const inputNode = document.querySelector('.main__input');
const buttonNode = document.querySelector('.main__button');
const movieListNode = document.querySelector('.main__movie-list');
const errorNode = document.querySelector('.main__undefinedOrNone');

document.addEventListener('DOMContentLoaded', () => {
    renderMovieIsFromLocalStorage();
    renderStatusForCheckboxFromLocalStorage();
    checkClickCheckbox();
    checkClickRemoveItem();
});

function renderMovieIsFromLocalStorage(){
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key.startsWith('movie-')){
            const value = localStorage.getItem(key);
            renderMovieFromUser(value);
        };
    };
}
function renderStatusForCheckboxFromLocalStorage(){
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key.startsWith('status-')){
            const value = localStorage.getItem(key) === 'true';
            const movieId = key.replace('status-', 'movie-');
            const findCheckbox = document.getElementById(movieId);
            
            if(findCheckbox){
                findCheckbox.checked = value;
                if(value){
                    const label = findCheckbox.closest('.main__movie-group').querySelector('.main__movie-label');
                    const item = findCheckbox.closest('.main__movie-item');
                    label.style.textDecoration = 'line-through';
                    item.style.backgroundColor = '#2A2A2A';
                }

            }
            
        }
    }
}
buttonNode.addEventListener('click', () => {
    const movieName = getMovieFromUser(inputNode);
    if(!movieName){
        errorNode.style.display = 'block';
        return;
    }else{
        errorNode.style.display = 'none';
    };
    renderMovieFromUser(movieName);
    inputNode.value = '';
});

function getMovieFromUser(input){
    return input.value;
};

function renderMovieFromUser(movieName){
    // Создаем новый элемент
    const movieItem = document.createElement('li');
    movieItem.classList.add('main__movie-item');
    // Создаем общиий конт-нер для checkbox и label
    const movieGroup = document.createElement('div');
    movieGroup.classList.add('main__movie-group');
    // Создаем checkbox для отметки о просмотренном
    const movieInput = document.createElement('input');
    movieInput.classList.add('main__movie-input');
    movieInput.type = 'checkbox';
    movieInput.id = `movie-${movieName.replace(/\s+/g, '-')}`;
    // Создаем label в котором содержится названия фильма
    const movieLabel = document.createElement('label');
    movieLabel.classList.add('main__movie-label');
    movieLabel.for = movieInput.id;
    movieLabel.textContent = movieName;
    // Создаем кнопку удаления фильма из списка
    const movieBtnRemoveItem = document.createElement('button');
    movieBtnRemoveItem.classList.add('main__movie-delete');
    // Для кнопки добавляем картинку
    const movieBtnImage = document.createElement('img');
    movieBtnImage.classList.add('main__movie-delete-img');
    movieBtnImage.src = './img/delete.svg';
    movieBtnImage.alt = 'Удалить';

    //Вкладываем элементы в родителей
    movieBtnRemoveItem.appendChild(movieBtnImage);
    movieGroup.appendChild(movieInput);
    movieGroup.appendChild(movieLabel);
    movieItem.appendChild(movieGroup);
    movieItem.appendChild(movieBtnRemoveItem);
    //заставляем тег <ul> принять дочерним элементом описанное выше
    movieListNode.appendChild(movieItem);

    //Сохраняем в localStorage названия фильмов
    localStorage.setItem(movieInput.id, movieName);
}

function checkClickCheckbox(){
    movieListNode.addEventListener('change', (event) => {
        if(event.target.classList.contains('main__movie-input')){
            const find = event.target.closest('.main__movie-group').querySelector('.main__movie-label');
            const bgcolor = event.target.closest('.main__movie-item');
            if (event.target.checked){
                find.style.textDecoration = 'line-through';
                bgcolor.style.backgroundColor = '#2A2A2A';
            }else{
                find.style.textDecoration = 'none';
                bgcolor.style.backgroundColor = '#3A3939';
            }
            // Сохраняем значение checkbox в localStorage
            const movieId = event.target.id;
            let statusId;
            if(movieId.startsWith('movie-')){
                statusId = movieId.replace('movie-', 'status-');
            }
            localStorage.setItem(statusId, event.target.checked);
        };
    });
};

function checkClickRemoveItem(){
    movieListNode.addEventListener('click', (event) => {
        if(event.target.classList.contains('main__movie-delete-img')){
            const removeItem = event.target.closest('.main__movie-item');
            const removeNameFromLocalStorage = event.target.closest('.main__movie-item').querySelector('.main__movie-label');
            
            if(removeItem && removeNameFromLocalStorage){
                removeItem.remove();
                localStorage.removeItem(`movie-${removeNameFromLocalStorage.textContent}`)
            };
        };
    });
};


