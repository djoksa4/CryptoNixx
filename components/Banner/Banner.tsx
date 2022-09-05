import { CoinData } from "../../config/types";

import classes from "./Banner.module.scss";
import BannerInfo from "./BannerInfo";
import BannerCarousel from "./BannerCarousel";

const Banner: React.FC<{ trendingCoins: CoinData[] }> = (props) => {
  return (
    <div className={classes.banner}>
      <BannerInfo />
      <BannerCarousel trendingCoins={props.trendingCoins} />
    </div>
  );
};

export default Banner;
