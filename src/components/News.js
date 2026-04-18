import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch the API key from environment variables
    const apiKey = process.env.REACT_APP_NEWS_API;

    const updateNews = async () => {
        if (!apiKey) {
            console.error('API Key is missing!');
            return;
        }

        // Set initial progress to 10%
        props.setProgress(10);

        const offset = (page - 1) * props.pageSize;
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseUrl = isLocalhost ? 'http://api.mediastack.com/v1/news' : '/api/news';
        const url = `${baseUrl}?access_key=${apiKey}&countries=${props.country}&categories=${props.category}&languages=en&sort=published_desc&limit=${props.pageSize}&offset=${offset}`;

        try {
            // Fetch the data from the API
            let response = await fetch(url);

            // Check if the response is successful (status 200)
            if (!response.ok) {
                // If not successful, throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Set progress to 30% after the API request is complete
            props.setProgress(30);

            // Parse the response data to JSON
            let parsedData = await response.json();

            // Set progress to 70% once the data is parsed
            props.setProgress(70);

            // If the response contains an error, log it
            if (parsedData.error) {
                console.error('API Error:', parsedData.error.message || 'Unknown API Error');
                props.setProgress(100);
                return;
            }

            // Ensure articles and totalResults exist
            const newArticles = parsedData.data || [];
            const newTotalResults = parsedData.pagination?.total || 0;

            // Update state with fetched data
            setArticles(newArticles);
            setTotalResults(newTotalResults);

            // Set loading to false after data is fetched
            setLoading(false);
            props.setProgress(100); // Final progress set to 100%
        } catch (error) {
            console.error('Error fetching news:', error);

            // Set loading to false in case of an error
            setLoading(false);
            props.setProgress(100); // Final progress set to 100% even in case of error
        }
    };


    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsHERE`;
        updateNews();
        // eslint-disable-next-line
    }, []); // Removed 'page' dependency so it doesn't overwrite articles when scrolling

    const fetchMoreData = async () => {
        if (articles.length >= totalResults) return; // Prevent unnecessary fetch if all data is loaded
        const nextPage = page + 1;
        const offset = (nextPage - 1) * props.pageSize;
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseUrl = isLocalhost ? 'http://api.mediastack.com/v1/news' : '/api/news';
        const url = `${baseUrl}?access_key=${apiKey}&countries=${props.country}&categories=${props.category}&languages=en&sort=published_desc&limit=${props.pageSize}&offset=${offset}`;
        setPage(nextPage);
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            const newArticles = parsedData.data || [];
            
            // Safe guard for empty results during pagination (mediastack total is sometimes inaccurate)
            if (newArticles.length === 0) {
                setTotalResults(articles.length); // Disable further scrolling
                return;
            }

            const newTotalResults = parsedData.pagination?.total || 0;

            setArticles((prevArticles) => [...prevArticles, ...newArticles]); // Append new articles
            setTotalResults(newTotalResults);
        } catch (error) {
            console.error('Error fetching more news:', error);
        }
    };

    return (
        <>
            <h1 className="news-header">
                NewsHERE - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults} // Ensure no more data is loaded once all are fetched
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={element.url + index}>
                                <NewsItem
                                    title={element.title || ''}
                                    description={element.description || ''}
                                    imageUrl={element.image}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.published_at}
                                    source={element.source}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,  // Optionally still expect the API key as a prop if you decide to pass it
};

export default News;