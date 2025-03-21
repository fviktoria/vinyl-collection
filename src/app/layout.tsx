import { t } from "i18next";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: t("page.title", { name: process.env.NEXT_PUBLIC_OWNER_NAME }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
