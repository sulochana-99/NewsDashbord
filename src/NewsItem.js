
import React from 'react';

function NewsItem({ article }) {
  const { title, description, url, publishedAt, urlToImage, source, author } = article;

  return (
    <div className="card mb-3" style={{margin:"50px"}}>
      <div className="row g-0">
        <div className="col-md-4">
        <img
            src={urlToImage}
            className="img-fluid rounded-start"
            alt="News Thumbnail"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text" >
              Source : {source.name}
            </p>
            <p className="card-text"  >  
              <small className="text-muted" >PublishedAt : {publishedAt}</small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
             <h6  style={{textAlign:"right"}}><em>_{author}</em></h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
