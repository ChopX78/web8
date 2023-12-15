let selectedImage = null;
const name = document.getElementById('name')
name.addEventListener('input', function (){
    checker(this,"^([А-ЯЁA-Z][а-яёa-z]+)(\\s[А-ЯЁA-Z][а-яёa-z]+)?(\\s[А-ЯЁA-Z][а-яёa-z]+)?$")
})
const fileInput = document.getElementById('file-input');
const image = document.querySelector('.photo-container img');
const text = document.querySelector('.photo-container span');

fileInput.addEventListener('change', function(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            image.src = reader.result;
            text.textContent = selectedFile.name;
        });
        reader.readAsDataURL(selectedFile);
    }
});
function  checker(target, pat){
    let icon = document.querySelector('.validationIcon')
    const reg = new RegExp(pat)
    if (reg.test(target.value)) {
        icon.style.backgroundImage = 'url("https://vsememy.ru/kartinki/wp-content/uploads/2023/03/1661364850_2-papik-pro-p-galochka-stiker-png-2.png")';
    } else {
        icon.style.backgroundImage = 'url("https://free-png.ru/wp-content/uploads/2022/01/free-png.ru-388.png")';
    }
}
const right = document.querySelector('.right')
const inputFields = right.querySelectorAll("input");
function saveData() {
    inputFields.forEach((field) => {
        const fieldName = field.id;
        const fieldValue = field.value;
        localStorage.setItem(fieldName, fieldValue);
    });
}

function loadData() {
    inputFields.forEach((field) => {
        const fieldName = field.id;
        const fieldValue = localStorage.getItem(fieldName);
        if (fieldValue) {
            field.value = fieldValue;
        }
    });
}

inputFields.forEach((field) => {
    field.addEventListener("input", saveData);
});

let usersData = {};
loadData();

function saveUserData() {
    const userName = document.getElementById('name').value;
    const userDate = document.getElementById('date').value;
    const userColor = document.getElementById('color').value;
    const userFilm = document.getElementById('film').value;
    const userDrink = document.getElementById('drink').value;
    const userHobby = document.getElementById('hobby').value;
    const userMusic = document.getElementById('music').value;

    usersData[userName] = {
        name: userName,
        date: userDate,
        color: userColor,
        film: userFilm,
        drink: userDrink,
        hobby: userHobby,
        music: userMusic
    };

    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('color').value = '';
    document.getElementById('film').value = '';
    document.getElementById('drink').value = '';
    document.getElementById('hobby').value = '';
    document.getElementById('music').value = '';

    updateDropdown();
    saveUsersDataToLocal();
}

function loadUserData() {
    const selectedUser = document.getElementById('userSelect').value;

    if (selectedUser in usersData) {
        const userData = usersData[selectedUser];
        document.getElementById('userName').value = selectedUser;
        document.getElementById('name').value = userData.name;
        document.getElementById('date').value = userData.date;
        document.getElementById('color').value = userData.color;
        document.getElementById('film').value = userData.film;
        document.getElementById('drink').value = userData.drink;
        document.getElementById('hobby').value = userData.hobby;
        document.getElementById('music').value = userData.music;
    } else {
        document.getElementById('userName').value = '';
        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('color').value = '';
        document.getElementById('film').value = '';
        document.getElementById('drink').value = '';
        document.getElementById('hobby').value = '';
        document.getElementById('music').value = '';
    }
}

function createDropdown() {
    const userSelect = document.getElementById('userSelect');
    userSelect.innerHTML = '';
    for (const userName in usersData) {
        const option = document.createElement('option');
        option.value = userName;
        option.text = userName;
        userSelect.appendChild(option);
    }
}

function updateDropdown() {
    createDropdown();
}

function onSelectChange() {
    loadUserData();
}

function loadUser(selectedUser) {
    const userData = usersData[selectedUser];

    document.getElementById('name').value = userData.name;
    document.getElementById('date').value = userData.date;
    document.getElementById('color').value = userData.color;
    document.getElementById('film').value = userData.film;
    document.getElementById('drink').value = userData.drink;
    document.getElementById('hobby').value = userData.hobby;
    document.getElementById('music').value = userData.music;
}

const userSelect = document.getElementById('userSelect');
userSelect.addEventListener('change', function () {
    const selectedUser = this.value;
    loadUser(selectedUser);
});

function saveUsersDataToLocal() {
    const usersDataString = JSON.stringify(usersData);
    localStorage.setItem('usersData', usersDataString);
}

function loadUsersDataFromLocal() {
    const usersDataString = localStorage.getItem('usersData');
    if (usersDataString) {
        usersData = JSON.parse(usersDataString);
        updateDropdown();
    }
}

loadUsersDataFromLocal();

function addUser() {
    const newUser = document.getElementById('newUserName').value;
    if (newUser) {
        usersData[newUser] = {
            name: newUser,
            date: '',
            color: '',
            film: '',
            drink: '',
            hobby: '',
            music: ''
        };

        document.getElementById('newUserName').value = '';
        updateDropdown();
        saveUsersDataToLocal();
    }
}

function clearUsersList() {
    usersData = {};
    updateDropdown();
    saveUsersDataToLocal();
    loadUserData();
}


const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addUser);

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', clearUsersList);