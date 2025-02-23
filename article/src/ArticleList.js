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
  // currentPage starts at 1; for page 1, we use "after" = null.
  const [currentPage, setCurrentPage] = useState(1);
  // pageCursors maps a page number to the "after" value required to fetch that page.
  // For page 1, we use null.
  const [pageCursors, setPageCursors] = useState({ 1: null });

  // Use the stored cursor for the current page as a variable.
  const { loading, error, data, refetch } = useQuery(GET_ARTICLES, {
    variables: { first: PAGE_SIZE, after: pageCursors[currentPage] },
    fetchPolicy: 'cache-and-network'
  });

  // When new data arrives, if there's a next page and we haven't recorded its cursor,
  // update our pageCursors to include the next page's cursor.
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

  // When a user clicks a page number, update currentPage and refetch data.
  const handlePageClick = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    refetch({ first: PAGE_SIZE, after: pageCursors[pageNumber] });
  };

  // Determine how many page buttons to show based on the pages fetched so far.
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
