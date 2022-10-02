import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import tradeSlice from "./slices/trade";

function App() {

  // useEffect(()=>{
  //   (async ()=>{
  //     const res = await axios.get('https://finance.daum.net/api/global/today', {
  //       headers:{
  //         'Referer':'https://finance.daum.net',
  //         'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
  //       }
  //     });
  //     console.log(res)
  //
  //   })()
  // }, []);
  const dispatch = useDispatch();


  return (
    <div className="App" style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <button onClick={()=>dispatch(tradeSlice.actions.triggerTicker())}>버튼</button>
    </div>
  );
}

export default App;
