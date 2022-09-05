import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import {
  HistoricalChartEndpoint,
  SingleCoinEndpoint,
} from "../../config/api-endpoints";
import { HistoricalChartData, SingleCoin, ChartDays } from "../../config/types";
import classes from "../../styles/CoinPage.module.scss";
import CoinInfo from "../../components/Coin/CoinInfo";
import CoinChart from "../../components/Coin/CoinChart";

const CoinPage: NextPage<{
  historicalChartData: HistoricalChartData;
  coinInfo: SingleCoin;
}> = (props) => {
  const router = useRouter();

  const currency = router.query.currency ? router.query.currency : "USD";
  const currencySymbol = router.query.currency === "USD" ? "$" : "€";

  return (
    <>
      <Head>
        <title>
          CryptoNixx |{" "}
          {router.query.coin ? router.query.coin.toString().toUpperCase() : ""}
        </title>
        <meta
          name="description"
          content="All the info you need on your favourite crypto currency."
        />
      </Head>

      <div className={classes.coinPage}>
        <CoinInfo
          coinInfo={props.coinInfo}
          currency={currency}
          currencySymbol={currencySymbol}
        />
        <CoinChart
          historicalChartData={props.historicalChartData}
          currency={currency}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { coin: coinId, currency, days } = context.query;
  if (!currency) currency = "USD";
  if (!days) days = "1";

  const response = await fetch(SingleCoinEndpoint(coinId));
  const coinInfo: SingleCoin = await response.json();

  const response2 = await fetch(
    HistoricalChartEndpoint(coinId, Number(days), currency)
  );
  const historicalChartData: HistoricalChartData = await response2.json();

  return {
    props: {
      coinInfo: coinInfo,
      historicalChartData: historicalChartData,
    },
  };
};

export default CoinPage;
