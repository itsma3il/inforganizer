window.onload = function () {
    fillData();
    updateUniversityList();
    updateTheme()
    if (userData.length < 1) {
        showModal('welcomeModal');
    }
};
// <DARK MODE BUTTON ---------------------------------------------------------
const toggleButton = document.getElementById("mode-toggle");
toggleButton.addEventListener("click", () => {
    toggleButton.textContent = document.body.classList.contains("dark-mode")
        ? "Light"
        : "Dark";
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.removeItem("theme");
    }

});
function updateTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.body.classList.add(theme);
    }
}


// ACCORDION -----------------------------------------------------------------
let accordionButtons = document.querySelectorAll('h3');
accordionButtons.forEach(element => {
    element.addEventListener('click', () => {
        const content = element.nextElementSibling;
        let isHidden = content.style.height == "0px";

        let menuId = content.getAttribute('id');
        let link = document.querySelector(`a[href="#${menuId}"]`);

        if (isHidden) {
            content.style.height = content.scrollHeight + 'px';
            link.classList.add('active');
            isHidden = false;
        } else {
            content.style.height = 0;
            link.classList.remove('active');
            isHidden = true;
        }
    });
});

// TOGGLE ALL BUTTON ----------------------------------------------------------
const sections = document.querySelectorAll('section');
const menu = document.querySelector('.menu');
const all = document.querySelector('#all');
all.addEventListener('click', () => {
    if (all.innerHTML === 'All') {
        all.innerHTML = 'Close';
        menu.classList.add('menu-active')
    } else {
        all.innerHTML = 'All';
        menu.classList.remove('menu-active');
    }
    sections.forEach(ele => {
        if (ele.style.height === '0px') {
            ele.style.height = ele.scrollHeight + 'px';
        } else {
            ele.style.height = 0;
        }
    })
})
// // SCROLL LINKS --------------------------------------------------------------
window.addEventListener("scroll", function () {
    const menuLinks = document.querySelectorAll(".menu a");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 5) {
            currentSection = section.getAttribute("id");
        }
    });

    menuLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
            link.classList.add("active");
        }
    });
});
function notif(msg) {
    let notification = document.getElementById("notif");
    let message = document.getElementById("notif_msg");
    notification.style.opacity = 1;
    message.innerHTML = msg;
    setTimeout(() => {
        notification.style.opacity = 0;
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
// CRUD universities ADD DELETE UPDATE----------------------------------------
// Retrieve universities from localStorage------------------------------------
const universities =
    JSON.parse(localStorage.getItem("universities")) || [];

// Function to add a university to the list---------------------------------------
let editingIndex = null;

let university_form = document.getElementById("university_form");
university_form.addEventListener('submit', (e) => {
    e.preventDefault();
    addUniversity();
})
function addUniversity() {
    const universityInput = document.getElementById("university_input");
    const universityType = document.getElementById("university_type").value;
    const universityName = universityInput.value.trim();
    const universityStatus = document.getElementById("university_status").value; // Add this line

    if (universityName !== "") {
        if (editingIndex !== null) {
            universities[editingIndex] = {
                name: universityName,
                type: universityType,
                status: universityStatus // Add this line
            };
            editingIndex = null;
            notif('University updated successfully!');
        } else {
            universities.push({
                name: universityName,
                type: universityType,
                status: universityStatus // Add this line
            });
            notif('University added successfully!');
        }
        updateUniversityList();
        universityInput.value = "";
        saveUniversities();
    } else {
        notif("Please enter a university name.");
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
            <span>Status: ${university.status}</span>
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
// Load the university list on page load--------------------------------------------

// Function to export data
function exportData() {
    saveData();
    const data = {
        userData: JSON.parse(localStorage.getItem("userData")) || [],
        universities: JSON.parse(localStorage.getItem("universities")) || []
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

// Show Welcome Modal
function showModal(id) {
    if (id) {
        let m = document.getElementById(id);
        m.style.display = 'block';
    }
}

// Close Welcome Modal
function closeModal(id) {
    if (id) {
        let m = document.getElementById(id);
        m.style.display = 'none';
    }
}

// Close modal if user clicks outside the modal content
window.onclick = function (event) {
    let m = document.querySelector('#welcomeModal');
    if (m) {
        m.style.display = 'none';
    }
};



// MODAL ---------------------------------------------------------------------
/*
const urlFiles = {
    'bac': "./Files/BAC/MOUSDIK_ISMAIL_BAC_RECTO.pdf",
    'dts': "./Files/DTS/MOUSDIK_ISMAIL_DTS_NOTES.pdf",
    'carte': "./Files/CIN/MOUSDIK_ISMAIL_CIN_RECTO.pdf"
};

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal-body");
const closeButton = document.querySelector(".close-button");

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Event listener for the close button
closeButton.addEventListener("click", closeModal);

// Event listener for the Escape key to close the modal
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Function to show the modal with dynamic content
function showModal(type) {
    let url = urlFiles[type];
    let mContent = document.getElementById('m-content');
    let mTitle = document.getElementById('m-title');
    mTitle.textContent = type;
    mContent.innerHTML = `<embed src="${url}" width="650" height="600">`;
    modal.style.display = "flex";
}
*/



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