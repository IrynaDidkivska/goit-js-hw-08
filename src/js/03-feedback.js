import _throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', _throttle(updateFormData, 500));  // зачем тут _throttle ?
form.addEventListener('submit', onFormSubmit);


// Очистка форми
function onFormSubmit(event) { 
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

};

// зберігає значення в локал сторедж
function updateFormData({target}) { 

    const valueForm = target.value; 
    const nameForm = target.name; 
    const localStorageData = localStorage.getItem(STORAGE_KEY);
    const parsedData = localStorageData !== null ? JSON.parse(localStorageData) : {};
 
    parsedData[nameForm] = valueForm;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData))
    
};

const checkedData = localStorage.getItem(STORAGE_KEY);
if (checkedData !== null) { 
    const data = JSON.parse(checkedData);
   for (let key in data) {
        form.elements[key].value = data[key];
     }
}







