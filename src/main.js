window.onload = function () {
    fillData();
    updateUniversityList();
    updateReminderList();
    switchTheme();
    LoadShowHideColumn();
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
    let theme = localStorage.getItem('theme');
    if (theme === 'dark-mode') {

        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', null);
        document.getElementById('mode-toggle').innerHTML = 'Dark';
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        document.getElementById('mode-toggle').innerHTML = 'Light';
    }
});
function switchTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === null) {
        // Check for user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark-mode';
        } else {
            theme = 'light-mode';
        }
        localStorage.setItem('theme', theme);
    }

    if (theme === 'dark-mode') {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-toggle').innerHTML = 'Light';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('mode-toggle').innerHTML = 'Dark';
    }
}


// ACCORDION -----------------------------------------------------------------
let accordionButtons = document.querySelectorAll('h3');
accordionButtons.forEach(element => {
    element.addEventListener('click', () => {
        const content = element.nextElementSibling;

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
let closeAll = document.getElementById('closeAll-toggle');
closeAll.addEventListener('click', () => {
    let sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.style.height !== '0px') {
            section.style.height = 0;
        }
    })
})
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
                status: universityStatus,
                createdAt: universities[editingIndex].createdAt,
                updatedAt: new Date().toISOString()
            };
            editingIndex = null;
            notif('University updated successfully!');
        } else {
            universities.push({
                name: universityName,
                type: universityType,
                status: universityStatus,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            section.style.height = section.scrollHeight + 15 + 'px';
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
        const tr = document.createElement("tr");
        university.status == 'Rejected' && tr.classList.add('rejected');
        const createdDate = university.createdAt ? new Date(university.createdAt) : new Date(university.updatedAt);
        const formattedDate = isNaN(createdDate) ? 'N/A' : createdDate.toLocaleDateString();
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${university.name}</td>
            <td>${university.type}</td>
            <td>${university.status}</td>
            <td>${formattedDate}</td>
            <td>
                <button onclick="editUniversity(${index})" class="university-crud-btn blue">Update</button>
                <button onclick="deleteUniversity(${index})" class="university-crud-btn red">Delete</button>
            </td>
        `;
        universityList.appendChild(tr);
    });
    LoadShowHideColumn();
}
// Function to edit a university entry---------------------------------------------
function editUniversity(index) {
    const university = universities[index];
    document.getElementById("university_input").value = university.name;
    document.getElementById("university_type").value = university.type;
    document.getElementById("university_status").value = university.status;
    editingIndex = index;

    // Change the submit button text to "Update"
    document.querySelector('button[type="submit"]').textContent = 'Update';

    // Scroll to the form
    document.querySelector('h3[data-i18n="afterBaccalaureate"]').scrollIntoView({ behavior: 'smooth' });
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

function sortUniversities(e, sortBy) {
    let sortButton = e.target;
    if (sortBy === "name") {
        if (sortButton.textContent === 'Name ↓') {
            sortButton.textContent = 'Name ↑';
            universities.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            sortButton.textContent = 'Name ↓';
            universities.sort((a, b) => a.name.localeCompare(b.name));
        }
    } else if (sortBy === "type") {
        if (sortButton.textContent === 'Type ↓') {
            sortButton.textContent = 'Type ↑';
            universities.sort((a, b) => b.type.localeCompare(a.type));
        } else {
            sortButton.textContent = 'Type ↓';
            universities.sort((a, b) => a.type.localeCompare(b.type));
        }
    } else if (sortBy === "status") {
        if (sortButton.textContent === 'Status ↓') {
            sortButton.textContent = 'Status ↑';
            universities.sort((a, b) => b.status.localeCompare(a.status));
        } else {
            sortButton.textContent = 'Status ↓';
            universities.sort((a, b) => a.status.localeCompare(b.status));
        }
    } else if (sortBy === "created_at") {
        if (sortButton.textContent === 'Date ↓') {
            sortButton.textContent = 'Date ↑';
            universities.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return dateB - dateA;
            });
        } else {
            sortButton.textContent = 'Date ↓';
            universities.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return dateA - dateB;
            });
        }
    }
    updateUniversityList();
}

function toggleDropdown(e) {
    let dropdown = e.target.nextElementSibling;
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'flex';
    } else {
        dropdown.style.display = 'none';
    }
}
const tableDropdownInputs = document.querySelectorAll('.dropdown table td input');
tableDropdownInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
        ShowHideColumn(index, input.checked);
    })
})
function LoadShowHideColumn() {
    tableDropdownInputs.forEach((input, index) => {
        ShowHideColumn(index, input.checked);
    })
}

function ShowHideColumn(index, checked) {
    let table = document.querySelector('.tableList');
    let tableHeaders = table.querySelectorAll('th');
    let tableRows = table.querySelectorAll('tbody tr');
    if (!checked) {
        tableHeaders[index].style.display = 'none';
        tableRows.forEach(row => {
            row.children[index].style.display = 'none';
        });
    } else {
        tableHeaders[index].style.display = 'table-cell';
        tableRows.forEach(row => {
            row.children[index].style.display = 'table-cell';
        });
    }
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
    if ((event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'S')) {
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
// Close modal when clicking outside
window.onclick = function (event) {
    let modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
};
function setDefaultDateTime() {
    const reminderDate = document.getElementById("reminder_date");
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDate = currentDate.toISOString().slice(0, 16);
    reminderDate.value = formattedDate;
}
setDefaultDateTime();
let reminderBtn = document.getElementById("reminder-btn");
reminderBtn.addEventListener('click', () => {
    showModal('reminderModal');
    document.getElementById("reminder_text").focus();
})

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


// SEARCH MODAL ----------------------------------------------------------------
const searchModal = document.getElementById("searchModal");
// in ctrl + f open search modal
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        showModal('searchModal');
        document.getElementById("search_text").focus();
    }
});
const searchForm = document.getElementById("search_form");
searchForm.firstElementChild.addEventListener('keyup', () => {
    let searchText = searchForm.firstElementChild.value.toLowerCase();
    if (searchText.length > 2) {
        searchStorage();
    } else {
        clearSearch();
    }
})
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
// search Local Storage
function clearSearch() {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
}
function searchStorage() {
    const searchText = document.getElementById("search_text").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    // Search universities
    const universityResults = universities.filter(university =>
        university.name.toLowerCase().includes(searchText) ||
        university.type.toLowerCase().includes(searchText) ||
        university.status.toLowerCase().includes(searchText)
    );

    // Search userData
    const userDataResults = userData.slice(2).filter(data => {
        if (typeof data === 'object' && data !== null) {
            return (data.id && data.id.toLowerCase().includes(searchText)) ||
                (data.value && data.value.toLowerCase().includes(searchText));
        }
        return false;
    });
    let copiedSvg = `<svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.08008 14.9998L8.03008 16.9498L11.9201 13.0498" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    let copySvg = `<svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

    // Display university results
    if (universityResults.length > 0) {
        searchResults.innerHTML += "<h5>Universities:</h5>";
        const ul = document.createElement("ul");
        universityResults.forEach(university => {
            const li = document.createElement("li");
            li.textContent = `${university.name} - ${university.type} - ${university.status}`;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
    }

    // Display userData results
    if (userDataResults.length > 0) {
        searchResults.innerHTML += "<h5>User Data:</h5>";
        let labels = document.querySelectorAll('label');
        let ul = document.createElement("ul");
        userDataResults.forEach(data => {
            if (data.id != '' && data != '') {
                let li = document.createElement("li");
                labels.forEach(label => {
                    if (label.getAttribute('for') === data.id) {
                        li.innerHTML = `<span>${label.textContent} : ${data.value}</span>
                        <button class="search-result-btn" onClick="copyField('${data.id}')">${copySvg}</button>`;
                        li.id = data.id;
                    }
                });
                ul.appendChild(li);
            }
        });
        searchResults.appendChild(ul);
    }

    if (universityResults.length === 0 && userDataResults.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
    }
}
