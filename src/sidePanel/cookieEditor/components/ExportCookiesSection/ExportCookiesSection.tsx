import { ChromeCookie } from "@/utils/cookie";
import { CodeBlock, CodeConfig } from "@/components/CodeBlock";
import { useMemo } from "react";

export type ExportCookiesSectionProps = {
  cookies: ChromeCookie[];
};

function constructHeaderText(cookie: ChromeCookie) {
  // TODO: Use all properties?
  const directive = "Set-Cookie:";
  return [directive, `${cookie.name}=${cookie.value};`]
    .filter((value) => Boolean(value))
    .join(" ");
}

export const ExportCookiesSection = ({
  cookies,
}: ExportCookiesSectionProps) => {
  const codeConfigs = useMemo(() => {
    return [
      {
        title: "JSON",
        text: JSON.stringify(cookies, null, 2),
        language: "json",
      },
      {
        title: "Header",
        text: cookies.map(constructHeaderText).join("\n"),
        language: "text",
      },
    ] satisfies CodeConfig[];
  }, [cookies]);

  return (
    <div>
      <CodeBlock codeConfigs={codeConfigs} />
    </div>
  );
};
