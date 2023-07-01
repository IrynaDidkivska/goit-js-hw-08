import _throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";
const formData = {};

form.addEventListener('input', _throttle(updateFormData, 500));
form.addEventListener('submit', onFormSubmit);

// Очистка форми
function onFormSubmit(event) { 
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

};

// зберігає значення в локал сторедж
function updateFormData({target}) { 
    const inputEmail = target.name;
    const inputMessage = target.value;
    formData[inputEmail] = inputMessage;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Під час завантаження сторінки перевіряй стан сховища,
//  і якщо там є збережені дані, заповнюй ними поля форми. 
// В іншому випадку поля повинні бути порожніми.
function fillFormFields({ target: { textarea } }) {
    const dataFromFormSubmit = JSON.parse(localStorage.getItem(STORAGE_KEY));
    for (let key in formData) {
        form.elements[key].value = dataFromFormSubmit[key];
    }
    if (dataFromFormSubmit) {
        textarea.value = dataFromFormSubmit.message;
        console.log(dataFromFormSubmit);
    }
    else target.textarea.value = "";
}