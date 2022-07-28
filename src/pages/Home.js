import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
  const [input, setinput] = useState('');
  const [result, setresult] = useState(null)
  const onChangeInput = (event) => {
    setinput(event.target.value);
  }
  const onClickSearch = async () => {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${input}`);
      const val = await res.json();
      setresult(val);
    } catch (error) {
      console.log(error);
    }
  }
  const keySearch = (key) => {
    if(key.keyCode===13){
      onClickSearch();
    }
  }
  const renderResult = () => {
    if(result&&result.length===0){
      return <div>No Results</div>
    }
    if(result!=null&&result.length>0){
      console.log("fck");
      return <div>{result.map(item=>{
        return <div key={item.show.id}>{item.show.name}</div>
      })}</div>
    }
    return null;
  }
  return (
    <MainPageLayout>
      <input type={"text"} onChange={onChangeInput} onKeyDown={keySearch} value={input} />
      <button type={"button"} onClick={onClickSearch}>Search</button>
      {renderResult()}
    </MainPageLayout>
  )
}

export default Home