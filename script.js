const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtnEl = document.getElementById('copy-btn');
const shareBtnEl = document.getElementById('share-btn');
const tweetBtnEl = document.getElementById('tweet-btn');
const saveBtnEl = document.getElementById('save-btn');
const savedQuoteEl = document.getElementById('saved-quote')

let quotes = [
    {
        quoteText: `“The only way to do great work is to love what you do.”`,
        author: `Steve Jobs`
    },
    {
        quoteText: `“In the middle of every difficulty lies opportunity.”`,
        author: `Albert Einstein`
    },
    {
        quoteText: `“Success is not final, failure is not fatal: it is the courage to continue that counts.”`,
        author: `Winston Churchill`
    },
    {
        quoteText: `“Do what you can, with what you have, where you are.”`,
        author: `Theodore Roosevelt`
    },
    {
        quoteText: `“It always seems impossible until it’s done.”`,
        author: `Nelson Mandela`
    },
    {
        quoteText: `“Happiness depends upon ourselves.”`,
        author: `Aristotle`
    },
    {
        quoteText: `“Your time is limited, so don’t waste it living someone else’s life.”`,
        author: `Steve Jobs`
    },
    {
        quoteText: `“Believe you can and you’re halfway there.”`,
        author: `Amoo Ayomikun`
    },
    {
        quoteText: `“Turn your wounds into wisdom.”`,
        author: `Oprah Winfrey`
    },
    {
        quoteText: `“The future belongs to those who believe in the beauty of their dreams.”`,
        author: `Eleanor Roosevelt`
    },
    {
        quoteText: `“Act as if what you do makes a difference. It does.”`,
        author: `William James`
    },
    {
        quoteText: `“Dream big and dare to fail.”`,
        author: `Norman Vaughan`
    },
    {
        quoteText: `“Quality is not an act, it is a habit.”`,
        author: `Aristotle`
    },
    {
        quoteText: `“Start where you are. Use what you have. Do what you can.”`,
        author: `Arthur Ashe`
    },
]

let savedQuote = JSON.parse(localStorage.getItem("savedQuote")) || []
let currentQuoteIdx = 0;

function getRandomQuote(){
    let randomIdx;

    do{
        randomIdx = Math.floor(Math.random() * quotes.length)
    }while(randomIdx === currentQuoteIdx)
    
    currentQuoteIdx = randomIdx
    displayQuote()
}

function displayQuote(){
    let currentQuote = quotes[currentQuoteIdx]
    let currentQuoteText = currentQuote.quoteText
    let currentAuthor = currentQuote.author;

    quoteTextEl.textContent = currentQuoteText
    quoteAuthorEl.textContent = currentAuthor

    let index = savedQuote.findIndex(function(quote){
        return(
            quote.quoteText === currentQuote.quoteText &&
            quote.author === currentQuote.author
        )
    })

    if(index !== -1){
        saveBtnEl.innerText = "Saved"
    } else {
        saveBtnEl.innerText = "Save Quote"
    }
}

function copyQuote(){
    let currentQuote = quotes[currentQuoteIdx]
    let currentQuoteText = currentQuote.quoteText
    let currentAuthor = currentQuote.author;

    let conbinedObject = `"${currentQuoteText}" - ${currentAuthor}`

    navigator.clipboard.writeText(conbinedObject)
    copyBtnEl.innerText = "Copied"
    setTimeout(function(){
        copyBtnEl.innerText = "copy- Quote"
    }, 2000)
}

function shareWeb(){
    let currentQuote = quotes[currentQuoteIdx]
    let currentQuoteText = currentQuote.quoteText
    let currentAuthor = currentQuote.author;

    let conbinedObject = `${currentQuoteText} - ${currentAuthor}`

    if(navigator.share){
        navigator.share({
            title: "Inspirational Quote",
            text: conbinedObject,
            url: window.location.href
        })
    } else {
        alert("Sharing not supported on this browser.")
    }
}

function tweetQuote(){
    let currentQuote = quotes[currentQuoteIdx]
    let currentQuoteText = currentQuote.quoteText
    let currentAuthor = currentQuote.author;

    let conbinedObject = `${currentQuoteText} - ${currentAuthor}`

    let encodedText = encodeURIComponent(conbinedObject)
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`

    window.open(twitterUrl, "_blank")
}

function saveQuote(){
    let currentQuote = quotes[currentQuoteIdx]

    let findIndex = savedQuote.findIndex(function(quote){
        return(
            quote.quoteText === currentQuote.quoteText &&
            quote.author === currentQuote.author
        )
    })

    if(findIndex === -1){
        savedQuote.push(currentQuote)
        saveBtnEl.innerText = "Saved"
        
    }else{
        savedQuote.splice(findIndex, 1)
        saveBtnEl.innerText = "Save Quote"
    }

    displaySavedQuote()
    localStorage.setItem("savedQuote", JSON.stringify(savedQuote))
}

function displaySavedQuote(){
    savedQuoteEl.classList.remove('hidden')
    savedQuoteEl.innerHTML= ""

    let saveTitle = document.createElement('h1')
    saveTitle.innerText = "Saved Quotes"
    savedQuoteEl.appendChild(saveTitle)

    if(savedQuote.length === 0){
        savedQuoteEl.innerText = "No saved quotes yet.";
        return;
    }

    savedQuote.forEach(function(quote,index)  {
        let quoteItem = document.createElement('p')
        let removeBtn = document.createElement('button')
        removeBtn.innerText = "Remove"
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener('click', function(){
            savedQuote.splice(index, 1)
            localStorage.setItem("savedQuote", JSON.stringify(savedQuote))
            displaySavedQuote()
        })
        quoteItem.innerText = `${quote.quoteText} - ${quote.author}`

        quoteItem.appendChild(removeBtn)
        savedQuoteEl.appendChild(quoteItem)
    });
}


newQuoteBtn.addEventListener('click', getRandomQuote)
copyBtnEl.addEventListener('click', copyQuote)
shareBtnEl.addEventListener('click', shareWeb)
tweetBtnEl.addEventListener('click', tweetQuote)
saveBtnEl.addEventListener('click', saveQuote)

displaySavedQuote()
