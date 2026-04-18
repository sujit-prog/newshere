import React from 'react';

const NewsItem = (props) => {
    // Destructure props with default values for missing fields
    const { title, description, imageUrl, newsUrl, author, date, source } = props;

    // Fallback image URL
    const fallbackImage = "https://res.cloudinary.com/dhigdp9hk/image/upload/q_auto/f_auto/v1776522428/absolutvision-WYd_PkCa1BY-unsplash_iyhdwx.jpg";

    // Format date if provided, else show a default string
    const formattedDate = date ? new Date(date).toLocaleDateString() : "Date not available";

    // Fallback content if title or description is missing
    const formattedTitle = title || "No title available";
    const formattedDescription = description || "No description available";

    return (
        <div className="h-100 mb-4 flex-grow-1">
            <div className="news-card h-100">
                <div className="source-badge-container">
                    <span className="badge badge-source">{source || "Unknown source"}</span>
                </div>
                <div className="img-wrapper">
                    <img 
                        src={imageUrl || fallbackImage} 
                        className="card-img-top" 
                        alt={formattedTitle} 
                        onError={(e) => e.target.src = fallbackImage} // Fallback if image fails to load
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{formattedTitle}</h5>
                    <p className="card-text">{formattedDescription}</p>
                    <div className="mt-auto d-flex flex-column">
                        <p className="card-text mb-2">
                            <small className="text-muted">
                                By {!author ? "Unknown" : author} on {formattedDate}
                            </small>
                        </p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-read-more align-self-start">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
