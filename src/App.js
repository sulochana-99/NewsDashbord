import React, { useEffect, useState } from 'react';
import NewsList from './NewsList';
import axios from 'axios';
import "./App.css";

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchNews('apple');
  }, []);

  const fetchNews = async (query) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&from=2023-12-07&to=2023-12-07&sortBy=popularity&apiKey=61c315cfa6064005840e73b94451bb98`);
      setNewsArticles(response.data.articles);
      setCurrentPage(1);
    } catch (error) {
      console.log('Error fetching news', error);
    }
  };

  const handleSearch = () => {
    fetchNews(searchTerm); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newsArticles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <center>
      <h1 style={{color:"white"}}>News Dashboard</h1>
      <div class="input-group mb-1"  style={{width:"500px"}}>
        <input type="text" class="form-control" placeholder=" Search for News" 
    aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleSearchChange}/>
    <button class="btn btn-outline-secondary" type="button"
    id="button-addon2" onClick={handleSearch}>Search</button>
    </div>
      
      </center>
      <NewsList news={currentArticles} />
      <center>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => {
            
            if (
              number >= currentPage - 5 &&
              number <= currentPage + 5 &&
              number <= Math.ceil(newsArticles.length / articlesPerPage)
            ) {
              return (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </button>
                </li>
              );
            }
            return null; 
          })}
          <li className={`page-item ${currentPage === Math.ceil(newsArticles.length / articlesPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      </center>
    </div>
  );
}

export default App;
