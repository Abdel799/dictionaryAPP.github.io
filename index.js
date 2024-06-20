const inputEl = document.getElementById('input');
const infoTextEl = document.getElementById('info-text');
const meaningContainerEl = document.getElementById('meaning-container');
const titleEl = document.getElementById('title');
const meaningEl = document.getElementById('meaning');
const audioEl = document.getElementById('audio');
const audioMsg = document.getElementById('audio-fail');

async function fetchAPI(word){

    try {
        infoTextEl.style.display = 'block';
        meaningContainerEl.style.display = 'none';
        audioMsg.style.display = 'none';

        infoTextEl.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        if(result.title){                   // if theres a title in the result that means there's an error
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = 'block';
            titleEl.innerText = word
            meaningEl.innerText = 'N/A';
            audioEl.style.display = 'none';
            audioMsg.style.display = 'block';
        }

        else{
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = 'block';

            if (result[0].phonetics[0].audio === ""){
                audioEl.style.display = 'none';
                audioMsg.style.display = 'block';
            }
            else{
                audioEl.style.display = 'inline-flex';
            }
            
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;

           
        }

       

    } catch (error) {
        console.log(error);
        infoTextEl.innerText = `An error has occured, please try again.`;
    }
    
    
}

inputEl.addEventListener("keyup", (e)=>{

    if(e.target.value && e.key ==="Enter"){     // e.target.value is the word the user entered, e.key is the key they pressed on the keyboard
        fetchAPI(e.target.value);
    }


});
