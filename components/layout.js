import Head from "next/head";

const siteTitle = "thegoodtodo";

export default function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <title>
                    {title} - {siteTitle}
                </title>
            </Head>
            <main>{children}</main>
        </div>
    );
}
