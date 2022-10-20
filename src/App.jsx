import './App.css';
import{useState, useEffect} from "react"
import axios from 'axios';
import moment from "moment"



function App() {
  const [newsData, setNewsData] = useState([]);
  const [anyNews, setAnyNews] = useState("")
  // const [ischeckNewsType, setIsNewsType] = useState()

  useEffect(() => { 
    const trendingNews = () =>{
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '60dddc6c2amsh16ad3886799cc68p1b1af8jsne62ace7868a5',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setNewsData(response.data.value)
      }).catch(function (error) {
        console.error(error);
      });
    }
    trendingNews()



   }, [])

  



  const getData = (e) => {
  
    e.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: anyNews, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '60dddc6c2amsh16ad3886799cc68p1b1af8jsne62ace7868a5',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.value);
      setNewsData(response.data.value)
    }).catch(function (error) {

      console.error(error);
    });

  }



  return (

    <div className='main-div'>
      <div className='navbar'>
        <div className='logo'>
          <h2>News App</h2>
        </div>
        <div className='input-div'>
          <form onSubmit={getData}>
            <input type="text" placeholder='Search Anything...' id='input'
            onChange={(e) => {
              setAnyNews(e.target.value);

            }}
            />
            {/* <br /> */}

            <button type='submit'>Get Update</button>
          </form>
          <div>
        
          
        </div>


        </div>
      </div>


      <div className='primary-div'>

      
      
        {
          newsData.map(eachArticle => (
            <div className='showData' key={eachArticle.name}>
              <div className='left'>
                <div className='title' key={eachArticle?.name}>
                  <a href={eachArticle.url} target="_blank"><h4>{eachArticle?.name}</h4></a>

                </div>

                <div className='desc'>
                  <p>{eachArticle.description}</p>

                </div>

                <div className='published'>
                  <p>Published At: {moment(eachArticle.datePublished).format('lll')}</p>


                </div>
              </div>
              <span className='right'>
                <img src={eachArticle?.image?.thumbnail?.contentUrl 
                .replace("&pid=News", "")
                .replace("pid=News&", "")
                .replace("pid=News", "")} height = "200" width="250"  />
              </span>
            </div>
          
          ) )
        }
        </div>


     


    </div>
    
  );
}

export default App;
