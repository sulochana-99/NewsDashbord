import React from 'react';
import NewsItem from './NewsItem';

function NewsList({news}) {
  return (
    <div>
      {news && news.length > 0 ? (
        news.map((article, index) => (
          <NewsItem key={index} article={article} />
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  )
}

export default NewsList;