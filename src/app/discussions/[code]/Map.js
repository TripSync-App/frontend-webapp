import React from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ locationParams }) => {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
      <div id="googleMap" className="google-map h-full w-full">
        <GoogleMapReact
          className="google-map"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          bootstrapURLKeys={{ key: "AIzaSyBOTr7B5SUxk0GIIhWt3mAWYJe3KXBy3Fk" }}
          defaultCenter={location}
          defaultZoom={17}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
