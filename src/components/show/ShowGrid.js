import React from "react";
import ShowCard from "./ShowCard";
import IMG_NOT_FOUND from "../../images/not-found.png";

const ShowGrid = ({ data }) => {
  return data.map(({show}) => {
    return (
      <ShowCard
        key={show.id}
        id={show.id}
        image={show.image ? show.image.medium : IMG_NOT_FOUND}
        name={show.name}
        summary={show.summary}
      />
    );
  });
};

export default ShowGrid;
