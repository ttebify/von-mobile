import {
  SET_GLOBAL_STATE,
  CLEAR_GLOBAL_STATE,
  ENTER_SEARCH_TERM,
} from "./action";

export const initialGlobalState = {
  url: "https://von.gov.ng",
  title: "Voice Of Nigeria",
  name: "Voice Of Nigeria",
  menus: {
    main_menu: [
      {
        name: "Home",
        type: "page",
        id: 1,
        title: "This is the home page",
        icon: "home",
      },
      { name: "About Us", type: "wp_page", id: 2 },
      { name: "Exchange", type: "wp_page", title: "Ex", id: 113154 },
    ],
    sub_menu: [],
    custom_menu: [],
  },
  apps: [],
  search: "",
};

const reducer = (
  state = initialGlobalState,
  action: { type: any; obj: any }
) => {
  const { type, obj } = action;

  switch (type) {
    case SET_GLOBAL_STATE:
      return { ...state, ...obj };

    case ENTER_SEARCH_TERM:
      return { ...state, ...obj };

    case CLEAR_GLOBAL_STATE:
      return {};

    default:
      return state;
  }
};

export default reducer;
