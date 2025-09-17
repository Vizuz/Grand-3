// src/components/ContactsMap.jsx
import React, { useEffect } from "react";

export default function ContactsMap() {
  useEffect(() => {
    // 1) подключаем 2GIS
    const s = document.createElement("script");
    s.src = "https://maps.api.2gis.ru/2.0/loader.js?pkg=full";
    s.async = true;
    document.body.appendChild(s);

    // 2) базовые стили: тайлы + прячем ссылку «↗» + сбрасываем штатный контрол
    const style = document.createElement("style");
    style.textContent = `
      /* серые тайлы */
      #map-container img.leaflet-tile {
        filter: grayscale(100%) brightness(0.9) contrast(1.15);
      }
      /* прячем ссылку «Открыть в 2ГИС» */
      #map-container a[href*="2gis.ru"] {
        display: none !important;
      }
      /* скрываем штатный контрол зума */
      #map-container .leaflet-control-zoom {
        display: none !important;
      }
      /* контейнер наших кнопок */
      #map-container .custom-zoom {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 1000;
      }
      /* сами кнопки */
      #map-container .custom-zoom button {
        width: 50px;
        height: 50px;
        border: none;
        background: #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /* hover-эффект */
      #map-container .custom-zoom button:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
    `;
    document.head.appendChild(style);

    s.onload = () => {
      window.DG.then(() => {
        const coords = [53.300639, 69.397291];

        // 3) инициализируем карту без штатного зума
        const map = window.DG.map("map-container", {
          center: coords,
          zoom: 17,
          scrollWheelZoom: false,
          zoomControl: false,
        });

        // 4) добавляем маркер
        window.DG.marker(coords, {
          icon: window.DG.icon({
            iconUrl: "https://storage.yandexcloud.net/vizuz/logo-invs.webp",
            iconSize: [60, 60],
            iconAnchor: [30, 60],
          }),
        }).addTo(map);

        // 5) создаём свой контрол
        const zoomWrapper = document.createElement("div");
        zoomWrapper.className = "custom-zoom";
        zoomWrapper.innerHTML = `
          <button id="zoom-in" title="Приблизить">+</button>
          <button id="zoom-out" title="Отдалить">−</button>
        `;
        // приклеиваем прямо к контейнеру карты
        map.getContainer().appendChild(zoomWrapper);

        // 6) вешаем обработчики событий
        document.getElementById("zoom-in").onclick = () => map.zoomIn();
        document.getElementById("zoom-out").onclick = () => map.zoomOut();
      });
    };
  }, []);

  return (
    <div
      id="map-container"
      style={{
        height: "100%",
        // borderRadius: '1rem',
        overflow: "hidden",
        // boxShadow:    '0 4px 15px rgba(0,0,0,0.1)',
      }}
    />
  );
}
