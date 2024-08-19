import React from "react";
import Stories from "react-insta-stories";

function CustomReactInstaStories({
  defaultInterval = 5000,
  width = '100%',
  height = '70vh',
  loop = true,
  ...props
}) {
  return (
    <Stories
      {...props}
      defaultInterval={defaultInterval}
      width={width}
      height={height}
      loop={loop}
    />
  );
}

export default CustomReactInstaStories;
