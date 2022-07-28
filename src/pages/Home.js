import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
  const [input, setinput] = useState("");
  const [result, setresult] = useState(null);
  const [search, setsearch] = useState("shows");
  const isShow = search === "shows";
  const onChangeInput = (event) => {
    setinput(event.target.value);
  };
  const onClickSearch = async () => {
    try {
      const res = await fetch(
        `https://api.tvmaze.com/search/${search}?q=${input}`
      );
      const val = await res.json();
      setresult(val);
      setinput("");
    } catch (error) {
      console.log(error);
    }
  };
  const keySearch = (key) => {
    if (key.keyCode === 13) {
      onClickSearch();
    }
  };
  const renderResult = () => {
    if (result && result.length === 0) {
      return <div>No Results</div>;
    }
    if (result != null && result.length > 0) {
      if (result[0].show) {
        return result.map((item) => {
          return <div key={item.show.id}>{item.show.name}</div>;
        });
      } else {
        return result.map((item) => {
          return <div key={item.person.id}>{item.person.name}</div>;
        });
      }
    }
    return null;
  };
  const checkRadio = (event) => {
    setsearch(event.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type={"text"}
        onChange={onChangeInput}
        onKeyDown={keySearch}
        value={input}
        placeholder={"Search Something"}
      />
      <div>
        <label htmlFor="show-radio">
          Shows
          <input
            type="radio"
            name=""
            id="show-radio"
            value={"shows"}
            onChange={checkRadio}
            checked={isShow}
          />
        </label>
        <label htmlFor="actor-radio">
          Actors
          <input
            type="radio"
            name=""
            id="actor-radio"
            value={"people"}
            onChange={checkRadio}
            checked={!isShow}
          />
        </label>
      </div>
      <button type={"button"} onClick={onClickSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
