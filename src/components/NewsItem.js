import React from 'react';

const NewsItem = (props) => {
    // Destructure props with default values for missing fields
    const { title, description, imageUrl, newsUrl, author, date, source } = props;

    // Fallback image URL
    const fallbackImage = "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg";

    // Format date if provided, else show a default string
    const formattedDate = date ? new Date(date).toLocaleDateString() : "Date not available";

    // Fallback content if title or description is missing
    const formattedTitle = title || "No title available";
    const formattedDescription = description || "No description available";

    return (
        <div className="my-3">
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge rounded-pill bg-danger"> {source || "Unknown source"} </span>
                </div>
                <img 
                    src={imageUrl || fallbackImage} 
                    className="card-img-top" 
                    alt={formattedTitle} 
                    onError={(e) => e.target.src = fallbackImage} // Fallback if image fails to load
                />
                <div className="card-body">
                    <h5 className="card-title">{formattedTitle}</h5>
                    <p className="card-text">{formattedDescription}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {!author ? "Unknown" : author} on {formattedDate}
                        </small>
                    </p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;

