const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function ShowLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
    ShowLoadingSpinner();
    // pick a random quote from api quotes array
    const quote = apiQuotes[ Math.floor( Math.random() * apiQuotes.length ) ];
    // check if author text exists
    if ( !quote.author ){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    // check quote lenght
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    ShowLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch the error
        alert('Oops, try again later!');
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on page load
getQuotes();