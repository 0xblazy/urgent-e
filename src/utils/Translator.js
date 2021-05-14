export default class Translator {

    static keys = {
        en: {
            error: "ERROR 404",
            slogan : "Your health, our priority",
            slide_1: "The application that helps you manage your daily health, alerts you in an emergency and facilitates your emergency care.",
            slide_2: "Connect your device with a single click to view your constants at any time.",
            slide_3: "Fill in your symptoms, personal information and location, we'll take care of the rest!",
            slide_4: "An emergency ? Urgent-E makes it easy for you to access the emergency department of your choice: the fastest, the closest or both!",
            next_page: "Next",
            skip: "SKIP",
            cancel: "CANCEL",
            finish: "FINISH",
            dashboard: "Dashboard",
            confidentiality: "Confidentiality",
            confi_1: "In the event of an emergency, your personal data will only be transferred to the emergency services of the hospital where you will be treated.",
            confi_2: "Your data will not be marketed or transmitted to external parties.",
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
            next_page: "Suivant",
            skip: "PASSER",
            cancel: "ANNULER",
            finish: "TERMINER",
            dashboard: "Tableau de bord",
            confidentiality: "Confidentialité",
            confi_1: "En cas d'urgence, vos données personnelles ne seront transférées qu'aux services d'urgences de l'hôpital auquel vous serez traité.",
            confi_2: "Vos données ne seront pas commercialisées ou transmises à des parties extérieures.",
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