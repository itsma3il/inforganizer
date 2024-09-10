window.onload = function () {
    fillData();
    updateUniversityList();
    updateReminderList();
    if (userData.length < 1 && reminders.length < 1 && universities.length < 1) {
        showModal('welcomeModal');
    }
};
// < DARK MODE BUTTON ---------------------------------------------------------
const toggleButton = document.getElementById("mode-toggle");
const theme = localStorage.getItem("theme") || null;
if (theme !== null) {
    document.body.classList.add('dark-mode');
}

toggleButton.addEventListener("click", () => {
    toggleButton.textContent = document.body.classList.contains("dark-mode")
        ? "Dark mode"
        : "Light mode";
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark-mode" : null);
});


// ACCORDION -----------------------------------------------------------------
let accordionButtons = document.querySelectorAll('h3');
accordionButtons.forEach(element => {
    element.addEventListener('click', () => {
        const content = element.nextElementSibling;
        console.log(content);

        let isHidden = content.style.height == "0px";

        let menuId = content.getAttribute('id');

        if (isHidden) {
            content.style.height = content.scrollHeight + 1 + 'px';
            isHidden = false;
        } else {
            content.style.height = 0;
            isHidden = true;
        }
    });
});

// TOGGLE ALL BUTTON ----------------------------------------------------------
const menu = document.querySelector('.menu');
const toggleMenu = document.querySelector('#toggleMenu');
toggleMenu.addEventListener('click', () => {
    if (toggleMenu.innerHTML === 'Menu') {
        toggleMenu.innerHTML = 'Close';
        menu.classList.add('menu-active')
    } else {
        toggleMenu.innerHTML = 'Menu';
        menu.classList.remove('menu-active');
    }
})
function notif(msg) {
    let notification = document.getElementById("notif");
    let message = document.getElementById("notif_msg");
    notification.style.opacity = 1;
    notification.style.transform = "translateY(0)";
    message.innerHTML = msg;
    setTimeout(() => {
        notification.style.opacity = 0;
        notification.style.transform = "translateY(-85px)";
    }, 1000);
}

function copyField(fieldId) {
    const field = document.getElementById(fieldId);
    navigator.clipboard
        .writeText(field.value)
        .then(() => {
            notif(`${field.value} copied to clipboard!`);
        })
        .catch((err) => {
            console.error("Could not copy text: ", err);
        });
}
// Retrieve universities from localStorage------------------------------------
const universities = JSON.parse(localStorage.getItem("universities")) || [];
// Function to add a university to the list---------------------------------------
let editingIndex = null;
const university_form = document.getElementById("university_form");
university_form.addEventListener('submit', (e) => {
    e.preventDefault();
    addUniversity();
})
function addUniversity() {
    let section = university_form.parentElement.parentElement;
    const universityInput = document.getElementById("university_input");
    const universityType = document.getElementById("university_type").value;
    const universityName = universityInput.value.trim();
    const universityStatus = document.getElementById("university_status").value;

    if (universityName !== "") {
        if (editingIndex !== null) {
            universities[editingIndex] = {
                name: universityName,
                type: universityType,
                status: universityStatus
            };
            editingIndex = null;
            notif('University updated successfully!');
        } else {
            universities.push({
                name: universityName,
                type: universityType,
                status: universityStatus
            });
            section.style.height = section.scrollHeight + 15 + 'px';
            console.log(section.scrollHeight + 15, 'added size');

            notif('University added successfully!');
        }
        updateUniversityList();
        universityInput.value = "";
        saveUniversities();
    } else {
        notif("Please enter a university name.");
    }
}

function deleteAllUniversities() {
    let section = university_form.parentElement.parentElement;

    if (confirm("Are you sure you want to delete all universities?")) {
        universities.splice(0, universities.length);
        updateUniversityList();
        saveUniversities();
        section.style.height = section.firstElementChild.scrollHeight + 'px';
        console.log(section.firstElementChild.scrollHeight, 'minus size');

        notif('All universities deleted successfully!');
    }
}

// Function to update the university list display----------------------------------
function updateUniversityList() {
    const universityList = document.getElementById("university_list");
    universityList.innerHTML = "";

    universities.forEach((university, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
           ${index + 1}. ${university.name} - ${university.type} 
            <span data-i18n="status">Status: ${university.status}</span>
            <span>
                <button onclick="editUniversity(${index})" class="university-crud-btn blue">Update</button>
                <button onclick="deleteUniversity(${index})" class="university-crud-btn red">Delete</button>
            </span>
        `;
        universityList.appendChild(li);
    });
}
// Function to edit a university entry---------------------------------------------
function editUniversity(index) {
    const university = universities[index];
    document.getElementById("university_input").value = university.name;
    document.getElementById("university_type").value = university.type;
    editingIndex = index;
}
// Function to delete a university entry with confirmation-------------------------
function deleteUniversity(index) {
    if (confirm("Are you sure you want to delete this university?")) {
        universities.splice(index, 1);
        updateUniversityList();
        saveUniversities(); // Save to localStorage
        notif('University deleted successfully!');
    }
}
// Function to save the universities to localStorage--------------------------------
function saveUniversities() {
    localStorage.setItem("universities", JSON.stringify(universities));
}

// Function to export data
function exportData() {
    saveData();
    const data = {
        userData: JSON.parse(localStorage.getItem("userData")) || [],
        universities: JSON.parse(localStorage.getItem("universities")) || [],
        reminders: JSON.parse(localStorage.getItem("reminders")) || []
    };
    const dataStr = JSON.stringify(data);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'university_application_data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
// Function to import data
function importData(event) {
    let importInput = document.getElementById('importData');
    importInput.click();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem("userData", JSON.stringify(data.userData));
            localStorage.setItem("universities", JSON.stringify(data.universities));
            localStorage.setItem("reminders", JSON.stringify(data.reminders));
            fillData();
            updateUniversityList();
            notif('Data imported successfully!');
        } catch (error) {
            console.error('Error importing data:', error);
            notif('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
    window.location.reload();
}

const userData = JSON.parse(localStorage.getItem("userData")) || [];
function saveData() {
    try {
        let inputs = document.querySelectorAll("input");
        let data = [];
        inputs.forEach((input, i) => {
            if (input.value != '' && input.value != null) {
                data[i] = { id: input.id, value: input.value.trim() };
            }
        });
        localStorage.setItem('userData', JSON.stringify(data));
        notif('Your Information has been saved!');
    } catch (err) {
        console.log(err);
    }
}

function fillData() {
    if (userData) {
        userData.forEach((data) => {
            if (data !== null) {
                document.getElementById(data.id).value = data.value
            }
        })
    }
}

function clearAllData() {
    localStorage.clear();
    window.location.reload();
}
document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveData();
    }
});
function showModal(id) {
    if (id) {
        let m = document.getElementById(id);
        m.style.display = 'block';
    }
}
function closeModal(id) {
    if (id) {
        let m = document.getElementById(id);
        m.style.display = 'none';
    }
}
// window.onclick = function (event) {
//     let m = document.querySelector('#welcomeModal');
//     if (m) {
//         m.style.display = 'none';
//     }
// };
function setDefaultDateTime() {
    const reminderDate = document.getElementById("reminder_date");
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate.toISOString().slice(0, 16);
    reminderDate.value = formattedDate;
}
setDefaultDateTime();
let reminderBtn = document.getElementById("reminder-btn");
reminderBtn.addEventListener('click', () => showModal("reminderModal"))

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

const reminderForm = document.getElementById("reminder_form");
const reminderDate = document.getElementById("reminder_date");
const reminderText = document.getElementById("reminder_text");
reminderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (reminderText.value && reminderDate.value) {
        reminders.push({ text: reminderText.value, date: reminderDate.value });
        saveReminders();
        updateReminderList();
        notif('Reminder added successfully!');
        reminderText.value = "";
    } else {
        notif('Please enter both reminder text and date.');
    }
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});
function saveReminders() {
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

function updateReminderList() {
    const reminderList = document.getElementById("reminders-container");
    reminderList.innerHTML = "";

    reminders.forEach((reminder, index) => {
        const localDate = new Date(reminder.date).toLocaleString();

        const fieldset = document.createElement("fieldset");
        fieldset.innerHTML = `
           <legend>Reminder</legend>
            <ul class="reminder_list">
                <li>
                    ${reminder.text}  <span>${localDate}</span>
                    <button onclick="deleteReminder(${index})" class="red" >Delete</button>
                </li>
            </ul>
        `;
        reminderList.appendChild(fieldset);
    });
}
function editReminder(index) {
    const reminder = reminders[index];
    reminderText.value = reminder.text;
    reminderDate.value = reminder.date;
    reminders.splice(index, 1);
    saveReminders();
    updateReminderList();
    notif('Reminder edited successfully!');
}

function deleteReminder(index) {
    reminders.splice(index, 1);
    saveReminders();
    updateReminderList();
    notif('Reminder deleted successfully!');
}

function checkReminders() {
    const today = new Date().toISOString().split('T')[0];
    reminders.forEach(reminder => {
        if (reminder.date >= today) {
            notif(`Reminder: ${reminder.text}`);
            showModal('reminderModal');
        }
    });
}

// Call checkReminders() when the page loads
window.addEventListener('load', checkReminders);

/*
let menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const content = document.querySelector(link.getAttribute('href'));
        let isHidden = content.style.height == "0px";
        // Open the clicked section
        if (isHidden && !link.classList.contains('active')) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = 0;
        }
        link.classList.toggle('active');
    });
});
*/