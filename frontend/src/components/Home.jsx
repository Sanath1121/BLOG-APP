import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.jpeg";
import {
  bodyText,
  cardClass,
  headingClass,
  linkClass,
  pageWrapper,
  primaryBtn,
  secondaryBtn,
  section,
  subHeadingClass,
  pageTitleClass,
} from "../styles/common";

function Home() {
  return (
    <div className={pageWrapper}>
      <section className={`${section} grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-[#e8e8ed] bg-[#f5f5f7] px-4 py-1 text-xs font-medium text-[#6e6e73]">
            A simple blog app for writing and sharing ideas
          </span>

          <div className="space-y-4">
            <h1 className={pageTitleClass}>Create and read stories in one place.</h1>
            <p className={`${bodyText} max-w-2xl text-base`}>
              Blog App gives authors a clean space to publish articles and gives readers a simple way to explore new
              ideas, updates, and personal stories.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/register" className={primaryBtn}>
              Get started
            </Link>
            <Link to="/login" className={secondaryBtn}>
              Sign in
            </Link>
          </div>

          <p className={`${bodyText} text-sm`}>
            Ready to publish? <Link to="/author-profile/write-article" className={linkClass}>Write your first article</Link>.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-3xl border border-[#e8e8ed] bg-[#f5f5f7] p-6">
            <img
              src={logo}
              alt="Blog app logo"
              className="mb-5 h-44 w-full rounded-2xl object-cover"
            />
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066cc]">Featured</p>
              <h2 className={subHeadingClass}>A clean home for authors and readers</h2>
              <p className={bodyText}>
                Keep the homepage focused on discovery, then move smoothly into profiles, articles, and publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className={headingClass}>What you can do here</h2>
            <p className={bodyText}>A minimal experience built around posting and reading articles.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className={cardClass}>
            <h3 className="text-lg font-semibold text-[#1d1d1f]">Publish articles</h3>
            <p className={bodyText}>Draft and share posts from your author profile when you are signed in.</p>
          </article>

          <article className={cardClass}>
            <h3 className="text-lg font-semibold text-[#1d1d1f]">Manage your profile</h3>
            <p className={bodyText}>View your profile and keep your account details organized in one place.</p>
          </article>

          <article className={cardClass}>
            <h3 className="text-lg font-semibold text-[#1d1d1f]">Read with ease</h3>
            <p className={bodyText}>Browse article pages through a layout that stays simple and readable.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;