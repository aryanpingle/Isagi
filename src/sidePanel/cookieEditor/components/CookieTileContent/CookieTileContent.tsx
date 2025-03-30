import { useFormik } from "formik";
import styles from "./CookieTileContent.module.css";
import { TextInputWithLabel } from "../TextInputWithLabel";
import { Button } from "@/components/Button";
import { useMemo } from "react";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";

type SameSiteOption = {
  label: React.ReactNode;
  value: chrome.cookies.Cookie["sameSite"];
};

const SameSiteOptions: SameSiteOption[] = [
  {
    label: "(Unspecified)",
    value: "unspecified",
  },
  {
    label: "None",
    value: "no_restriction",
  },
  {
    label: "Lax",
    value: "lax",
  },
  {
    label: "Strict",
    value: "strict",
  },
];

export interface CookieTileProps {
  cookie: chrome.cookies.Cookie;
}

type CookieFormValues = {
  cookieName: string;
  cookieValue: string;
  cookieDomain: string;
  cookiePath: string;
  expirationDate?: string;
  secure: boolean;
  session: boolean;
  sameSite: chrome.cookies.SameSiteStatus;
  hostOnly: boolean;
  httpOnly: boolean;
};

function cookieToFormValues(cookie: chrome.cookies.Cookie): CookieFormValues {
  return {
    cookieName: cookie.name,
    cookieValue: cookie.value,
    cookieDomain: cookie.domain,
    expirationDate: cookie.expirationDate
      ? new Date(cookie.expirationDate * 1_000).toString()
      : "",
    hostOnly: cookie.hostOnly,
    httpOnly: cookie.httpOnly,
    cookiePath: cookie.path,
    sameSite: cookie.sameSite,
    secure: cookie.secure,
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
    domain: values.cookieDomain,
    httpOnly: values.httpOnly,
    path: values.cookiePath,
    expirationDate: values.session
      ? undefined
      : parseExpirationDateString(values.expirationDate),
    sameSite: values.sameSite,
    secure: values.secure,
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

      console.log("Setting these details:", detailsToBeSet);

      // chrome.cookies.set(detailsToBeSet);
    },
  });

  return (
    <>
      <div className={styles["cookie_tile-form_content"]}>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <TextInputWithLabel
            label="Name:"
            id="cookieName"
            name="cookieName"
            onChange={formik.handleChange}
            value={formik.values.cookieName}
          />
          {/* Value */}
          <TextInputWithLabel
            label="Value:"
            id="cookieValue"
            name="cookieValue"
            onChange={formik.handleChange}
            value={formik.values.cookieValue}
          />
          {/* Domain */}
          <TextInputWithLabel
            label="Domain:"
            id="cookieDomain"
            name="cookieDomain"
            disabled={formik.values.hostOnly}
            onChange={formik.handleChange}
            value={formik.values.cookieDomain}
          />
          {/* Host Only */}
          <Checkbox
            label="Host Only"
            id="hostOnly"
            name="hostOnly"
            checked={formik.values.hostOnly}
            onChange={formik.handleChange}
          />
          {/* Path */}
          <TextInputWithLabel
            label="Path:"
            id="cookiePath"
            name="cookiePath"
            onChange={formik.handleChange}
            value={formik.values.cookiePath}
          />
          {/* Expiration Date */}
          <TextInputWithLabel
            label="Expiration Date:"
            id="expirationDate"
            name="expirationDate"
            onChange={formik.handleChange}
            disabled={formik.values.session}
            value={formik.values.expirationDate?.toString() ?? ""}
            placeholder="Date string / seconds"
          />
          {/* Session */}
          <Checkbox
            label="Session Only"
            id="session"
            name="session"
            checked={formik.values.session}
            onChange={formik.handleChange}
          />
          {/* Same site */}
          <Select
            id="sameSite"
            name="sameSite"
            label="Same Site:"
            value={formik.values.sameSite}
            onChange={formik.handleChange}
            options={SameSiteOptions}
          />
          {/* Secure */}
          <Checkbox
            label="Secure"
            id="secure"
            name="secure"
            checked={formik.values.secure}
            onChange={formik.handleChange}
          />
          {/* HTTP Only */}
          <Checkbox
            label="HTTP Only"
            id="httpOnly"
            name="httpOnly"
            checked={formik.values.httpOnly}
            onChange={formik.handleChange}
          />
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
