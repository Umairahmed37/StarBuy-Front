import React from 'react'
import "rc-slider/assets/index.css";
import { Range } from 'rc-slider';
 
const PriceSlider = ({ Price, setPrice, reload, setReload }) => {

  const dragend = (Price) => {
    // setPricestate(Price)
    setPrice(Price)
  }

 
  

  return (
    <>
      <h4>Price</h4>
      <div className="px-3">

        <div className="row d-flex  justify-content-between text-muted">
          <div>${Price[0]}</div>
          <div>${Price[1]}</div>
        </div>

        <Range
          marks={{
            1: '$1',
            1000: `$1000`
          }}
          min={1}
          max={1000}
          defaultValue={[1, 1000]}
          // tipFormatter={value=> `$${value}`}
          // tipProps={{
          //   placement: "bottom",
          //   visible: true 
          // }}
          overlay={`${Price} %`}

          value={Price}
          visible={true}
          onChange={
            (Price) => {
              dragend(Price)
              console.log(Price);
            }
          }
 
          onAfterChange={Price => {
             setPrice(Price)
             setReload(!reload)
           }}
        />
      </div>
    </>
  )
}

export default PriceSlider