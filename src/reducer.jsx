function reducer(state, action) {
  if (action.type == "LOADED") {
    return { ...state, loading: false };
  }
  // mobile sidebar
  if (action.type == "sideBarManipulation") {
    return { ...state, sideBarShown: !state.sideBarShown };
  }
  // single product page
  if (action.type == "SHOW_PRODUCT") {
    return { ...state, currentCount: 1, product: action.payload };
  }
  if (action.type == "DECREASE") {
    let decreased = 1;
    if (state.currentCount > 1) {
      decreased = state.currentCount - 1;
    }
    return { ...state, currentCount: decreased };
  }
  if (action.type == "INCREASE") {
    return { ...state, currentCount: state.currentCount + 1 };
  }
  // adding product to cart and setting it in localstorage(from product page)
  if (action.type == "ADDING-TO-CART") {
    const searching = state.reduceStorage.find(
      (each) => each.id == action.payload.id
    );
    let newProduct;
    if (searching == undefined) {
      newProduct = { ...action.payload, ordered: state.currentCount };
      const updatedCart = [...state.reduceStorage, newProduct];
      const totalCart = updatedCart.reduce(
        (total, item) => total + item.ordered,
        0
      );
      const totalCartMoney = updatedCart.reduce((total, item) => {
        return total + item.ordered * item.price;
      }, 0);
      localStorage.setItem(
        "totalCartMoney",
        JSON.stringify(totalCartMoney.toFixed(2))
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        reduceStorage: updatedCart,
        currentCount: 1,
        totalCart: totalCart,
        totalCartMoney: totalCartMoney.toFixed(2),
      };
    } else {
      searching.ordered += state.currentCount;
      const totalCart = state.reduceStorage.reduce(
        (total, item) => total + item.ordered,
        0
      );
      const totalCartMoney = state.reduceStorage.reduce((total, item) => {
        return total + item.ordered * item.price;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(state.reduceStorage));
      localStorage.setItem(
        "totalCartMoney",
        JSON.stringify(totalCartMoney.toFixed(2))
      );
      return {
        ...state,
        currentCount: 1,
        totalCart: totalCart,
        totalCartMoney: totalCartMoney.toFixed(2),
      };
    }
  }
  // cart page functions
  if (action.type == "DECREASE_CART") {
    const searched = state.reduceStorage.find(
      (each) => each.id == action.payload
    );
    let currentStorage = state.reduceStorage;

    if (searched.ordered > 1) {
      searched.ordered -= 1;
    }
    if (searched.ordered == 1) {
      currentStorage = state.reduceStorage.filter(
        (each) => each.id != action.payload
      );
    }
    const totalCart = currentStorage.reduce(
      (total, item) => total + item.ordered,
      0
    );
    const totalCartMoney = currentStorage.reduce((total, item) => {
      return total + item.ordered * item.price;
    }, 0);
    localStorage.setItem(
      "totalCartMoney",
      JSON.stringify(totalCartMoney.toFixed(2))
    );
    localStorage.setItem("cart", JSON.stringify(currentStorage));
    return {
      ...state,
      reduceStorage: currentStorage,
      totalCart: totalCart,
      totalCartMoney: totalCartMoney.toFixed(2),
    };
  }
  if (action.type == "INCREASE_CART") {
    const searched = state.reduceStorage.find(
      (each) => each.id == action.payload
    );
    searched.ordered += 1;

    const totalCart = state.reduceStorage.reduce(
      (total, item) => total + item.ordered,
      0
    );

    const totalCartMoney = state.reduceStorage.reduce((total, item) => {
      return total + item.ordered * item.price;
    }, 0);

    localStorage.setItem(
      "totalCartMoney",
      JSON.stringify(totalCartMoney.toFixed(2))
    );
    localStorage.setItem("cart", JSON.stringify(state.reduceStorage));
    return {
      ...state,
      reduceStorage: state.reduceStorage,
      totalCart: totalCart,
      totalCartMoney: totalCartMoney.toFixed(2),
    };
  }
  if (action.type == "REMOVE_PRODUCT") {
    const updatedCart = state.reduceStorage.filter(
      (each) => each.id !== action.payload
    );

    const totalCart = updatedCart.reduce(
      (total, item) => total + item.ordered,
      0
    );

    const totalCartMoney = updatedCart.reduce((total, item) => {
      return total + item.ordered * item.price;
    }, 0);

    localStorage.setItem(
      "totalCartMoney",
      JSON.stringify(totalCartMoney.toFixed(2))
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return {
      ...state,
      reduceStorage: updatedCart,
      totalCart: totalCart,
      totalCartMoney: totalCartMoney.toFixed(2),
    };
  }
  if (action.type == "CLEAR_CART") {
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("totalCartMoney", 0);

    return {
      ...state,
      totalCart: 0,
      totalCartMoney: 0,
      reduceStorage: JSON.parse(localStorage.getItem("cart")),
    };
  }
  // products page dispatchs

  if (action.type == "CATEGORY_CHANGE") {
    //
    state.currentPrice = Math.ceil(state.maxPrice);
    state.sideBarDefaultValue = 100; //resets price range
    //
    let updatedData;
    if (action.payload.id == 0) {
      if (state.currentSort == "Lowest") {
        updatedData = state.data.sort((a, b) => a.price - b.price);
      }
      if (state.currentSort == "Highest") {
        updatedData = state.data.sort((a, b) => b.price - a.price);
      }
      if (state.currentSort == "A-Z") {
        updatedData = state.data.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (state.currentSort == "Z-A") {
        updatedData = state.data.sort((a, b) => b.title.localeCompare(a.title));
      }
    } else {
      updatedData = state.data.filter(
        (each) =>
          each.category == action.payload.categories[action.payload.id].category
      );
      if (state.currentSort == "Lowest") {
        updatedData = updatedData.sort((a, b) => a.price - b.price);
      }
      if (state.currentSort == "Highest") {
        updatedData = updatedData.sort((a, b) => b.price - a.price);
      }
      if (state.currentSort == "A-Z") {
        updatedData = updatedData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      if (state.currentSort == "Z-A") {
        updatedData = updatedData.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
    }

    // if user is searching something and changes category
    if (state.updatedSearch != updatedData) {
      let updatedSearch = updatedData
        .map((each, index) => {
          if (
            each.title.toLowerCase().includes(state.searchInput.toLowerCase())
          ) {
            return each;
          }
        })
        .filter((item) => item !== undefined);
      return {
        ...state,
        categories: action.payload.categories,
        changedData: updatedData,
        updatedSearch: updatedSearch,
        updatedSearchBackup: updatedSearch,
      };
    }
    return {
      ...state,
      categories: action.payload.categories,
      changedData: updatedData,
      updatedSearch: updatedData,
      updatedSearchBackup: updatedData,
    };
  }
  if (action.type == "SEARCHING_PRODUCT") {
    let updatedSearch;
    if (action.payload.length == 0) {
      updatedSearch = state.changedData.filter(
        (item) => item !== undefined && item.price <= state.currentPrice
      );
    } else {
      updatedSearch = state.changedData
        .map((each, index) => {
          if (each.title.toLowerCase().includes(action.payload.toLowerCase())) {
            return each;
          }
        })
        .filter(
          (item) => item !== undefined && item.price <= state.currentPrice
        );
    }
    if (state.currentSort == "Lowest") {
      return {
        ...state,
        updatedSearch: updatedSearch.sort((a, b) => a.price - b.price),
        searchInput: action.payload,
      };
    }
    if (state.currentSort == "Highest") {
      return {
        ...state,
        updatedSearch: updatedSearch.sort((a, b) => b.price - a.price),
        searchInput: action.payload,
      };
    }
    if (state.currentSort == "A-Z") {
      return {
        ...state,
        updatedSearch: updatedSearch.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
        searchInput: action.payload,
      };
    }
    if (state.currentSort == "Z-A") {
      return {
        ...state,
        updatedSearch: updatedSearch.sort((a, b) =>
          b.title.localeCompare(a.title)
        ),
        searchInput: action.payload,
      };
    }
  }
  if (action.type == "SORT_CHANGE") {
    if (action.payload == "Lowest") {
      return {
        ...state,
        updatedSearch: state.updatedSearch.sort((a, b) => a.price - b.price),
        updatedSearchBackup: state.updatedSearchBackup.sort(
          (a, b) => a.price - b.price
        ),
        currentSort: action.payload,
      };
    }
    if (action.payload == "Highest") {
      return {
        ...state,
        updatedSearch: state.updatedSearch.sort((a, b) => b.price - a.price),
        updatedSearchBackup: state.updatedSearchBackup.sort(
          (a, b) => b.price - a.price
        ),
        currentSort: action.payload,
      };
    }
    if (action.payload == "A-Z") {
      return {
        ...state,
        updatedSearch: state.updatedSearch.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
        updatedSearchBackup: state.updatedSearchBackup.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
        currentSort: action.payload,
      };
    }
    if (action.payload == "Z-A") {
      return {
        ...state,
        updatedSearch: state.updatedSearch.sort((a, b) =>
          b.title.localeCompare(a.title)
        ),
        updatedSearchBackup: state.updatedSearchBackup.sort((a, b) =>
          b.title.localeCompare(a.title)
        ),
        currentSort: action.payload,
      };
    }
  }

  if (action.type == "PRICE_CHANGE") {
    let currentPrice =
      (parseFloat(state.maxPrice) / 100) * parseFloat(action.payload);
    return {
      ...state,
      currentPrice: Math.ceil(currentPrice),
      updatedSearch: state.updatedSearchBackup.filter(
        (item) =>
          item.price <= currentPrice &&
          item.title.toLowerCase().includes(state.searchInput)
      ),
      sideBarDefaultValue: action.payload,
    };
  }
}

export { reducer };
