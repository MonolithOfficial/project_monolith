import dictionary_geo_eng from '../translations/dictionary_geo_eng.json'

export function translate(word){
    if (localStorage.getItem("activeLang") === "GEO"){
        // if(dictionary_geo_eng.hasOwnProperty(word)){
        //     return dictionary_geo_eng[word]
        // }
        return "kek"
    }
    else {
        return word
    }
    
}