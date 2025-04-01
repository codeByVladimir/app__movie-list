const inputNode = document.querySelector('.main__input');
const buttonNode = document.querySelector('.main__button');
const movieListNode = document.querySelector('.main__movie-list');

const arrToLocalStorage = [];

buttonNode.addEventListener('click', () => {
    const movieName = getMovieFromUser(inputNode);
    renderMovieFromUser(movieName);
    inputNode.value = '';
})

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
    movieBtnImage.src = './icons/delete.svg';
    movieBtnImage.alt = 'Удалить';

    //Вкладываем элементы в родителей
    movieBtnRemoveItem.appendChild(movieBtnImage);
    movieGroup.appendChild(movieInput);
    movieGroup.appendChild(movieLabel);
    movieItem.appendChild(movieGroup);
    movieItem.appendChild(movieBtnRemoveItem);

    movieListNode.appendChild(movieItem);
}