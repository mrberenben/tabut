import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
  const ACTIVE_ROUTE_CLASSNAME = (path: string) =>
    pathname === path ? styles.route_active : undefined;

  return (
    <div className={styles.app_layout}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="Description" content={pageDescription} />
        <title>{pageTitle}</title>

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
        />
      </Head>
      <header className={styles.app_header}>
        <Link href="/">
          <a>
            <Image
              src="/logo.webp"
              alt="Tabut"
              layout="fixed"
              width={244}
              height={41}
            />
          </a>
        </Link>
      </header>
      <main className={styles.app_main}>{children}</main>

      <footer className={styles.app_footer}>
        <ul>
          <li>
            <Link href="/">
              <a className={ACTIVE_ROUTE_CLASSNAME("/")}>home</a>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard">
              <a className={ACTIVE_ROUTE_CLASSNAME("/leaderboard")}>
                leaderboard
              </a>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Layout;
