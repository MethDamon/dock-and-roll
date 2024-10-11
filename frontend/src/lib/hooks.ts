import { useState, useEffect } from 'react';

const useRandomBoatImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          'https://source.unsplash.com/featured/?boat'
        );
        setImageUrl(response.url);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };

    fetchImage(); // Fetch a random boat image on mount
  }, []); // Empty dependency array ensures it runs once when the component using the hook is mounted

  return imageUrl;
};

export default useRandomBoatImage;
