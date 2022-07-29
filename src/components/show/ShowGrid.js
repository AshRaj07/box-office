import React from "react";
import ShowCard from "./ShowCard";
import IMG_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../Styled";

const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
    {data.map(({show}) => {
    return (
      <ShowCard
        key={show.id}
        id={show.id}
        image={show.image ? show.image.medium : IMG_NOT_FOUND}
        name={show.name}
        summary={show.summary}
      />
    );
  })};
    </FlexGrid>
  );
};

export default ShowGrid;
