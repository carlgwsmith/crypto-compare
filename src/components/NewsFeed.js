import React, {useEffect, useState} from 'react';
import Truncate from 'react-truncate';

const NewsFeed = (props) => {

    const [news, setNews] = useState([])

    useEffect(() => {
    fetch("https://free-news.p.rapidapi.com/v1/search?q=Crypto%20"+props.coinName+"&lang=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "free-news.p.rapidapi.com"
    }
    })
    .then(response => {
        if(response.ok){
            response.json().then((json) => {
                console.log(json.articles)
                setNews(json.articles)
            })
            }
    })
    .catch(err => {
        console.error(err);
    });
    }, [props.name]);

    return (
        <>
            {news.slice(0,6).map((article, index) => (
              <div key={index} className="col-sm-4">
                <a href={article.link}>
               <p className="newsHeadline">{article.title}</p>
               <p className="via">{article.clean_url}</p>
               <p className="newsSummary">{article.summary}</p>
               </a>
              </div>
            ))}
        </>
    );
}

export default NewsFeed;
