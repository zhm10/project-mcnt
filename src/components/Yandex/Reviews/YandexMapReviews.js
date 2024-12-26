import React, { useEffect, useRef } from "react";
import './YandexMapReviews.css';

const YandexMapReviews = React.memo(() => {
  const containerRef = useRef(null); // Реф для контейнера

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("iframe")) {
      // Проверяем, что iframe ещё не добавлен
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "1px solid #e6e6e6";
      iframe.style.borderRadius = "8px";
      iframe.style.boxSizing = "border-box";
      iframe.src = "https://yandex.ru/maps-reviews-widget/65945440017?comments";
      containerRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <div className="yandex-map-reviews-wrapper">
      <div ref={containerRef} style={{ width: "100%", height: "1000px" }} />
    </div>
  );
});

export default YandexMapReviews;
