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
      {news.slice(0,3).map((article, index) => (
              <div key={index} className="col-sm-4">
                <div className="news">
                <a href={article.link}>
                  <img style={{backgroundImage: "url('"+article.media +"')"}} className="articleImage"></img>
                  <p className="newsHeadline">{truncateString(article.title, 40)}</p>
                  <p className="via">{truncateString(article.author,30)} | {article.clean_url}</p>
                </a>
               </div>
              </div>
            ))}
    </>
  );
}

export default PortfolioNews;
