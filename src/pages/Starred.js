import React, { useState, useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { useShows } from "../misc/custom-hook";

const Starred = () => {
  const [starred] = useShows();
  const [show, setshow] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    if (starred && starred.length > 0) {
      // if we want to resolve multiple request in single time then we have to use Promise.all which expect array of promises to be resolved
      const promises = starred.map((showId) =>
        fetch(`https://api.tvmaze.com/shows/${showId}`).then((res) =>
          res.json()
        )
      );
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((res) => {
          setshow(res);
          setloading(false);
        })
        .catch((err) => {
          seterror(err);
          setloading(false);
        });
    } else {
      setloading(false);
    }
  }, [starred]);
  return (
    <MainPageLayout>
      {loading && <div>Shows are still loading...</div>}
      {error && <div>Error occurred : {error}</div>}
      {!loading && !show && <div>No shows added yet</div>}
      {!loading && !error && show && <ShowGrid data={show} />}
    </MainPageLayout>
  );
};

export default Starred;
