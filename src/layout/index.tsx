import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@styles/layout/layout.module.css";

/**
 * @param {string} pageTitle seo title of page
 * @param {string} pageDescription seo description of page
 * @param {HTMLElement} children page content
 */

type LayoutProps = {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
};

function Layout({ pageTitle, pageDescription, children }: LayoutProps) {
  const { pathname } = useRouter();

  return (
    <div className={styles.app_layout}>
      <Head>
        <meta name="Description" content={pageDescription} />
        <title>{pageTitle}</title>

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
        />
      </Head>

      <main className={styles.app_main}>{children}</main>
    </div>
  );
}

export default Layout;
