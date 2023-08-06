import React,{useState} from 'react';
import FORM from './Form';
import Table from './Table';


function App() {

//when click is true form will be displayed
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
  {/*pass function to Add button */}
    <Table onClick={handleClick}/>
    
    {/*check if click is true then display form */}
    { click? <FORM onClick={handlesubmit}/>:<div/>} 
   </div>
  );
}

export default App;
