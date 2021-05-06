export default class Translator {

    static keys = {
        en: {
            slogan : "Your heal, our priority",
            next_page : "Next"
        },
        fr: {
            slogan : "Votre santé, notre priorité",
            next_page : "Suivant"
        }
    }

    static translate(key="",language="en"){
        try {
            return Translator.keys[language][key];
        } catch (e) {
            throw new Error(`Can't translate "${key}" in "${language}" language`);
        }
    }

};