import React from "react";
import "./App.css";
import { increment,decrement } from "./actions/index"
import { useSelector , useDispatch } from "react-redux";

const App3 =()=>{
    const cState = useSelector((state)=>state.changeNumber);
    const dispatch = useDispatch();
    return(
        <>
            <div className="container">
                <h1>Increment/Decrement counter</h1>
                <h4>Using React and Redux</h4>

                <div className="quantity">
                    <button className="quantity_minus" onClick={()=>dispatch(decrement())}><span>-</span></button>
                    <input name="quantity" type="text" className="quantity_input" value={cState}/>
                    <button className="quantity_plus" onClick={()=>dispatch(increment(5))} ><span>+</span></button>
                </div>
            </div>
        </>
    )
}

export default App3;