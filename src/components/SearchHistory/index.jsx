import React from "react";
import PropTypes from "prop-types";
import s from "./SearchHistory.module.scss";

const propType = {
  history: PropTypes.array,
  value: PropTypes.string,
  handleOnHistoryClick: PropTypes.func,
  handleDeleteHistory: PropTypes.func
};

const SearchHistory = ({
  history,
  value,
  handleOnHistoryClick,
  handleDeleteHistory
}) => {
  return (
    <div className={s.historyContainer}>
      {history
        .filter(item => item.includes(value))
        .map(item => (
          <div className={s.history} key={item}>
            <div className={s.text} onClick={() => handleOnHistoryClick(item)}>
              {item}
            </div>
            <div className={s.btn}>
              <button
                onClick={() => {
                  handleDeleteHistory(item);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

SearchHistory.propType = propType;
export default SearchHistory;
