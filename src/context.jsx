import React, { useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
const AppContextContainer = React.createContext();
const lclStorage = localStorage.getItem("cart");
import data from "./data";

let categories = [];

data.map((each) => {
  categories.push(each.category);
});

categories = ["All", ...new Set(categories)];
categories.map((each, index) => {
  if (each == "All") {
    categories[index] = {
      category: "All",
      status: "selected",
    };
    return;
  }
  categories[index] = {
    category: each,
    status: "null",
  };
});

const defaultState = {
  sideBarShown: false,
  data: data,
  // total cart for counter on navbar
  totalCart: 0,
  totalCartMoney: JSON.parse(localStorage.getItem("totalCartMoney")) || 0,
  product: "product data goes here when user is on product page",
  // current count is bad naming but it is what it is, it's defined to reset counter of product page when page is changed
  currentCount: 1,
  reduceStorage: JSON.parse(lclStorage) || [],

  // products page variables from here
  categories: categories,
  changedData: data.sort((a, b) => a.price - b.price),
  updatedSearch: data.sort((a, b) => a.price - b.price),
  updatedSearchBackup: data.sort((a, b) => a.price - b.price),
  searchInput: "",
  maxPrice: data.reduce((max, obj) => {
    return obj.price > max ? obj.price : max;
  }, 0),
  currentPrice: data.reduce((max, obj) => {
    return obj.price > max ? obj.price : max;
  }, 0),
  currentSort: "Lowest",
  sideBarDefaultValue: 100,
};

function AppContext({ children }) {
  // reducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  // setting number of total items in cart, on initial run
  useEffect(() => {
    const newCart = state.reduceStorage.reduce(
      (total, item) => total + item.ordered,
      0
    );
    state.totalCart = newCart;
  }, []);
  return (
    <AppContextContainer.Provider value={{ state, dispatch }}>
      {children}
    </AppContextContainer.Provider>
  );
}

export { AppContext, AppContextContainer };
