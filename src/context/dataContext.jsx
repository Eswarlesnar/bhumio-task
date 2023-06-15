import { useState , createContext } from "react";


export const dataContext = createContext()


const DataContextProvider = ({children}) => {
    const [data , setData ] = useState([])
    
    return <dataContext.Provider value = {{data , setData}}>{children}</dataContext.Provider>
}

export default DataContextProvider