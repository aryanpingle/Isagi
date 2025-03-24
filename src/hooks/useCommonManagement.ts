import { useEffect, useReducer, useSyncExternalStore } from "react";
import { Tab, TAB_STORE } from "./useTab";

export type APP_THEME = "dark" | "light";

export type CommonManagementState = {
  tab?: Tab;
  theme: APP_THEME;
};

const initialState: CommonManagementState = {
  theme: "dark",
};

type ACTION_SET_TAB = {
  name: "SET_TAB";
  payload: Tab;
};

type ACTION_SET_THEME = {
  name: "SET_THEME";
  payload: APP_THEME;
};

export type CommonManagementAction = ACTION_SET_TAB | ACTION_SET_THEME;

const reducer = (
  prevState: CommonManagementState,
  action: CommonManagementAction
): CommonManagementState => {
  switch (action.name) {
    case "SET_TAB": {
      const { payload } = action;
      return { ...prevState, tab: payload };
    }
    case "SET_THEME": {
      const { payload } = action;
      return { ...prevState, theme: payload };
    }
  }
};

export const useCommonManagement = () => {
  const tab = useSyncExternalStore(TAB_STORE.subscribe, TAB_STORE.getSnapshot);

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    tab,
  } as CommonManagementState);

  useEffect(() => {
    if (!tab) return;
    dispatch({ name: "SET_TAB", payload: tab });
  }, [tab]);

  return {
    state,
    dispatch,
  };
};
