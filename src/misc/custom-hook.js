import { useReducer, useEffect, useState } from "react";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD":
      return [...prevState, action.showId];
    case "REMOVE":
      return prevState.filter((id) => id !== action.showId);
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  const [input, setinput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });
  const setPersistedInput = (newState) => {
    setinput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { show: action.show, loading: false, error: null };
    case "Fetch_FAILED":
      return { ...prevState, loading: false, error: action.error };

    default:
      return prevState;
  }
};

export function useShow(showId) {
  //   const [show, setshow] = useState(null);
  //   const [loading, setloading] = useState(true)
  //   const [error, seterror] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          // setshow(res);
          // setloading(false)
          dispatch({ type: "FETCH_SUCCESS", show: res, loading: false });
        }
      })
      .catch((err) => {
        if (isMounted) {
          // seterror(err)
          // setloading(false);
          dispatch({
            type: "FETCH_FAILED",
            loading: false,
            error: err.message,
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
