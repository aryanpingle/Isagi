import { useFormik } from "formik";
import styles from "./CookieTileContent.module.css";
import { TextInputWithLabel } from "../TextInputWithLabel";
import { Button } from "@/components/Button";
import { useMemo } from "react";
import { useCommonManagement } from "@/hooks/useCommonManagement";

export interface CookieTileProps {
  cookie: chrome.cookies.Cookie;
}

type CookieFormValues = {
  cookieName: string;
  cookieValue: string;
  domain: string;
  path: string;
  expirationDate?: string;
  session: boolean;
};

function cookieToFormValues(cookie: chrome.cookies.Cookie): CookieFormValues {
  return {
    cookieName: cookie.name,
    cookieValue: cookie.value,
    domain: cookie.domain,
    path: cookie.path,
    expirationDate: cookie.expirationDate
      ? new Date(cookie.expirationDate * 1_000).toString()
      : "",
    session: cookie.session,
  };
}

function parseExpirationDateString(input?: string): number | undefined {
  if (input === undefined) return undefined;
  // Check if the input is also a valid number
  if (!isNaN(parseFloat(input))) {
    return parseFloat(input);
  }
  // Check if the input is a valid Date string
  const seconds = Date.parse(input);
  if (!isNaN(seconds)) return seconds;
  // Default
  return undefined;
}

function formValuesToCookieSetDetails(
  values: CookieFormValues
): Partial<chrome.cookies.SetDetails> {
  return {
    name: values.cookieName,
    value: values.cookieValue,
    domain: values.domain,
    path: values.path,
    expirationDate: values.session
      ? undefined
      : parseExpirationDateString(values.expirationDate),
  };
}

export const CookieTileContent = ({ cookie }: CookieTileProps) => {
  const {
    state: { tab },
  } = useCommonManagement();

  const initialFormValues = useMemo(() => cookieToFormValues(cookie), [cookie]);

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: (values) => {
      console.log("validating", values);
    },
    onSubmit: (values) => {
      if (!tab?.url) return;

      const initiallySetDetails =
        formValuesToCookieSetDetails(initialFormValues);
      const manualSetDetails = formValuesToCookieSetDetails(values);

      // TODO: Stuff like domain should be undefined if empty
      const detailsToBeSet: chrome.cookies.SetDetails = {
        ...initiallySetDetails,
        ...manualSetDetails,
        url: tab.url,
      };

      console.log("Setting these details:", manualSetDetails);

      // chrome.cookies.set(detailsToBeSet);
    },
  });

  return (
    <>
      <div className={styles["cookie_tile-form_content"]}>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <TextInputWithLabel
            style={{ fontSize: "0.75em" }}
            label="Name:"
            id="cookieName"
            name="cookieName"
            onChange={formik.handleChange}
            value={formik.values.cookieName}
          />
          {/* Value */}
          <TextInputWithLabel
            style={{ fontSize: "0.75em" }}
            label="Value:"
            id="cookieValue"
            name="cookieValue"
            onChange={formik.handleChange}
            value={formik.values.cookieValue}
          />
          {/* Domain */}
          <TextInputWithLabel
            style={{ fontSize: "0.75em" }}
            label="Domain:"
            id="cookieDomain"
            name="cookieDomain"
            onChange={formik.handleChange}
            value={formik.values.domain}
          />
          {/* Path */}
          <TextInputWithLabel
            style={{ fontSize: "0.75em" }}
            label="Path:"
            id="cookiePath"
            name="cookiePath"
            onChange={formik.handleChange}
            value={formik.values.path}
          />
          {/* Expiration Date */}
          <TextInputWithLabel
            style={{ fontSize: "0.75em" }}
            label="Expiration Date:"
            id="expirationDate"
            name="expirationDate"
            onChange={formik.handleChange}
            disabled={cookie.session}
            value={formik.values.expirationDate?.toString() ?? ""}
            placeholder="Date string / seconds"
          />
          <div>Host Only: {cookie.hostOnly}</div>
          <div>HTTP Only: {cookie.httpOnly}</div>
          <div>Same Site: {cookie.sameSite}</div>
        </form>
      </div>
      <div className={styles["cookie_tile-actions_bar"]}>
        <Button
          withShadow
          backgroundColor="hotpink"
          onClick={formik.handleReset}
        >
          Reset
        </Button>
        <Button
          withShadow
          disabled={!formik.isValid}
          backgroundColor="#7DD4A8"
          onClick={formik.submitForm}
        >
          Save Cookie
        </Button>
      </div>
    </>
  );
};
