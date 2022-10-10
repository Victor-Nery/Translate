const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

selectTag.forEach((tag,id )=>{
    for(const country_code in countries){
        let selected;
        if(id == 0 && country_code =='en-GB'){
            selected = 'selected';
        }else if(id == 1 && country_code == 'hi-IN'){
            selected = 'selected';
        }
        let option =`<option value='${country_code}'${selected}>${countries[country_code]}</options`;
        tag.insertAdjacentHTML('beforeend',option);
    }
});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});


translateBtn.addEventListener('click',()=>{
    let text = fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl).then(res => res.json()).then(data =>{
        console.log(data)
        toText.value = data.responseData.translatedText;
    })

})

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});