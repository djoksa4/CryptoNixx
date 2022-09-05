import { useRouter } from "next/router";

import { ChartDays } from "../../config/types";
import classes from "./ChartButtons.module.scss";

const ChartButtons: React.FC<{ chartDays: ChartDays[] }> = (props) => {
  const router = useRouter();

  const clickHandler = (days: number) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, days: days },
    });
  };

  console.log(router.query.days);

  return (
    <div className={classes.chartButtons}>
      {props.chartDays.map((day) => (
        <button
          className={
            router.query.days === day.value.toString() ? classes.active : ""
          }
          onClick={() => {
            clickHandler(day.value);
          }}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default ChartButtons;
