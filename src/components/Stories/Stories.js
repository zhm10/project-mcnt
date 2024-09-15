import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import storiesData from "../../data/stories.json";

const context = require.context('../../assets/stories', true);

function MCStories({
  defaultInterval = 5000,
  width = '100%',
  height = '80vh',
  loop = true
}) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const cachedStories = JSON.parse(localStorage.getItem('cachedStories')) || [];

    if (cachedStories.length > 0) {
      setStories(cachedStories);
    } else {
      const updatedStories = storiesData.map((story) => {
        let filePath = '';
        try {
          const image = context(`./${story.url}`);
          const base64Image = image.replace(/^data:image\/(png|jpg);base64,/, '');
          filePath = `data:image/${story.url.split('.').pop()};base64,${base64Image}`;
        } catch (error) {
          console.error(`Error loading file: ${story.url}`, error);
          // Замените на путь к вашему изображению по умолчанию
          filePath = 'path/to/your/default_image.jpg';
        }

        return {
          url: filePath,
          type: story.type || 'image',
          header: {
            heading: story.overlay,
            subheading: '',
          },
          storyContent: {
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
          }
        };
      });

      localStorage.setItem('cachedStories', JSON.stringify(updatedStories));
      setStories(updatedStories);
    }
  }, []);

  return (
    <div
      style={{
        marginTop: '50px'
      }}
    >
      {stories.length > 0 ? (
        <Stories
          stories={stories}
          defaultInterval={defaultInterval}
          width={width}
          height={height}
          loop={loop}
          preloadCount={stories.length}
          style={{
            background: 'black'
          }}
        />
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
}

export default MCStories;
