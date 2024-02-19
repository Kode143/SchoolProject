import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import ArticleForm from '@/components/AddForms/ArticleForm';
import DeleteArticles from '@/components/DeleteModals/DeleteArticles';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);

  useEffect(() => { 
    axios.get('/api/articles').then(response => {
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArticles(sortedEvents);
      setExpandedStates(new Array(sortedEvents.length).fill(false)); 
    });
  }, []);

  const handleReadMore = (index) => {
    const updatedExpandedStates = [...expandedStates];
    updatedExpandedStates[index] = !updatedExpandedStates[index]; 
    setExpandedStates(updatedExpandedStates);
  };

  const countWords = (text) => {
    return text.split(/\s+/).length;
  };

  return (
    <Layout>
      <div className='Flex flex-col'>
        <ArticleForm />
        <div className='mt-2'>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
  <div key={index} className="bg-gray-300 shadow-black shadow-md rounded-md p-2 " style={{ height: expandedStates[index] ? 'auto' : 'fit-content' }}>
    <h3 className="text-lg font-semibold mb-2 text-center">{article.title}</h3>
    <div className="image-container ">
      {article.images.map((image, imageIndex) => (
        <img key={imageIndex} src={image.secure_url} alt={`Event ${index} Image ${imageIndex}`}
         style={{ width: '100%', height: 'auto', marginBottom: '8px' }} />
      ))}
    </div>
    <div className="description-container overflow-hidden w-full mt-3" style={{ maxHeight: expandedStates[index] ? 'none' : '50px' }}> 
      <p className="overflow-y-hidden">{article.description}</p>
    </div>
    {countWords(article.description) > 20 && (
      <button 
        onClick={() => handleReadMore(index)} 
        className="text-white hover:underline focus:outline-none bg-black p-0.5 rounded-md"
      >
        {expandedStates[index] ? 'Hide' : 'Read More...'}
      </button>
    )}
    <div className="w-full mt-4">
    <DeleteArticles articleId={article._id} articleTitle={article.title} articleImageUrl={article.images} />
    </div>
    
  </div>
))}

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Articles;
