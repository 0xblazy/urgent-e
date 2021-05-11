export default class Translator {

    static keys = {
        en: {
            error: "ERROR 404",
            slogan : "Your heal, our priority",
            next_page : "Next",
            home: "Home",
            confidentiality: "Confidentiality",
            my_informations: "My Informations"
        },
        fr: {
            error: "ERREUR 404",
            slogan : "Votre santé, notre priorité",
            next_page : "Suivant",
            home: "Accueil",
            confidentiality: "Confidentialité",
            my_informations: "Mes Informations"
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