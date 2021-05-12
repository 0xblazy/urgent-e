export default class Translator {

    static keys = {
        en: {
            error: "ERROR 404",
            slogan : "Your heal, our priority",
            slide_1: "The application that helps you manage your daily health, alerts you in an emergency and facilitates your emergency care.",
            slide_2: "Connect your device with a single click to view your constants at any time.",
            slide_3: "Fill in your symptoms, personal information and location, we'll take care of the rest!",
            slide_4: "An emergency ? Urgent-E makes it easy for you to access the emergency department of your choice: the fastest, the closest or both!",
            next_page : "Next",
            skip: "SKIP",
            finish: "FINISH",
            dashboard: "Dashboard",
            confidentiality: "Confidentiality",
            my_informations: "My Informations",
            emergency: "Emergency"
        },
        fr: {
            error: "ERREUR 404",
            slogan : "Votre santé, notre priorité",
            slide_1: "L'application qui vous aide à gérer votre santé au quotidien, vous alerte en cas d'urgence et facilite votre prise en charge en service urgentiste.",
            slide_2: "Connectez votre appareil d'un simple clic pour consulter vos constantes à tout moment.",
            slide_3: "Renseignez vos symptômes, informations personnelles et localisation, nous nous chargeons du reste !",
            slide_4: "Une urgence ? Urgent-E vous facilite l'accès au service des urgences de votre choix : le plus rapide, le plus proche ou les deux !",
            next_page : "Suivant",
            skip: "PASSER",
            finish: "TERMINER",
            dashboard: "Tableau de bord",
            confidentiality: "Confidentialité",
            my_informations: "Mes Informations",
            emergency: "Urgences"
        }
    }

    static translate(key="", language="fr"){
        try {
            return Translator.keys[language][key];
        } catch (e) {
            throw new Error(`Can't translate "${key}" in "${language}" language`);
        }
    }
};