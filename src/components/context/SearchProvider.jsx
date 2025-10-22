import { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }) => {

  const [searchInput, setSearchInput] = useState("")

  const onSearchInput = e => {
    setSearchInput(e.target.value)
  }

  return (
    <SearchContext.Provider value={{ searchInput, onSearchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};
