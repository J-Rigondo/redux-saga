import React, {useEffect, useState} from 'react';
import tradeSlice from "../slices/trade";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const ticker = useSelector(state => state.trade.ticker);
    const [marketCode, setMarketCode] = useState();

    useEffect(() => {
        (async ()=>{
            const res = await axios.get('https://api.upbit.com/v1/market/all');
            const codes = res.data
                .filter(info=>info.market.includes('KRW-'))
                .map(info=>info.market);
            console.log(codes)
            setMarketCode(codes);
        })()
    },[]);

    return (
        <div style={{height: '100vh',  width:'1024px', margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{marginTop: '5rem'}}>
                <button style={{marginRight:'1rem'}} onClick={() => dispatch(tradeSlice.actions.triggerTicker({codes:marketCode}))}>시작 버튼</button>
                <button onClick={() => dispatch(tradeSlice.actions.closeTicker())}>종료 버튼</button>
            </div>
            <Link style={{marginTop: '2rem'}}
                  to="/market-condition">Market Condition</Link>

            <div style={{marginTop: '7rem'}}>
                {ticker.map(t => (
                    <CoinInfo key={t.code} code={t.code} price={t.trade_price} changeRate={t.signed_change_rate}
                              vol={t.acc_trade_price_24h}/>
                ))}
            </div>

        </div>
    );
};

export default Home;