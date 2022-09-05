import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { CoinData } from "../../config/types";
import { numberWithCommas } from "../../config/helpers";
import AliceCarousel from "react-alice-carousel";
import classes from "./BannerCarousel.module.scss";
const BannerCarousel: React.FC<{ trendingCoins: CoinData[] }> = (props) => {
  const router = useRouter();

  // Alice-carousel 'infinite' prop hydration fix
  const [isInfinite, setIsInfinite] = useState(false);
  useEffect(() => {
    setIsInfinite(true);
  }, []);

  const currency =
    router.query.currency === undefined || router.query.currency === "USD"
      ? "$"
      : "€";

  const items = props.trendingCoins.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    const coinHref = {
      pathname: `/coins/${coin?.id}`,
      query: { ...router.query, days: 1 },
    };

    return (
      <Link
        className={classes.bannercarousel__item}
        href={coinHref}
        key={coin.id}
      >
        <a>
          <Image
            src={coin?.image}
            alt={coin?.name}
            height="80"
            width="80"
            loading="eager"
          />

          <div className={classes.bannercarousel__symbolPriceChange}>
            <span>{coin?.symbol} &nbsp; </span>
            <span
              className={
                profit
                  ? classes.bannercarousel__profitable
                  : classes.bannercarousel__nonprofitable
              }
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>

          <div className={classes.bannercarousel__currentPrice}>
            {currency} {numberWithCommas(coin?.current_price.toFixed(2))}
          </div>
        </a>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.bannercarousel}>
      <AliceCarousel
        mouseTracking
        infinite={isInfinite}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default BannerCarousel;
