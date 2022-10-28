const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;

}

//Show new Quote step 2
function newQuote() {
  loading();
  //Pick a random quote form api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check If author field is blank and replace with unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown Wise Person';
  } else {
    authorText.textContent = quote.author;
  }

  //Check Quote Length To determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //Set QUote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API step1
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error)
    //Catch Error Here
  }
}

//Tweet a Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

