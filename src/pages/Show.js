import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const [show, setshow] = useState(null);
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(null);
  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => res.json())
      .then((res) => {
        if(isMounted){
            setshow(res);
            setloading(false)
        }
      })
      .catch((err) => {
        if(isMounted){
            seterror(err)
            setloading(false);
        }
      });
      return () => {
        isMounted=false;
      }
  }, [id]);
  console.log(show);
  if(loading){
    return <>Data is Loading...</>
  }
  if(error){
    return <>We have encountered some error</>;
  }
  return <div>Show</div>;
};

export default Show;
