import React from "react";

import GoogleMapReact from "google-map-react";
import { Typography } from "@mui/material";

const GoogleMap = ({ locationParams }) => {
  const location = {
    address: locationParams.address || "",
    lat: locationParams.lat || 1,
    lng: locationParams.lng || 1,
  };

  return (
    <div style={{ height: "25vh", width: "100%" }}>
      <Typography className="mb-1">Viewing: {location.address}</Typography>
      <div id="googleMap" className="google-map h-[100%] w-[100%]">
        <GoogleMapReact
          className="google-map"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          bootstrapURLKeys={{ key: "AIzaSyBOTr7B5SUxk0GIIhWt3mAWYJe3KXBy3Fk" }}
          center={location}
          zoom={17}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default GoogleMap;
