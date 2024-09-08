import React, { useState, useEffect } from 'react';

const ServiceDescription = ({ descriptionId }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch(`/servicesDescriptions/${descriptionId}.html`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки описания услуги');
        }
        const text = await response.text();
        setHtmlContent(text);
      } catch (error) {
        console.error('Ошибка загрузки описания услуги:', error);
        setError('Ошибка загрузки HTML');
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlContent();
  }, [descriptionId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ServiceDescription;
