import { FormikErrors, useFormik } from "formik";
import styles from "./CookieTileContent.module.css";
import { TextInputWithLabel } from "../TextInputWithLabel";
import { Button } from "@/components/Button";
import { useMemo } from "react";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";
import { ChromeCookie } from "@/utils/cookie";

type SameSiteOption = {
  label: React.ReactNode;
  value: ChromeCookie["sameSite"];
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
  cookie: ChromeCookie;
  onCookieSaved?: (cookie: ChromeCookie) => void;
}

type CookieFormValues = {
  cookieName: string;
  cookieValue: string;
  cookieDomain: string;
  cookiePath: string;
  expirationDate: string;
  secure: boolean;
  session: boolean;
  sameSite: chrome.cookies.SameSiteStatus;
  hostOnly: boolean;
  httpOnly: boolean;
  storeId: string;
  partitionKey?: chrome.cookies.CookiePartitionKey;
};

function cookieToFormValues(cookie: ChromeCookie): CookieFormValues {
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
    storeId: cookie.storeId,
    partitionKey: cookie.partitionKey,
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

function validateDateString(input: string): boolean {
  // Check if the input is also a valid number
  if (!isNaN(parseFloat(input))) {
    return true;
  }

  // Check if the input is a valid Date string
  const seconds = Date.parse(input);
  if (!isNaN(seconds)) return true;

  return false;
}

function formValuesToCookieSetDetails(
  values: CookieFormValues
): Partial<chrome.cookies.SetDetails> {
  return {
    name: values.cookieName,
    value: values.cookieValue,
    // If domain is an empty string or undefined, set it to undefined
    domain: values.cookieDomain || undefined,
    httpOnly: values.httpOnly,
    path: values.cookiePath,
    expirationDate: values.session
      ? undefined
      : parseExpirationDateString(values.expirationDate),
    sameSite: values.sameSite,
    secure: values.secure,
    storeId: values.storeId,
    partitionKey: values.partitionKey,
  };
}

export const CookieTileContent = ({
  cookie,
  onCookieSaved,
}: CookieTileProps) => {
  const {
    state: { tab },
  } = useCommonManagement();

  const initialFormValues = useMemo(() => cookieToFormValues(cookie), [cookie]);

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: (values): FormikErrors<CookieFormValues> => {
      const errors: FormikErrors<CookieFormValues> = {};

      // Validate expiration date
      if (!values.session && !validateDateString(values.expirationDate)) {
        errors.expirationDate = "Must be a valid date string or timestamp.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!tab?.url) return;

      const manualSetDetails = formValuesToCookieSetDetails(values);

      const detailsToBeSet: chrome.cookies.SetDetails = {
        ...manualSetDetails,
        url: tab.url,
      };

      // If the change includes a renaming, remove the original cookie
      if (values.cookieName !== cookie.name) {
        await chrome.cookies.remove({
          name: cookie.name,
          url: tab.url,
        });
      }
      const savedCookie = await chrome.cookies.set(detailsToBeSet);
      if (savedCookie === null) {
        // Something went wrong
        return;
      }
      onCookieSaved?.(savedCookie);
    },
  });

  return (
    <>
      <div className={styles["cookie_tile-form_content"]}>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <TextInputWithLabel
            label="Name:"
            name="cookieName"
            placeholder="Cookie name"
            onChange={formik.handleChange}
            value={formik.values.cookieName}
            error={formik.errors.cookieName}
          />
          {/* Value */}
          <TextInputWithLabel
            label="Value:"
            name="cookieValue"
            placeholder="Cookie value"
            onChange={formik.handleChange}
            value={formik.values.cookieValue}
            error={formik.errors.cookieValue}
          />
          {/* Domain */}
          <TextInputWithLabel
            label="Domain:"
            name="cookieDomain"
            placeholder="Cookie domain"
            disabled={formik.values.hostOnly}
            onChange={formik.handleChange}
            value={formik.values.cookieDomain}
            error={formik.errors.cookieDomain}
          />
          {/* Host Only */}
          <Checkbox
            label="Host Only"
            name="hostOnly"
            checked={formik.values.hostOnly}
            onChange={formik.handleChange}
          />
          {/* Path */}
          <TextInputWithLabel
            label="Path:"
            name="cookiePath"
            placeholder="Cookie path"
            onChange={formik.handleChange}
            value={formik.values.cookiePath}
            error={formik.errors.cookiePath}
          />
          {/* Expiration Date */}
          <TextInputWithLabel
            label="Expiration Date:"
            name="expirationDate"
            placeholder="Date string / seconds"
            onChange={formik.handleChange}
            disabled={formik.values.session}
            value={formik.values.expirationDate?.toString() ?? ""}
            error={formik.errors.expirationDate}
          />
          {/* Session */}
          <Checkbox
            label="Session Only"
            name="session"
            checked={formik.values.session}
            onChange={formik.handleChange}
          />
          {/* Store ID */}
          {/* <TextInputWithLabel
            label="Store ID:"
            name="storeId"
            placeholder="Cookie store ID"
            onChange={formik.handleChange}
            value={formik.values.storeId}
          /> */}
          {/* Same site */}
          <Select
            name="sameSite"
            label="Same Site:"
            value={formik.values.sameSite}
            onChange={formik.handleChange}
            options={SameSiteOptions}
          />
          {/* Secure */}
          <Checkbox
            label="Secure"
            name="secure"
            checked={formik.values.secure}
            onChange={formik.handleChange}
          />
          {/* HTTP Only */}
          <Checkbox
            label="HTTP Only"
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
