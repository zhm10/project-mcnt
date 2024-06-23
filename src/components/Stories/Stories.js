import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import storiesData from "../../data/stories.json";

const context = require.context('../../assets/stories', true);


function MCStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
      const updatedStories = storiesData.map((story) => {
        // Проверка наличия файла
        let filePath;
        try {
          filePath = context(`./${story.url}`);
        } catch (error) {
          console.error(`Error loading file: ${story.url}`, error);
          filePath = ''; // Или задайте значение по умолчанию
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

      setStories(updatedStories);
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
        <div></div> // Добавьте элемент загрузки
      )}
    </div>
  );
}

export default MCStories;
