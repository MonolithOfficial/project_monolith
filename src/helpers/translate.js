import dictionary_geo_eng from '../translations/dictionary_geo_eng.json'

export function translate(word){
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("activeLang") === "GEO"){
            if(dictionary_geo_eng.hasOwnProperty(word)){
                return dictionary_geo_eng[word]
            }
        }
        else {
            return word
        }
    } else {
        console.log('we are running on the server');
    }
    
    
}