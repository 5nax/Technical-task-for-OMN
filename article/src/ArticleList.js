import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './ArticleList.css'; 

const GET_ARTICLES = gql`
  query GetArticles($first: Int, $after: String) {
    articles(first: $first, after: $after) {
      edges {
        node {
          id
          title
          excerpt
          slug
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const PAGE_SIZE = 2;

const ArticleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState({ 1: null });

  const { loading, error, data, refetch } = useQuery(GET_ARTICLES, {
    variables: { first: PAGE_SIZE, after: pageCursors[currentPage] },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (data && data.articles && data.articles.pageInfo.hasNextPage) {
      const nextPage = currentPage + 1;
      if (!pageCursors[nextPage]) {
        setPageCursors(prev => ({
          ...prev,
          [nextPage]: data.articles.pageInfo.endCursor,
        }));
      }
    }
  }, [data, currentPage, pageCursors]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error fetching articles.</p>;

  const articles = data.articles.edges;

  const handlePageClick = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    refetch({ first: PAGE_SIZE, after: pageCursors[pageNumber] });
  };

  const totalFetchedPages = Object.keys(pageCursors).length;

  return (
    <div className="article-list">
      <h1>Articles</h1>
      {articles.map(({ node }) => (
        <div key={node.id} className="article-item">
          <h2>
            <Link to={`/articles/${node.slug}`}>{node.title}</Link>
          </h2>
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalFetchedPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={pageNumber === currentPage ? 'active' : ''}
            >
              {pageNumber}
            </button>
          );
        })}
        {data.articles.pageInfo.hasNextPage && (
          <button onClick={() => handlePageClick(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
} 
export default ArticleList;
