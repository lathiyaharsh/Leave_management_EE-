import React from "react";

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="mb-2 text-blueGray-600">
    {label}: {value ? value : "Not assigned"}
  </div>
);

export default InfoItem;
