import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

/**
 * TourCard Component
 * Props:
 * - imageUrl: background image URL
 * - elevation: string (e.g. "4,478 m")
 * - title: string (e.g. "Matterhorn")
 * - location: string (e.g. "Zermatt, Switzerland")
 * - onTourClick: function to call when "Take the tour" button is clicked
 */
export default function TourCard({
  imageUrl = "",
  elevation = "",
  title = "",
  location = "",
  onTourClick = () => {},
}) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (node) {
      VanillaTilt.init(node, {
        max: 10,
        speed: 500,
        perspective: 1800,
        glare: true,
        "max-glare": 0.1,
        scale: 1.03,
        reset: true,
      });
    }
    return () => {
      if (node && node.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className="card-container bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="inner-border-overlay" data-tilt-transform-element />

      <div
        className="content-area p-4 sm:p-5 lg:p-7"
        data-tilt-transform-element
      >
        <div className="gradient-overlay" />

        <div className="elevation-badge" data-tilt-transform-element>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12 2L6.5 12h11L12 2zm5.5 11l-5.5 9-5.5-9h11z" />
          </svg>
          {elevation}
        </div>

        <div
          className="text-block font-serif-display"
          data-tilt-transform-element
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
            <svg
              className="mountain-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.344 6.219l-2.344-3.219-2.344 3.219-4.656 7.781h14l-4.656-7.781zm-7.344 9.781l-1 2h10l1.625-2.708-1.501-.292-1.124 1h-4l-1.125-1-1.875.001zm11.69-1l-.69.999 1.311 1.311 1.689.69-1.311-1.311-.689-.69z" />
            </svg>
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            {location}
          </p>
        </div>

        <button
          className="tour-button"
          data-tilt-transform-element
          onClick={onTourClick}
        >
          Take the tour
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M12 5l7 7-7 7"></path>
            <path d="M5 12h14"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
