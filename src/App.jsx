import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import deadEndIcon from "./assets/deadEndIcon.svg";
import PopupImg from "./PopupImg";
import supabase from "./utils/supabase";
import "./leaflet.css";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const getMarkers = async () => {
      let { data } = await supabase.from("images").select();
      setMarkers(data);
      setIsLoading(false);
    };
    getMarkers();
  }, []);

  const deadEndMarker = new L.Icon({
    iconUrl: deadEndIcon,
    iconRetinaUrl: deadEndIcon,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  const [hidden, setHidden] = useState(true);

  function displayPopupImg(e) {
    setImageUrl(e.target.options._imageUrl);
    setHidden(false);
  }

  function handleClickHidden() {
    setImageUrl("");
    setHidden(true);
  }

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading dead ends...</div>
      ) : (
        <div id="map">
          <div className="donateLink">
            <a href="https://www.gofundme.com/f/everydeadendla">Donate</a>
          </div>
          <MapContainer
            center={[33.992605, -118.202009]}
            zoom={10}
            scrollWheelZoom={true}
            maxZoom={18}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              spiderfyOnMaxZoom={false}
              showCoverageOnHover={false}
              disableClusteringAtZoom={15}
            >
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  position={[marker.latitude, marker.longitude]}
                  icon={deadEndMarker}
                  _imageUrl={marker.url}
                  eventHandlers={{
                    click: displayPopupImg,
                  }}
                ></Marker>
              ))}
            </MarkerClusterGroup>
            <PopupImg
              hidden={hidden}
              setHidden={setHidden}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleClickHidden={handleClickHidden}
            />
          </MapContainer>
        </div>
      )}
    </>
  );
}

export default App;
