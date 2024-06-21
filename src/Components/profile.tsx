import React from "react";

const InfoItem = ({ label, value }) => (
  <div className="mb-2 text-blueGray-600">
    {label}: {value ? value : "Not assigned"}
  </div>
);

export default InfoItem;
