import classes from "./LinearLoader.module.scss";

const LinearLoader = () => {
  return (
    <div className={classes.linear_activity}>
      <div className={classes.indeterminate}></div>
    </div>
  );
};

export default LinearLoader;
