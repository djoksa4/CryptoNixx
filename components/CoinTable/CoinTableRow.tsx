import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import { numberWithCommas } from "../../config/helpers";
import { CoinData } from "../../config/types";
import classes from "./CoinTableRow.module.scss";

const CoinTableRow: React.FC<{ coin: CoinData }> = (props) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(min-width: 1000px)" });

  const currency =
    router.query.currency === undefined || router.query.currency === "USD"
      ? "$"
      : "€";
  const profit = props.coin.price_change_percentage_24h >= 0;
  const coinHref = {
    pathname: `/coins/${props.coin?.id}`,
    query: { ...router.query, days: 1 },
  };

  return (
    <Link href={coinHref} key={props.coin.id}>
      <tr>
        <td>
          <div className={classes.cointableRow__coinInfo}>
            {isMobile && (
              <Image
                src={props.coin.image}
                alt={props.coin.name}
                width="60px"
                height="60px"
              />
            )}
            <div>
              <p className={classes.cointableRow__symbol}>
                {props.coin.symbol}
              </p>
              <p className={classes.cointableRow__name}>{props.coin.name}</p>
            </div>
          </div>
        </td>
        <td>
          {currency} {numberWithCommas(props.coin.current_price.toFixed(2))}
        </td>
        <td
          className={
            profit
              ? classes.cointableRow__profitable
              : classes.cointableRow__nonprofitable
          }
        >
          {profit && "+"}
          {props.coin?.price_change_percentage_24h?.toFixed(2)}%
        </td>
        <td>
          {currency} {props.coin.market_cap.toString().slice(0, -6)}M
        </td>
      </tr>
    </Link>
  );
};

export default CoinTableRow;
