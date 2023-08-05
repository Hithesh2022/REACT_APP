import React,{useState} from 'react';
import FORM from './Form';
import Table from './Table';




function App() {
  const [click,setClick]=useState(false);
  function handleClick(){
   setClick(true);
    console.log("clicked");
  }
  function handlesubmit(){
    setClick(false);
  }

  return (
   <div>
   
    <Table onClick={handleClick}/>
    { click? <FORM onClick={handlesubmit}/>:<div/>} 
   </div>
  );
}

export default App;
