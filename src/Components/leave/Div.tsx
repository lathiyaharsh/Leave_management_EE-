import React from "react";

const InfoCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="mb-4">
      <p className="text-lg font-medium text-gray-800">{title}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
};

export default InfoCard;
