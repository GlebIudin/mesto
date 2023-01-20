const openPopup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__info_edit-button');
const closeButton = document.querySelector('.popup__close-button')

function popOpen() {
    openPopup.classList.add('popup__opened');
}

function popClose() {
    openPopup.classList.remove('popup__opened');
}

editButton.addEventListener('click', popOpen);
closeButton.addEventListener('click', popClose)

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#name_input'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#job_input'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(nameInput.value);
    console.log(jobInput.value);
    // Выберите элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__info_username');
let job = document.querySelector('.profile__info_description');

    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    popClose()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);