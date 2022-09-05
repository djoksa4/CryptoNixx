import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";

import {
  TrendingCoinsEndpoint,
  CoinListEndpoint,
} from "../config/api-endpoints";
import { CoinData } from "../config/types";
import Banner from "../components/Banner/Banner";
import CoinTable from "../components/CoinTable/CoinTable";

const HomePage: NextPage<{
  trendingCoinsData: CoinData[];
  coinListData: CoinData[];
}> = ({ trendingCoinsData, coinListData }) => {
  return (
    <>
      <Head>
        <title>CryptoNixx</title>
        <meta
          name="description"
          content="All the info you need on your favourite crypto currency."
        />
      </Head>
      <Banner trendingCoins={trendingCoinsData} />
      <CoinTable coinListData={coinListData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    TrendingCoinsEndpoint(context.query.currency || "USD")
  );
  const trendingCoinsData: CoinData[] = await response.json();

  const response2 = await fetch(
    CoinListEndpoint(context.query.currency || "USD")
  );
  const coinListData: CoinData[] = await response2.json();

  return {
    props: {
      trendingCoinsData: trendingCoinsData,
      coinListData: coinListData,
    },
  };
};

export default HomePage;
