import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import { Link } from "react-router";
import MarkerClusterGroup from "react-leaflet-cluster";
import deadEndIcon from "../assets/deadEndIcon.svg";
import PopupImg from "./PopupImg";
import supabase from "../utils/supabase";
import checkAuth from "../utils/checkAuth";
import "../styles/leaflet.css";
import "../styles/App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [hidden, setHidden] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const deadEndMarker = new L.Icon({
    iconUrl: deadEndIcon,
    iconRetinaUrl: deadEndIcon,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  function displayPopupImg(e) {
    setImageUrl(e.target.options._imageUrl);
    setPublicId(e.target.options._publicId);
    setHidden(false);
  }

  function handleClickHidden() {
    setTimeout(() => {
      setImageUrl("");
    }, 500);
    setHidden(true);
  }
  function logOut() {
    supabase.auth.signOut();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function getMarkers() {
      let { data } = await supabase.from("images").select();
      let markers = {};
      data.forEach((marker) => {
        markers[marker.public_id] = marker;
      });
      setMarkers(markers);
      setIsLoading(false);
    }

    checkAuth(setIsLoggedIn, setIsAdmin);
    getMarkers();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading dead ends...</div>
      ) : (
        <div id="map">
          <div className="controls">
            <div className="controlButton">
              <a href="https://www.gofundme.com/f/everydeadendla">Donate</a>
            </div>
            {isLoggedIn && (
              <>
                <div className="controlButton" onClick={logOut}>
                  <Link to="#">Log Out</Link>
                </div>
                <div className="controlButton">
                  <Link to="/upload">Upload</Link>
                </div>
              </>
            )}
          </div>
          <MapContainer
            center={[33.992605, -118.202009]}
            zoom={9}
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
              {Object.keys(markers).map((public_id, i) => (
                <Marker
                  key={i}
                  position={
                    markers[public_id].latitude && markers[public_id].longitude
                      ? [
                          markers[public_id].latitude,
                          markers[public_id].longitude,
                        ]
                      : [0, 0]
                  }
                  icon={deadEndMarker}
                  _imageUrl={markers[public_id].url}
                  _publicId={markers[public_id].public_id}
                  eventHandlers={{
                    click: displayPopupImg,
                  }}
                ></Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
          <PopupImg
            hidden={hidden}
            setHidden={setHidden}
            imageUrl={imageUrl}
            publicId={publicId}
            setImageUrl={setImageUrl}
            handleClickHidden={handleClickHidden}
            isAdmin={isAdmin}
            markers={markers}
          />
        </div>
      )}
    </>
  );
}

export default App;
