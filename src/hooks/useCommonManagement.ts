import { useEffect, useReducer, useSyncExternalStore } from "react";
import { URL_STORE } from "./useURL";

export type APP_THEME = "dark" | "light";

export type CommonManagementState = {
  url?: string;
  theme: APP_THEME;
};

const initialState: CommonManagementState = {
  theme: "dark",
};

type ACTION_SET_URL = {
  name: "SET_URL";
  payload: string;
};

type ACTION_SET_THEME = {
  name: "SET_THEME";
  payload: APP_THEME;
};

export type CommonManagementAction = ACTION_SET_URL | ACTION_SET_THEME;

const reducer = (
  prevState: CommonManagementState,
  action: CommonManagementAction
): CommonManagementState => {
  switch (action.name) {
    case "SET_URL": {
      const { payload } = action;
      return { ...prevState, url: payload };
    }
    case "SET_THEME": {
      const { payload } = action;
      return { ...prevState, theme: payload };
    }
  }
};

export const useCommonManagement = () => {
  const url = useSyncExternalStore(URL_STORE.subscribe, URL_STORE.getSnapshot);

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    url: url,
  });

  useEffect(() => {
    if (!url) return;
    dispatch({ name: "SET_URL", payload: url });
  }, [url]);

  return {
    state,
    dispatch,
  };
};
