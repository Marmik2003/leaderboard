import React from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";

import InfoCard from "../../components/contributors/InfoCard";
import GithubActivity from "../../components/contributors/GithubActivity";

import { getContributorBySlug, getContributors } from "../../lib/api";

export default function Contributor({ contributor, slug }) {
  console.log(contributor);
  return (
    <div className="bg-gray-900 min-h-screen ">
      <Head>
        <title>Coronasafe | Contributors</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="max-w-6xl mx-auto py-4 lg:py-8 px-4 xl:px-0 ">
        <div className="flex justify-between items-center">
          <a className="inline-block" href="/">
            <code className="text-primary-900 text-3xl">
              coronasafe.network
            </code>
          </a>
        </div>
      </header>
      <section className="max-w-6xl mx-auto bg-gray-900 border-t border-gray-600 ">
        <div className="space-y-4 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16  shadow">
            <div>
              <InfoCard contributor={contributor} />
            </div>
          </div>

          <div className="col-span-2">
            <h3 className="font-bold text-gray-100 mt-4">Bio</h3>
            <div className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left mt-4">
              <p className="text-xl text-gray-300">{contributor.content}</p>
            </div>
            <h3 className="font-bold text-gray-100 mt-4">Activity</h3>
            <div className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left mt-4">
              <p className="text-xl text-gray-300">
                ...to add activity visualization...
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-bold text-gray-100">Contributions</h3>
              <GithubActivity githubData={contributor["githubData"]} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const contributor = getContributorBySlug(params.slug);
  const content = await markdownToHtml(contributor.content || "");

  return {
    props: {
      contributor: {
        ...contributor,
        content,
      },
    },
  };
}
export async function getStaticPaths() {
  const paths = [];

  getContributors().map((contributor) => {
    paths.push({
      params: {
        slug: contributor.slug,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}