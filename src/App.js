import React, { useState, useEffect } from 'react';
import './index.css';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import initFontAwesome from './initFontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

initFontAwesome();

let quoteDBUrl =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
    const [quote, setQuote] = useState('Work is 10% what happens to me and 90% of how I react to it.');
    const [author, setAuthor] = useState('Charles Swindoll');
    const [quotesArray, setQuotesArray] = useState(null);
    const [accentColor, setAccentColor] = useState('#282c34');
    // const [randomNumber, setRandomNumber] = useState(0);
    const [show, setShow] = useState(false);

    const fetchQuotes = async (url) => {
        const response = await fetch(url);
        const parsedJSON = await response.json();
        setQuotesArray(parsedJSON.quotes);
    };

    // const httpRequest = (url) => {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = handleResult;
    //     xhr.open('GET', url, true);
    //     xhr.send();

    //     function handleResult() {
    //         if (xhr.readyState === XMLHttpRequest.DONE) {
    //             setQuotesArray(JSON.parse(xhr.responseText).quotes);
    //         }
    //     }
    // };

    useEffect(() => {
        fetchQuotes(quoteDBUrl);
        // httpRequest(quoteDBUrl);
    }, [quote]);

    const getRandomQuote = () => {
        let randomInteger = Math.floor(quotesArray.length * Math.random());
        // setRandomNumber(randomInteger);
        setAccentColor(COLORS_ARRAY[randomInteger]);
        setQuote(quotesArray[randomInteger].quote);
        setAuthor(quotesArray[randomInteger].author);
        setShow(!show);
    };

    return (
        <div className="App">
            <header className="App-header" style={{ backgroundColor: accentColor }}>
                <div id="quote-box" style={{ color: accentColor }}>
                    <h2 id="text " className={show ? 'show' : 'hide'}>
                        <span id="quote-icon"></span>"{quote}"
                    </h2>
                    <p className={show ? 'show' : 'hide'} id="author">
                        - {author}
                    </p>
                    <div className="buttons">
                        <a
                            id="tweet-quote"
                            style={{ backgroundColor: accentColor }}
                            href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}
                        >
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </a>
                        <a
                            id="tumblr-quote"
                            style={{ backgroundColor: accentColor }}
                            href={`https://www.tumblr.com/login`}
                        >
                            <FontAwesomeIcon icon={['fab', 'tumblr']} />
                        </a>

                        <button
                            id="new-quote"
                            style={{ backgroundColor: accentColor }}
                            onClick={() => {
                                getRandomQuote();
                            }}
                        >
                            New Quote
                        </button>
                        {/* <FontAwesomeIcon icon={faTwitter} /> */}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
