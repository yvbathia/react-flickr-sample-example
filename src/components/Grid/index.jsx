import React from "react";
import PropTypes from "prop-types";
import s from "./Grid.module.scss";
import GridItem from "../GridItem";
import { useState } from "react";
import { useEffect } from "react";
import InView from "react-intersection-observer";
import { fetchImageFromTagByPage } from "../../utils/fetchApi";
import { numOfItemPerPage } from "../../constants";

const propTypes = {
  search: PropTypes.string
};

const defaultProps = {
  search: ""
};

const Grid = ({ search }) => {
  const [data, setData] = useState([]);     // Image data which is fetch by search
  const [page, setPage] = useState(1);      // current page number for fetching per page data
  const [isFailedToFetch, setIsFailedToFetch] = useState(false);    // any exception for api fetch
  const [totalImage, setTotalImage] = useState(0);    // total for checking whether more data is there or not
  const [loader, setLoader] = useState(false);      // TO show loader when api call is happening

  useEffect(() => {
    if (search) {
      (async function() {
        try {
          const fetchedData = await fetchImageFromTagByPage(search, 1);
          if (parseInt(fetchedData.total) > 0) {
            setData(fetchedData.photos);
            setPage(2);
            setTotalImage(parseInt(fetchedData.total));
            setIsFailedToFetch(false);
          } else {
            setIsFailedToFetch(true);
          }
        } catch {
          setIsFailedToFetch(true);
        }
      })();
    }
  }, [search]);

  const onScrollEnd = async () => {
    setLoader(true);
    if (totalImage / (page * numOfItemPerPage) > 1) {
      const fetchedData = await fetchImageFromTagByPage(search, page);
      if (fetchedData.total > 0) {
        const newData = [...data, ...fetchedData.photos];
        setData(newData);
        setPage(page + 1);
      }
    }
    setLoader(false);
  };
  if (isFailedToFetch) return <div>No Data Found</div>;
  if (data.length === 0) return <div>Please Search photo</div>;
  return (
    <div className={s.root}>
      <div className={s.container}>
        {data.map(item => (
          <GridItem data={item} key={item} />
        ))}
      </div>
      {console.log(totalImage, page)}
      {totalImage / (page * 20) <= 1 && (
        <div className={s.noDataContainer}>
          <div>No More Data</div>
        </div>
      )}
      {loader && (
        <div className={s.loaderContainer}>
          <div className={s.loader}></div>
        </div>
      )}
      <InView
        threshold={0}
        onChange={visible => {
          if (visible) {
            onScrollEnd();
          }
        }}
      >
        <div className={s.infiniteLoad} />
      </InView>
    </div>
  );
};

Grid.defaultProps = defaultProps;
Grid.propTypes = propTypes;
export default Grid;
