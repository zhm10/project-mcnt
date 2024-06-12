import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options, attributeName) {
    const [activeIndex, setActiveIndex] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute(attributeName), 10);
                    setActiveIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        const sections = containerRef.current.querySelectorAll(`[${attributeName}]`);
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, [options, attributeName]);

    return [containerRef, activeIndex, setActiveIndex];
}

export default useIntersectionObserver;
