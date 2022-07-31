/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import ShowCard from "./ShowCard";
import IMG_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../Styled";
import { useShows } from "../../misc/custom-hook";

const ShowGrid = ({ data }) => {
  const [showsStarred, dispatchStarred] = useShows();
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const onStarClick = useCallback((showId,isStarred) => {
          if (!isStarred) {
            dispatchStarred({ type: 'ADD', showId });
          } else {
            dispatchStarred({ type: 'REMOVE', showId });
          }
        },[]);
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : IMG_NOT_FOUND}
            name={show.name}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={showsStarred.includes(show.id)}
          />
        );
      })}
      ;
    </FlexGrid>
  );
};

export default ShowGrid;
