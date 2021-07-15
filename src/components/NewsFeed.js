import React, {useEffect, useState} from 'react';

const NewsFeed = (props) => {

    const [news, setNews] = useState([])

    useEffect(() => {
      setNews(props.news)
    }, [props]);

    function truncateString(string, limit) {
      if (string.length > limit) {
        return string.substring(0, limit) + "..."
      } else {
        return string
      }
    }

    return (
        <>
            {news.slice(0,6).map((article, index) => (
              <div key={index} className="col-sm-4">
                <div className="news">
                <a href={article.link}>
                  <img style={{backgroundImage: "url('"+article.media +"')"}} className="articleImage"></img>
                  <p className="newsHeadline">{truncateString(article.title, 40)}</p>
                  <p className="via">{article.author} | {article.clean_url}</p>
                  <p className="newsSummary">{truncateString(article.summary, 200)}</p>
                </a>
               </div>
              </div>
            ))}
        </>
    );
}

export default NewsFeed;
