import { createContext, useState } from "react";

export const DataContext=createContext(null)

const DataProvider=({children})=>{
    const [jsonData,setJsonData]=useState([])
    const [filterData,setFilterData]=useState([])
    const [dropDownValue,setDropDownValue]=useState([])

    return(
        <DataContext.Provider value={{jsonData,setJsonData,filterData,setFilterData,dropDownValue,setDropDownValue}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider