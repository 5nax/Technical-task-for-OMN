import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import './SingleArticle.css';

const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($id: ID!) {
    article(id: $id, idType: SLUG) {
      id
      title
      content
    }
  }
`;

const SingleArticle = () => {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_ARTICLE_BY_SLUG, {
    variables: { id: slug },
  });

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error loading article.</p>;

  const { article } = data;
  return (
    <div className="single-article-container">
      <h1>{article.title}</h1>
      <div
        className="single-article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default SingleArticle;
