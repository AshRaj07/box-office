import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const [show, setshow] = useState(null);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => res.json())
      .then((res) => setshow(res));
  }, [id]);
  console.log(show);
  return <div>Show</div>;
};

export default Show;
