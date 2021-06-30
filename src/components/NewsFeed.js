import React, {useEffect, useState} from 'react';

const NewsFeed = (props) => {

    const [news, setNews] = useState([])

    useEffect(() => {
      setNews(props.news)
    }, [props]);

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
