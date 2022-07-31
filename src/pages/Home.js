import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { useLastQuery } from "../misc/custom-hook";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const Home = () => {
  const [input, setinput] = useLastQuery();
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
      return result[0].show ? (
        <ShowGrid data={result} />
      ) : (
        <ActorGrid data={result} />
      );
    }
    return null;
  };
  const checkRadio = (event) => {
    setsearch(event.target.value);
  };
  return (
    <MainPageLayout>
      <SearchInput
        type={"text"}
        onChange={onChangeInput}
        onKeyDown={keySearch}
        value={input}
        placeholder={"Search Something"}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            onChange={checkRadio}
            checked={isShow}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            onChange={checkRadio}
            checked={!isShow}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type={"button"} onClick={onClickSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
