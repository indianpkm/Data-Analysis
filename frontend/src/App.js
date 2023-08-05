
import { useContext, useEffect } from 'react';
import './App.css';
import Home from './component/Home/Home';
import { DataContext } from './context/DataProvider';

function App() {
  const {setJsonData}=useContext(DataContext)

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const cachedJsonData=localStorage.getItem('jsonData')
        if(cachedJsonData) {
          setJsonData(JSON.parse(cachedJsonData))
        }else{
      const response=await fetch('https://data-analysis-g38r.onrender.com/getdata')
      const data=await response.json()
      localStorage.setItem('jsonData',JSON.stringify(data))
      setJsonData(data)
        }
      }catch(err){
        console.error("Error fetching data",err)
      }
    }
    fetchData()
  },[setJsonData])
  

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
