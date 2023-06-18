export const filterData = (data , filter) => {
     let filteredResults;
     if(!filter){
        return data
     }
     if(data){
       filteredResults =  data.filter(item => {
            let flag = false 
            if(item["Part #"]){
                if(item["Part #"].includes(filter)){
                    flag = true
                }    
            }
            if(item["Alt.Part#"]){            // checking if the item exists to prevent the .includes error on undefined 
                if(item["Alt.Part#"].includes(filter)){
                    flag = true
                } 
            }
            return flag
         })
     }
     return filteredResults

}