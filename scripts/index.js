const openPopup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
let name = document.querySelector('.profile__username');
let job = document.querySelector('.profile__description');

function popOpen() {
    openPopup.classList.add('popup_opened');

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function popClose() {
    openPopup.classList.remove('popup_opened');
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
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    popClose()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);