import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import SearchBar from "../../../components/SearchBar";





export default ({ navigation }) => {
  
  const searchInput = (initialValue) => {
  
  const [value, setValue] = useState(initialValue);
  
  const onChange = text => {
    setValue(text);
    setShouldFetch(false);
    };
  
    return { value, onChange, setValue };
    };
    const usesearchInput = searchInput("");
    const [shouldFetch, setShouldFetch] = useState(false);
     navigation.setOptions ({
    headerTitle: ()=> (<SearchBar {...usesearchInput} onSubmit={onSubmit}/>)
  });
  const onSubmit = () => {
    setShouldFetch(true);
    
    };
   
  return ( <SearchPresenter term={usesearchInput.value} shouldFetch={shouldFetch} />);
  
};




