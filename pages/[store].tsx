import type {GetServerSideProps, NextPage} from "next";

import {useEffect, useState} from "react";

import api from "../api";
import Page from "../components/Page";
import StoreCard from "../components/StoreCard";
import {Store} from "../types";

type Props = {
  store: Store;
};

export const getServerSideProps: GetServerSideProps<Props, {store: string}> = async ({params}) => {
  const store = await api.fetch(params?.store!);

  return {
    props: {store},
  };
};

const StorePage: NextPage<Props> = ({store}) => {
  const [visitors, setVisitors] = useState<number>(0);

  useEffect(() => {
    api.visitors().then(setVisitors);
  }, []);

  return (
    <Page>
      <div>
        <StoreCard store={store} />
        <p>Visitors: {visitors}</p>
      </div>
    </Page>
  );
};

export default StorePage;
