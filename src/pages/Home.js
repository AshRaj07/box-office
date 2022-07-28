import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
  const [input, setinput] = useState('');
  const onChangeInput = (event) => {
    setinput(event.target.value);
  }
  const onClickSearch = async () => {
    try {
      const res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${input}`);
      const val = await res.json();
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  }
  const keySearch = (key) => {
    if(key.keyCode===13){
      onClickSearch();
    }
  }
  return (
    <MainPageLayout>
      <input type={"text"} onChange={onChangeInput} onKeyDown={keySearch} value={input} />
      <button type={"button"} onClick={onClickSearch}>Search</button>
    </MainPageLayout>
  )
}

export default Home