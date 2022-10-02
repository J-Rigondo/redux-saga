import React, {useEffect, useState} from 'react';

const CoinInfo = ({
    code,
    price,
    changeRate,
    vol
                  }) => {
    const [priceState, setPriceState] = useState('none');
    const [oldPrice, setOldPrice] = useState(price);

    useEffect(() => {
        if(price > oldPrice) {
            setPriceState('up')
        } else if(price < oldPrice) {
            setPriceState('down')
        } else {
            setPriceState('none');
        }
            setOldPrice(price)
        },
        [price]);


    return (
        <div style={{padding: '1rem', borderRadius:'5px',display:'flex',alignItems:'center', borderWidth:'1px', borderStyle:'solid'
            , borderColor: priceState === 'up' ? 'red' : priceState === 'down' ? 'blue': 'black', marginBottom:'1rem'}}>
            <div>{code}</div>
            <div style={{marginLeft:'1rem', marginRight:'1rem'}}>{price}</div>
            <div>{changeRate}</div>
            <div>{vol}</div>
        </div>
    );
};

export default React.memo(CoinInfo);