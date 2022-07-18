import type {GetServerSideProps, NextPage} from "next";

import api from "../api";
import Page from "../components/Page";
import StoreCard from "../components/StoreCard";
import {Store} from "../types";

type Props = {
  stores: Store[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const stores = await api.list();

  return {
    props: {stores},
  };
};

const HomePage: NextPage<Props> = ({stores}) => {
  return (
    <Page>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <a href={`/${store.id}`}>
              <StoreCard store={store} />
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default HomePage;
