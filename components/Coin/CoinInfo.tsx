import Image from "next/image";
import parse from "html-react-parser";

import { numberWithCommas } from "../../config/helpers";
import { SingleCoin } from "../../config/types";
import classes from "./CoinInfo.module.scss";

const CoinInfo: React.FC<{
  coinInfo: SingleCoin;
  currency: string | string[] | undefined;
  currencySymbol: string;
}> = (props) => {
  return (
    <div className={classes.coinInfo}>
      <Image
        src={props.coinInfo.image.large}
        alt={props.coinInfo.name}
        width="160px"
        height="160px"
      />
      <h1>{props.coinInfo.name}</h1>
      <p>{parse(props.coinInfo.description.en.split(". ")[0])}.</p>
      <h2>
        Rank: <span>{props.coinInfo.market_cap_rank}</span>
      </h2>
      <h2>
        Current Price:
        <span>
          {props.currencySymbol}{" "}
          {numberWithCommas(
            props.coinInfo.market_data.current_price[
              props.currency.toLowerCase()
            ].toFixed(2)
          )}
        </span>
      </h2>
      <h2>
        Market Cap:
        <span>
          {props.currencySymbol}{" "}
          {numberWithCommas(
            props.coinInfo.market_data.market_cap[
              props.currency.toLowerCase()
            ].toFixed(2)
          )}
        </span>
      </h2>
    </div>
  );
};

export default CoinInfo;
