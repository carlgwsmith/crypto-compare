import React, {useEffect, useState} from 'react';

const PortfolioNews = () => {
const [news, setNews] = useState([])
const [loading, setLoading]=useState(false)
// const [useNews, setUsedNews] = useState([])

// for(let i = 0; i < setNews.length; i++){
//   setNews[i].
// }

useEffect(() => {
  setLoading(true)
  fetch("https://free-news.p.rapidapi.com/v1/search?q=cryptocurrency&lang=en", {
"method": "GET",
"headers": {
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  "x-rapidapi-host": "free-news.p.rapidapi.com"
}
})
.then(response => {
  if(response.ok){
      response.json().then((json) => {
        let articleArr = []
        for(let i = 0; i < json.articles.length; i++){
          if(json.articles[i].author != null && json.articles[i].media){
            articleArr.push(json.articles[i])
            console.log(json.articles[i])
          }else {
            console.log('skipped')
          }
        }
        setNews(...news, articleArr)
          setLoading(false)
      })
      }
})
.catch(err => {
  console.error(err);
});
}, []);

function truncateString(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit) + "..."
  } else {
    return string
  }
}
// if(news.articles.author.length > 20){
//   truncateString(news.articles.author, 20)
// }
if(loading){
  return <h1 className="pt-3 text-center">Loading...</h1>
}
  return (
    <>
    <h3 style={{paddingLeft:"10px"}}>Latest Crypto News</h3>
      {news.slice(0,3).map((article, index) => (
              <div key={index} className="row">
                <div className="col-sm-4">
                <a href={article.link}>
                <img style={{backgroundImage: "url('"+article.media +"')"}} className="articleImagePort"></img>
                </a>
                </div>
                <div className="col-sm-8">
                <div className="news">
                <a href={article.link}>
                  <p className="newsHeadline">{truncateString(article.title, 60)}</p>
                  <p className="via">{truncateString(article.author,30)} | {article.clean_url}</p>
                </a>
               </div>
                <p className="newsSummary">{truncateString(article.summary,150)}</p>
                </div>
              </div>
            ))}
    </>
  );
}

export default PortfolioNews;
