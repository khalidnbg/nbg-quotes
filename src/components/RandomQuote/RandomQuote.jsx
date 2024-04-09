import { useState } from "react";
import "./RandomQuote.css";
import twitter_icon from "../assets/twitter.png";
import refresh_icon from "../assets/refresh.png";
import Copy from "../Copy";

const RandomQuote = () => {
  let quotes = [];

  async function loadQuotes() {
    const response = await fetch("https://type.fit/api/quotes");
    quotes = await response.json();
  }

  const [quote, setQuote] = useState({
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  });

  const random = () => {
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
  };

  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.text} - ${
        quote.author.split(",")[0]
      }`
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${quote.text} - ${quote.author.split(",")[0]}`
    );
  };

  loadQuotes();

  return (
    <div className="container">
      <a href="#" className="btn-shine">
        NBG Quotes: Inspire, Reflect, Repeat
      </a>
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">- {quote.author.split(",")[0]}</div>
          <div className="icons">
            <img
              src={refresh_icon}
              onClick={() => {
                random();
              }}
            />
            <img
              src={twitter_icon}
              onClick={() => {
                twitter();
              }}
            />
            <Copy copyToClipboard={copyToClipboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
