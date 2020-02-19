import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./Header.module.scss";
import Title from "../Title";
import SearchHistory from "../SearchHistory";

const propType = {
  handleSearch: PropTypes.func
};

const Header = ({ handleSearch }) => {
  const [value, setValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("keywords"))
  );

  const handleSearchImage = val => {
    if (val.trim().length > 0) {
      let newValue;
      const currentLocalStorage = JSON.parse(localStorage.getItem("keywords"));
      if (currentLocalStorage) {
        newValue = [...new Set([...currentLocalStorage, val])];
      } else {
        newValue = [...new Set([val])];
      }
      setHistory(newValue);
      localStorage.setItem("keywords", JSON.stringify(newValue));
    }
    handleSearch(val);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearchImage(value);
  };

  const handleOnChange = e => {
    setValue(e.target.value);
  };

  const handleDeleteHistory = value => {
    const currentHistory = JSON.parse(localStorage.getItem("keywords"));
    const newHistory = currentHistory.filter(item => item !== value);
    localStorage.setItem("keywords", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleOnHistoryClick = val => {
    setValue(val);
    handleSearchImage(val);
  };

  const handleInputFocus = () => {
    if (history) {
      setShowHistory(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200);
  };

  return (
    <div className={s.root}>
      <Title className={s.title}>Search Photos</Title>
      <div className={s.searchContainer}>
        <form onSubmit={handleSubmit} className={s.form}>
          <input
            onChange={handleOnChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={value}
            placeholder="Search"
          />
        </form>
        {showHistory && (
          <SearchHistory
            history={history}
            handleDeleteHistory={handleDeleteHistory}
            handleOnHistoryClick={handleOnHistoryClick}
            value={value}
          />
        )}
      </div>
    </div>
  );
};

Header.propType = propType;
export default Header;
