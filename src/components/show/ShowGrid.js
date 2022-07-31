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
        const isStarred = showsStarred.includes(show.id);
        const onStarClick = useCallback(() => {
          console.log("onstarclick");
          if (!isStarred) {
            dispatchStarred({ type: 'ADD', showId: show.id });
          } else {
            dispatchStarred({ type: 'REMOVE', showId: show.id });
          }
        },[isStarred, show.id]);
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : IMG_NOT_FOUND}
            name={show.name}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
      ;
    </FlexGrid>
  );
};

export default ShowGrid;
