import React, { useState } from "react";

import { Pagination } from "@mui/material";

import { CoinData } from "../../config/types";
import classes from "./CoinTable.module.scss";
import CoinTableRow from "./CoinTableRow";

const CoinTable: React.FC<{ coinListData: CoinData[] }> = (props) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchEntry, setSearchEntry] = useState("");
  const [page, setPage] = useState(1);

  // Search term filter function
  const handleSearch = () => {
    return props.coinListData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchEntry) ||
        coin.symbol.toLowerCase().includes(searchEntry)
    );
  };

  const rows = handleSearch()
    .slice((page - 1) * 10, (page - 1) * 10 + 10)
    .map((coin) => {
      return <CoinTableRow coin={coin} key={coin.id} />;
    });

  return (
    <div className={classes.cointable}>
      <h1>Cryptocurrency Prices by Market Cap</h1>

      {/* SEARCH */}
      <div className={classes.cointable__search}>
        <label
          className={
            searchFocused
              ? `${classes.cointable__label} ${classes.cointable__labelMini}`
              : classes.cointable__label
          }
          htmlFor="search"
        >
          Search For a Crypto Currency..
        </label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchEntry(e.target.value);
          }}
          onFocus={() => {
            setSearchFocused(true);
          }}
          onBlur={() => {
            setSearchFocused(false);
          }}
          type="text"
          id="search"
          autoComplete="off"
        ></input>
      </div>

      {/* TABLE */}
      <div className={classes.cointable__tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <Pagination
        count={Math.ceil(handleSearch().length / 10)}
        className={classes.cointable__pagination}
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default CoinTable;
