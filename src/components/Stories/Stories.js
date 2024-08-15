import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import storiesData from "../../data/stories.json";

// Контекст для динамического импорта изображений
const context = require.context('../../assets/stories', true);

function MCStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const cachedStories = JSON.parse(localStorage.getItem('cachedStories')) || [];

    if (cachedStories.length > 0) {
      console.log('Loading stories from cache...');
      setStories(cachedStories);
    } else {
      console.log('Loading stories from server...');
      const updatedStories = storiesData.map((story) => {
        let filePath = '';
        try {
          const image = context(`./${story.url}`);
          // Преобразование изображения в base64
          const base64Image = image.replace(/^data:image\/(png|jpg);base64,/, '');
          filePath = `data:image/${story.url.split('.').pop()};base64,${base64Image}`;
        } catch (error) {
          console.error(`Error loading file: ${story.url}`, error);
        }

        return {
          url: filePath,
          type: story.type || 'image',
          header: {
            heading: story.overlay,
            subheading: '',
            profileImage: '', // Вы можете добавить ссылку на изображение профиля, если нужно
          },
          storyContent: {
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
          }
        };
      });

      // Сохранение обновленных историй в localStorage
      localStorage.setItem('cachedStories', JSON.stringify(updatedStories));

      console.log('Stories have been fetched from the server and cached.');
      setStories(updatedStories);
    }
  }, []);

  return (
    <div>
      {stories.length > 0 ? (
        <Stories
          stories={stories}
          defaultInterval={5000}
          width={'100%'}
          height={'70vh'}
          loop={true}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default MCStories;
