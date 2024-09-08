const translations = {
  en: {
    title: "Enter your name",
    subTitle: "Enter your profession",
    // Personal Information
    personalInformation: "Personal Information",
    lastName: "Last Name",
    firstName: "First Name",
    phoneNumber: "Phone Number",
    email: "Email",
    massar: "Massar",
    passwordApplications: "Password Applications",

    // National Card
    nationalCard: "National Card",
    cin: "CIN",
    placeOfBirth: "Place of Birth",
    address: "Address",
    fatherCin: "Father's CIN",
    fatherDateOfBirth: "Father's Date of Birth",
    fatherProfession: "Father's Profession",
    motherCin: "Mother's CIN",
    motherDateOfBirth: "Mother's Date of Birth",
    motherProfession: "Mother's Profession",

    // Baccalaureate
    baccalaureate: "Baccalaureate",
    institution: "Institution",
    provincialDirection: "Provincial Direction",
    session: "Session",
    year: "Year",
    mention: "Mention",
    regional: "Regional",
    national: "National",
    continuousAssessment: "Continuous Assessment",
    generalAverage: "General Average",

    // After Baccalaureate
    afterBaccalaureate: "After Baccalaureate",
    specialty: "Specialty",
    promotion: "Promotion",
    firstYear: "1st Year (2023)",
    secondYear: "2nd Year (2024)",
    synthesisTest: "Synthesis Test/100",
    generalMean: "General Mean",

    // University Applications
    universityApplications: "University Applications",
    name: "Name",
    cycleIngenieur: "Engineering Cycle (CI)",
    licenceProfessionnelle: "Professional License (LP)",
    licenceExcellence: "Excellence License (LE)",
    applied: "Applied",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    add: "Add",
    appliedUniversities: "Applied Universities",

    // Buttons and Actions
    copy: "Copy",
    clear: "Clear",
    save: "Save",
    export: "Export",
    import: "Import",
    clearAllData: "Clear All Data",
    reminders: "Reminders",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    menu: "Menu",

    // Modal
    welcome: "Welcome!",
    welcomeMessage: "Welcome to the University Application Manager. This app helps you organize your personal information, academic records, and track your university applications efficiently. You can save your information, modify it anytime, and even add new sections or fields as needed.",
    appDescription1: "This app helps you organize your personal information, academic records, and track your university applications efficiently.",
    appDescription2: "You can save your information, modify it anytime, and even add new sections or fields as needed.",
    rememberToSave1: "Don't forget to save your data.",
    rememberToSave2: 'To save your data use CTRL + S or the Save button below.',
    rememberToSave3: 'To clear your data use the Clear All button in the bottom left.',
    rememberToSave4: 'To switch theme use the mode button in the bottom right.',
    haveFun: "Have fun!",
    letsGetStarted: "Let's Get Started!",

    // Notifications
    success: "Success",
  },
  fr: {
    title: "Entrez votre nom",
    subTitle: "Entrez votre profession",
    // Informations Personnelles
    personalInformation: "Informations Personnelles",
    lastName: "Nom",
    firstName: "Prénom",
    phoneNumber: "Numéro de téléphone",
    email: "Email",
    massar: "Massar",
    passwordApplications: "Mots de passe des applications",

    // Carte Nationale
    nationalCard: "Carte Nationale",
    cin: "CIN",
    placeOfBirth: "Lieu de naissance",
    address: "Adresse",
    fatherCin: "CIN du père",
    fatherDateOfBirth: "Date de naissance du père",
    fatherProfession: "Profession du père",
    motherCin: "CIN de la mère",
    motherDateOfBirth: "Date de naissance de la mère",
    motherProfession: "Profession de la mère",

    // Baccalauréat
    baccalaureate: "Baccalauréat",
    institution: "Établissement",
    provincialDirection: "Direction Provinciale",
    session: "Session",
    year: "Année",
    mention: "Mention",
    regional: "Régional",
    national: "National",
    continuousAssessment: "Contrôle Continu",
    generalAverage: "Moyenne Générale",

    // Après Bac
    afterBaccalaureate: "Après Bac",
    specialty: "Spécialité",
    promotion: "Promotion",
    firstYear: "1ère Année (2023)",
    secondYear: "2ème Année (2024)",
    synthesisTest: "Épreuve Synthèse/100",
    generalMean: "Moyenne Générale",

    // Candidatures Universitaires
    universityApplications: "Candidatures Universitaires",
    name: "Nom",
    cycleIngenieur: "Cycle Ingénieur (CI)",
    licenceProfessionnelle: "Licence Professionnelle (LP)",
    licenceExcellence: "Licence d'Excellence (LE)",
    applied: "Postulé",
    pending: "En attente",
    accepted: "Accepté",
    rejected: "Rejeté",
    add: "Ajouter",
    appliedUniversities: "Universités postulées",

    // Boutons et Actions
    copy: "Copier",
    clear: "Effacer",
    save: "Enregistrer",
    export: "Exporter",
    import: "Importer",
    clearAllData: "Effacer toutes les données",
    reminders: "Rappels",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    menu: "Menu",

    // Modal
    welcome: "Bienvenue !",
    welcomeMessage: "Bienvenue dans le Gestionnaire de Candidatures Universitaires. Cette application vous aide à organiser vos informations personnelles, vos dossiers académiques et à suivre vos candidatures universitaires efficacement. Vous pouvez sauvegarder vos informations, les modifier à tout moment et même ajouter de nouvelles sections ou champs si nécessaire.",
    appDescription1: "Cette application vous aide à organiser vos informations personnelles, vos dossiers académiques et à suivre vos candidatures universitaires de manière efficace.",
    appDescription2: "Vous pouvez sauvegarder vos informations, les modifier à tout moment et même ajouter de nouvelles sections ou champs selon vos besoins.",
    rememberToSave1: "N'oubliez pas de sauvegarder vos données. ",
    rememberToSave2: "Pour sauvegarder vos données, utilisez CTRL + S ou le bouton Enregistrer ci-dessous. ",
    rememberToSave3: "Pour effacer vos données, utilisez le bouton Effacer tout en bas à gauche. ",
    rememberToSave4: "Pour changer de thème, utilisez le bouton de mode en bas à droite.",
    haveFun: "Amusez-vous bien !",
    letsGetStarted: "Commençons !",

    // Notifications
    success: "Succès",
  }
};

let currentLanguage = 'en'; // Default language

function setLanguage(lang) {
  currentLanguage = lang;
  updatePageLanguage();
}

function updatePageLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  // Update placeholder texts
  const inputElements = document.querySelectorAll('input[data-i18n-placeholder]');
  inputElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', updatePageLanguage);