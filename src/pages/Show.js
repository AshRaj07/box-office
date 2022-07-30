import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

const reducer = (prevState,action) =>{
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {show:action.show,loading:false,error:null}
        case 'Fetch_FAILED':
            return {...prevState,loading:false,error:action.error}
    
        default:
           return prevState
    }
}

const Show = () => {
  const { id } = useParams();
//   const [show, setshow] = useState(null);
//   const [loading, setloading] = useState(true)
//   const [error, seterror] = useState(null);
const [{show,loading,error}, dispatch] = useReducer(reducer,{show:null,loading:true,error:null} )
  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => res.json())
      .then((res) => {
        if(isMounted){
            // setshow(res);
            // setloading(false)
            dispatch({type:'FETCH_SUCCESS',show:res,loading:false})
        }
      })
      .catch((err) => {
        if(isMounted){
            // seterror(err)
            // setloading(false);
            dispatch({type:'FETCH_FAILED',loading:false,error:err.message})
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
