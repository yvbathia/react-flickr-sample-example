import React from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import Grid from "../../components/Grid";

const Home = () => {
  const [search, setSearch] = useState('');
  return (
    <Layout
      setSearch={val => {
        setSearch(val);
      }}
    >
      <Grid search={search} />
    </Layout>
  );
};

export default Home;
