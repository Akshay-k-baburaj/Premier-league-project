import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Calendar, ExternalLink } from 'lucide-react';
import "./index.scss";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news data');
        setLoading(false);
      }
    };

    fetchNews();
    
    // Fetch news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="news-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-gray-800">Loading news...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <Card className="news-card">
        <CardHeader className="news-header">
          <CardTitle>Premier League News</CardTitle>
        </CardHeader>
        <CardContent className="news-content">
          <div className="space-y-4">
            {news.map((item, index) => (
              <div key={index} className="news-item">
                <div className="news-item-content">
                  <h3 className="news-title">
                    {item.title}
                  </h3>
                  <p className="news-description">
                    {item.description}
                  </p>
                  <div className="news-meta">
                    <div className="news-date">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <div className="news-source">
                      Source: {item.source.name}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-link"
                    >
                      Read more <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsComponent;
