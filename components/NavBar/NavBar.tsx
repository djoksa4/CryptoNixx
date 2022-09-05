import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./NavBar.module.scss";

const NavBar = () => {
  const router = useRouter();

  const currencyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentPathname = router.pathname;

    router.replace({
      pathname: currentPathname,
      query: { ...router.query, currency: e.target.value },
    });
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__container}>
        <Link href="/">
          <a className={classes.navbar__logo}>CryptoNixx</a>
        </Link>

        <div className={classes.navbar__buttons}>
          <select
            name="currency"
            id="currency"
            onChange={currencyChangeHandler}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
