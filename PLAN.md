# Jet Engine Notebook — Implementation Plan

Prepared: 2026-10-03 (Asia/Shanghai)

Project root: `/Users/luz211/working/pat-projects/jet-engine`

This is the implementation handoff for a coding agent, including GPT-6 sol at medium reasoning effort. Follow the phases in order, verify each exit condition, and continue until the website is deployed and checked or a specific external access requirement prevents deployment. This document describes future implementation; its presence does not mean the website has been built.

## 1. Goal and fixed decisions

Build a personal blog about designing and building a small jet engine. Readers should understand the project, enjoy its images, and follow the author's questions and progress through individual articles.

| Item | Decision |
| --- | --- |
| English site name | Jet Engine Notebook |
| Chinese site name | 喷气发动机手记 |
| Initial project | KJ66-based personal design and reconstruction project |
| Framework | Astro, starting from the official blog template |
| Output | Fully static HTML, CSS, images, and feeds |
| Authoring | Markdown posts in a validated content collection |
| Languages | English and Simplified Chinese |
| Default language | English, with no language prefix |
| Chinese routes | `/zh/` prefix |
| Visual direction | White/light backgrounds, dark text, one cobalt accent |
| Main navigation | Project · Build Log · Resources · About |
| Initial articles | Three topics, each with English and Chinese versions |
| Initial content status | Public editorial previews with conceptual illustrations |
| Author credit | `zlt1213` |
| GitHub profile | `https://github.com/zlt1213` |
| Repository default | New public repository `zlt1213/jet-engine` |
| Production URL | `https://zlt1213.github.io/jet-engine/` |
| Deployment | GitHub Actions publishes GitHub Pages after successful checks |
| Runtime/package manager | Node 24 and npm; commit the lockfile |

The repository name and public visibility are defaults established in the accepted plan. Verify the destination through an authenticated session before creating it. An unauthenticated lookup returned 404 on 2026-10-02; this does not rule out an existing private repository.

### Keep the first release focused

Include the four main pages, article pages, tag archives, a language switch, RSS, a sitemap, and a useful 404 page. Defer the interactive 3D viewer, search, pagination, comments, authentication, contact forms, analytics, and a CMS. Do not introduce Starlight, a documentation sidebar, subsystem navigation, performance cards, or an engineering dashboard.

Detailed calculations and references belong in relevant articles when real supporting material becomes available.

## 2. Existing state and source boundaries

At inspection, the project root was empty. There was no app, Git repository, `PLAN.md`, engine image, model, or original project article. Node 24 and npm were available. The GitHub CLI was not available.

Two reference documents were supplied:

- `/Users/luz211/Downloads/Jet_Engine_Website_Project_Plan.md`: background about a larger engineering/documentation website. The user's blog brief supersedes its Starlight, explorer, dashboard, and subsystem architecture.
- `/Users/luz211/.codex/attachments/d95a75f5-3681-47ed-83c6-1d05286d8b9b/Pasted text.txt`: a blue, full-screen robot landing-page specification. Do not implement its branding, robot artwork, single-file constraint, or no-scrolling behavior.

The user explicitly chose an editorial preview because real project material was unavailable. Therefore:

1. Distinguish planned work, conceptual explanations, simulation results, and physical measurements in the prose.
2. Do not invent build dates, completed CAD revisions, test results, dimensions, performance figures, workshop photographs, or personal experiences.
3. Write preview articles prospectively: objective → proposed approach → conceptual comparison → open questions → evidence needed.
4. Label the site edition and preview articles clearly, while keeping those labels visually restrained.
5. Use original conceptual illustrations. Do not present them as the author's actual CAD or an exact KJ66 drawing.
6. Preserve the user's writing rule: avoid the Chinese contrast construction formed from `不是` followed by `而是`.
7. If technical background claims are added, verify them against suitable primary sources and cite those sources inside the article. The supplied plan alone does not validate engineering claims.

## 3. Target architecture and contracts

### Suggested file layout

Use shared components and thin route wrappers. Keep the route names below stable; minor internal component consolidation is fine when it reduces duplication.

```text
jet-engine/
├── PLAN.md
├── README.md
├── package.json
├── package-lock.json
├── astro.config.mjs
├── tsconfig.json
├── .nvmrc
├── .gitignore
├── .github/workflows/
│   ├── checks.yml
│   └── deploy.yml
├── scripts/
│   └── verify-build.mjs
├── public/
│   └── favicon.svg
└── src/
    ├── content.config.ts
    ├── content/blog/
    │   ├── en/                         # Three English Markdown posts
    │   └── zh/                         # Three Chinese Markdown posts
    ├── assets/illustrations/           # Original shared SVG artwork
    ├── data/
    │   ├── site.ts                     # Identity and localized progress note
    │   └── resources.ts                # Empty typed release-resource list
    ├── i18n/ui.ts                      # UI strings and translated tag labels
    ├── lib/
    │   ├── urls.ts                     # Base-aware page/asset URL helpers
    │   └── posts.ts                    # Public queries, ordering, counterparts
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── ArticleLayout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── LanguageSwitch.astro
    │   ├── PostCard.astro
    │   ├── Figure.astro
    │   ├── PreviewNotice.astro
    │   └── pages/                     # Shared page bodies for both languages
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── resources.astro
    │   ├── 404.astro
    │   ├── rss.xml.ts
    │   ├── build-log/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── tags/[tag].astro
    │   └── zh/                        # Equivalent localized routes and RSS
    └── styles/global.css
```

Do not add a backend, React/Vue runtime, database, or MDX dependency for the initial release. Remove unused starter sample content and integrations.

### Routes and localization

Paths below are relative to the configured GitHub Pages base:

| Page | English | Chinese |
| --- | --- | --- |
| Project | `/` | `/zh/` |
| Build Log | `/build-log/` | `/zh/build-log/` |
| Article | `/build-log/<key>/` | `/zh/build-log/<key>/` |
| Tag archive | `/tags/<tag>/` | `/zh/tags/<tag>/` |
| Resources | `/resources/` | `/zh/resources/` |
| About | `/about/` | `/zh/about/` |
| RSS | `/rss.xml` | `/zh/rss.xml` |

Configure Astro i18n with locales `en` and `zh`, default locale `en`, and `prefixDefaultLocale: false`. Set HTML language attributes to `en` and `zh-Hans` respectively. Translate navigation, headings, metadata, dates, notices, captions, alternative text, and empty states.

Use these translated main navigation labels: `Project / 项目`, `Build Log / 制作日志`, `Resources / 资料`, and `About / 关于`.

The language switch must preserve the current article or page. Resolve article counterparts by their shared key, never by translated title. Require both translations for the three launch articles. If a future article lacks a public counterpart, omit its unavailable language link instead of linking to a nonexistent page.

### Post frontmatter

Define a build-time content collection using Astro's current `glob()` loader and a schema. Each post has:

| Field | Contract |
| --- | --- |
| `translationKey` | Stable lowercase kebab-case key; also used as the article URL slug |
| `locale` | `en` or `zh`; must match the containing language directory |
| `title` | Localized article title |
| `description` | Localized two-sentence summary used by listings and metadata |
| `pubDate` | Valid publication date, supplied in ISO `YYYY-MM-DD` form |
| `updatedDate` | Optional actual editorial update date |
| `tags` | One or more stable tag keys from the fixed list below |
| `heroImage` | Local image validated with Astro's content `image()` helper |
| `heroAlt` | Localized, meaningful alternative text |
| `heroCaption` | Localized caption identifying conceptual artwork |
| `status` | `draft`, `editorial-preview`, or `published`; default to `draft` |

Use these tag keys and display labels:

| Key | English | Chinese |
| --- | --- | --- |
| `design` | Design | 设计 |
| `cad` | CAD | CAD |
| `simulation` | Simulation | 仿真 |
| `manufacturing` | Manufacturing | 制造 |
| `testing` | Testing | 测试 |

Create one shared public-post query: select the requested locale, include `editorial-preview` and `published`, then sort by publication date descending and key ascending for ties. Reuse it for the homepage, Build Log, article route generation, tags, RSS, and article navigation. Production output must exclude drafts from all of these surfaces and the sitemap.

The three launch previews should use their actual editorial publication date. Keep paired translations on the same date. Format date-only values consistently without timezone-induced day changes; using UTC for display of parsed date-only values is sufficient. Never backdate posts to imply a build history.

Validate duplicate `(locale, translationKey)` combinations and missing launch translations. Use `getStaticPaths()` for article/tag pages and `render(entry)` to render collection Markdown.

### URL handling

Set `site` to `https://zlt1213.github.io`, `base` to `/jet-engine`, and `trailingSlash` to `always`.

- Wrap Astro's locale URL helper for internal page links; add the repository base exactly once.
- Use a separate base-aware helper for files under `public/`.
- Let Astro resolve imported image URLs; do not manually prefix already generated image URLs.
- Preserve `.xml` filenames for feeds rather than appending a directory slash.
- Use absolute production URLs for canonicals, alternate-language metadata, and RSS entries.
- In Markdown, use relative local image paths and relative links between sibling articles. Do not insert unprefixed root links such as `/resources/` into published article bodies.
- Do not solve routing with browser redirects or client-side language detection. English opens directly at the main URL.

### Resources data

Start with an empty typed resource list. A later resource entry needs a revision identifier, localized title and description, kind (`model`, `drawing`, or `note`), and a real file URL. Render entries grouped by revision when they exist. Link large release packages to their exact GitHub Release asset; keep earlier revision links stable.

For the first release, show the localized empty state and explain that files will appear with their revision and associated article. Do not fabricate R1/R2/R3 entries or download links.

## 4. Step-by-step implementation

### Phase 1 — Prepare and scaffold

1. Read this plan and any applicable `AGENTS.md` instructions. Inspect the directory again in case work has been added since planning. Preserve existing user work.
2. Confirm Node 24 and npm. Set `.nvmrc` to `24` and use the same runtime in CI.
3. Scaffold the current stable official Astro `blog` template. Because the root already contains this plan, generate the starter in a temporary directory, then copy its application files into the project root while preserving `PLAN.md`. Exclude temporary `node_modules`, Git metadata, and build output during that copy.
4. Install dependencies in the project root. Commit the generated lockfile when Git is initialized later. Use strict TypeScript configuration.
5. Remove starter example posts, unused images, demo branding, and unused integrations. Keep the useful blog infrastructure such as RSS and sitemap support.
6. Add package scripts: `dev` for `astro dev`, `check` for `astro check`, `build` for `astro build`, `preview` for `astro preview`, and `verify` for `node scripts/verify-build.mjs`.
7. Add the required check dependencies if the starter does not include them. Ignore `node_modules/`, `dist/`, `.astro/`, local environment files, and temporary browser/test output.

For a root that still contains only this plan, the scaffold sequence is:

```sh
cd /Users/luz211/working/pat-projects/jet-engine
jet_starter_dir="$(mktemp -d "${TMPDIR:-/tmp}/jet-engine-starter.XXXXXX")"
npm create astro@latest -- "$jet_starter_dir" --template blog --no-install --no-git --yes
rsync -a --exclude 'node_modules' --exclude '.git' --exclude 'dist' --exclude 'PLAN.md' "$jet_starter_dir/" ./
npm install
```

Run the commands sequentially and stop to inspect any failure. If application files already exist, inspect them and continue from their state instead of copying a fresh scaffold over them. Clean up only the temporary directory created by this sequence after confirming the project files are in place.

Exit condition: the starter builds from the project root and `PLAN.md` remains intact.

### Phase 2 — Establish content, URLs, and language handling

1. Create `site.ts` for the site identity, GitHub profile, and manually maintained progress text in both languages. Store the progress note independently from the latest-post query.
2. Add the content schema, tag dictionary, localized UI strings, and shared post helpers described above.
3. Implement and verify page/asset URL helpers with `/jet-engine` enabled from the start.
4. Create the English and Chinese route wrappers. Reuse shared page bodies and layouts rather than duplicating markup between languages.
5. Add page-specific titles/descriptions, self-canonical URLs, and links to existing language counterparts. Include an `x-default` alternate pointing to the English counterpart.
6. Create localized RSS endpoints. Use summaries for feed content in v1. Add sitemap generation for all public routes, excluding utility/404 pages as appropriate.

Exit condition: basic placeholder-free page shells render in both languages and every navigation/language link retains the repository prefix.

### Phase 3 — Build the visual system and page layouts

Use these starting design tokens:

```css
--background: #ffffff;
--surface: #f4f7fb;
--text: #17212f;
--muted: #526071;
--accent: #1d4ed8;
--border: #dbe3ed;
```

1. Use system sans-serif typography with suitable Simplified Chinese fallbacks. Do not require external font requests. Set body text around 18px, English line height around 1.75, and Chinese line height around 1.9.
2. Use a maximum page width near 1,120px with at least 20px mobile gutters. Keep article text around 70 characters wide; allow figures to extend wider within the page container.
3. Build a compact header with site identity, the four navigation links, and a text language switch. Keep navigation visible on mobile using wrapping or a second row. Add active-page indicators and a skip link.
4. Build the Project page in this order: title/introduction; large engine illustration and caption; short current-progress note with `Start here`; latest three post entries; `All updates` link.
5. Use the supplied project description as the basis for the introduction: “A personal exploration of small turbojet design—from original drawings and CAD reconstruction to analysis, manufacturing and testing.” Translate it naturally into Chinese.
6. Initial progress copy must describe preparation of the first design notes and planned investigations. Do not imply that manufacturing, CAD validation, or testing has already happened.
7. Make post listings image-led, with a thumbnail beside text on larger screens and above text on narrow screens. Include title, date, two-sentence summary, tags, and the preview label. Avoid nested anchor elements.
8. Build the Build Log with all public posts sorted newest first. Tag links open static archives. Only expose linked tag filters for populated categories; do not add an empty search box or pagination.
9. Build the article layout with title, date, tags, preview notice, hero figure, Markdown body, and same-language previous/next links. Keep any unavailable adjacent link absent.
10. Build Resources with its honest empty state. Build About from the supplied project motivation and intended workflow, credit `zlt1213`, and link to the GitHub profile.
11. Add a simple footer with the site name, GitHub, and the current-language RSS feed. Keep the footer compact.
12. Add a 404 page with working English and Chinese home links beneath the correct base.

The site must scroll normally. Do not use fixed full-viewport layouts, elaborate entrance animations, oversized UI badges, or floating utility panels. Ensure focus states are visible and any optional transitions respect reduced-motion preferences.

Exit condition: all page types look coherent at mobile and desktop widths before polishing individual articles.

### Phase 4 — Write the three illustrated articles

Create the following stable article keys and paired titles:

| Key | English title | Chinese title | Tags |
| --- | --- | --- | --- |
| `starting-the-project` | Starting the project: why the KJ66? | 项目起点：为什么选择 KJ66？ | `design` |
| `reconstructing-from-drawings` | Reconstructing the engine from scanned drawings | 从扫描图纸重建发动机 | `design`, `cad` |
| `combustor-and-fuel-routing` | Reworking the combustor and fuel routing | 重新梳理燃烧室与燃油管路 | `design`, `cad` |

Write approximately 450–700 English words per article and a complete natural Chinese counterpart. Treat this as a readability target, not a reason to pad the writing. Each article needs a specific question, useful explanatory content, an illustration, and concrete unresolved questions. Avoid lorem ipsum, “coming soon” article bodies, and unsupported first-person history.

Article 1 should explain the project's intended learning journey, why the supplied brief begins with the KJ66, the distinction between source material and reconstructed geometry, and what evidence future posts should contain. Its illustration is a conceptual engine overview. `Start here` always links to this article in the current language.

Article 2 should explain the proposed workflow from scanned source material to interpreted geometry, the need to record ambiguous features and reconstruction assumptions, and how a future comparison could be documented. Its illustration compares a stylized source-like sketch with a conceptual geometric reconstruction. Do not imply that an actual scan was supplied or processed.

Article 3 should introduce the design questions around the combustor and fuel-routing layout, how proposed alternatives could be documented, and which details remain unknown. Its illustration is a conceptual layout comparison with simple callouts. Do not present a completed redesign, operating recipe, or validated performance claim.

Use the same five-part prospective structure across previews: objective, proposed approach, illustrated explanation, open questions, and evidence needed. Later evidence-backed articles can use the full milestone narrative: problem, changes, images/comparisons, lessons, unresolved issues.

Render these notices from the shared component:

> Editorial preview. This article outlines planned work and open questions. Its illustrations are conceptual; no validated CAD, simulation results, or physical test measurements are presented.

> 内容预览。本文介绍计划开展的工作与待解决的问题。插图用于说明概念；本文未提供经过验证的 CAD 模型、仿真结果或实测数据。

Create three original SVG assets under `src/assets/illustrations/`. Reuse the overview artwork for the homepage hero. Use clear shapes, neutral fills, and cobalt callouts; label each figure “Conceptual schematic” or “概念示意图”. Prefer numbered callouts with localized captions outside the SVG so both languages can share the artwork. Include a `viewBox` and explicit intrinsic dimensions.

Use Astro's image handling for local content assets. SVGs should retain their vector format; do not request raster-only conversions for them. In Markdown, use relative image references. Render article hero figures with a semantic `figure`/`figcaption` component and descriptive alternative text. Set image dimensions to prevent layout shift, load below-fold images lazily, and prioritize the main visible hero.

Exit condition: all six article pages contain substantive content, all illustrations load, and every preview is clearly identified without fabricated engineering progress.

### Phase 5 — Verify locally and repair defects

Implement a small build-output verification script. It must inspect actual generated files and links, fail with useful messages, and return a nonzero exit status for errors. It should cover:

- Presence of both homepages, both Build Log pages, both Resources/About pages, six launch article pages, and both feeds.
- Valid local navigation and image references, resolving URLs beneath `/jet-engine/` to their correct `dist/` locations. The base prefix is a URL prefix; do not assume the build nests all output in `dist/jet-engine/`.
- Existing targets for language switches, tag archives, and `Start here` links.
- Correct English/Chinese document language and canonical URLs.
- Preview notices and listing labels for entries whose status is `editorial-preview`; omit these notices for `published` entries. The six launch articles initially use preview status, but changing an article to `published` must not break CI.
- No public article page, feed entry, or sitemap entry for content marked `draft`.

Do not fetch all external sites on every build. Check external GitHub links separately during final verification.

Run, in order:

```sh
npm run check
npm run build
npm run verify
```

Then start a preview server and inspect the site in a real browser:

1. Check widths of 320px, approximately 768px, and approximately 1440px. Inspect the homepage, Build Log, and at least one article in each language.
2. Confirm that navigation, language switching, tag links, article links, RSS, and `All updates` work.
3. Open nested article URLs directly and reload them. Confirm images and CSS still load.
4. Check long Chinese titles, image captions, wrapped navigation, comfortable reading width, and absence of horizontal overflow.
5. Navigate by keyboard. Check the skip link, focus order, focus visibility, readable contrast, and link labels.
6. Check for broken image requests, console errors, unedited starter branding, fake download links, and accidental technical claims.
7. Test draft exclusion using a temporary local draft fixture; build, confirm its absence, remove the fixture, and make a final clean build. Keep test fixtures out of the released content.

Use browser screenshots to inspect the actual composition. Fix visible problems before considering the website complete. Do not settle for a successful compile alone. Re-run relevant checks after repairs; do not repeatedly broaden testing without a new reason.

Exit condition: all automated checks pass and both languages have been visually reviewed at the required sizes.

### Phase 6 — Add GitHub Actions and documentation

1. Create a checks workflow for pull requests to `main`. Use Node 24, `npm ci`, and the check/build/verify sequence. This workflow must not deploy.
2. Create a deployment workflow triggered by pushes to `main` and `workflow_dispatch`. Use the official Astro Pages action to build and upload the site; set its build command to run checks, build, and verification before upload.
3. The official documentation checked during planning uses `actions/checkout@v7`, `withastro/action@v6`, and `actions/deploy-pages@v5`. Verify these versions still exist when implementing, then record the versions used in the workflow. Do not invent future version numbers.
4. Give the build job read access to repository contents. Give the deployment job the required Pages write and OIDC token permissions. Use the `github-pages` environment and require successful completion of the build before deployment.
5. Serialize Pages deployments to avoid overlapping publication. Prefer finishing an active deployment over cancelling it halfway through.
6. Write a concise README covering prerequisites, local development, validation commands, publication, and the expected production URL.
7. Include worked authoring instructions: add paired Markdown files, select tags, set status, add a local image and caption, update progress text, and add a resource tied to an actual revision.
8. Explain that changing an editorial preview to `published` requires replacing speculative text with supported project evidence. The status change itself supplies no evidence.
9. Explain that `site`, `base`, and all related URL checks must be updated together if the repository name or domain changes later.

Exit condition: a fresh checkout can run `npm ci` followed by check/build/verify, and the README explains the complete publishing workflow.

### Phase 7 — Publish and confirm the live site

1. Finish all local implementation and checks before treating authentication as a blocker.
2. Use an available authenticated GitHub tool, CLI, or browser session. If sign-in is required, ask for that specific action and retain the complete locally verified project. Do not request credentials in the plan or chat.
3. Inspect `zlt1213/jet-engine` through the authenticated session. If absent, create it as the planned public repository. If an unrelated repository already occupies that name, do not overwrite it; request a destination decision. If it already contains this project, fetch and inspect its contents, history, and default branch; integrate the new work while preserving remote commits. Retain its established default branch and update both workflow branch filters to match. Never force-push newly initialized history over an existing repository.
4. For a new repository, initialize Git on `main` if the project still lacks Git metadata. For an existing project repository, base the work on its inspected history. Use the configured author identity; do not invent an email address. Commit application source, Markdown, illustrations, workflows, README, lockfile, and this plan. Exclude dependencies and build output.
5. Set the intended remote, push the deployment branch (`main` for a new repository), and enable GitHub Pages with GitHub Actions as its source. Enable this before expecting the Pages deployment to succeed; rerun the workflow if the first push precedes that setting.
6. Inspect the workflow result. Resolve build, permission, or Pages configuration failures. A successful local build does not establish successful deployment.
7. Once deployment succeeds, open `https://zlt1213.github.io/jet-engine/` and its Chinese counterpart. Check a direct English article URL, a direct Chinese article URL, both language-switch directions, images, Resources, and About.
8. Verify that the public source repository and live site resolve correctly. Record the workflow run URL and the deployed commit identifier in the final handoff.

If authentication or account permissions prevent publishing, report the exact remaining action and clearly distinguish the completed local site from the pending deployment. Do not claim that the site is live without checking the published URL.

## 5. Completion checklist

- [ ] Astro blog application exists at the project root and preserves this plan.
- [ ] Four main pages exist in English and Simplified Chinese.
- [ ] Three illustrated topics produce six complete public article pages.
- [ ] English opens at the main URL; Chinese uses `/zh/`.
- [ ] Language switching preserves the current content.
- [ ] Homepage contains introduction, illustration, progress, `Start here`, three posts, and `All updates`.
- [ ] Build Log is ordered consistently and populated tag archives work.
- [ ] Preview notices, captions, and truthful progress wording are present.
- [ ] Resources displays an honest empty state without fabricated releases.
- [ ] About links to `zlt1213` on GitHub.
- [ ] Drafts are excluded from public routes, feeds, listings, and sitemap.
- [ ] Type/content checks, production build, and output verification pass.
- [ ] Browser review covers both languages and mobile/tablet/desktop layouts.
- [ ] Actions workflows and README support repeatable publication.
- [ ] Repository is published and the Pages deployment succeeds.
- [ ] Live nested routes, language links, and assets have been checked.

Final implementation handoff should contain the live website URL, repository URL, deployed commit/workflow evidence, a brief summary of verification, and any actual remaining limitation. Keep the final response concise. Do not stop after scaffolding, drafting a homepage, or adding a deployment file when the remaining authorized work is feasible.

## 6. Reference documentation

Consult these primary sources when implementing; use APIs supported by the installed Astro version:

- [Astro blog tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
- [Astro content collections and official blog starter](https://docs.astro.build/en/guides/content-collections/)
- [Astro internationalization](https://docs.astro.build/en/guides/internationalization/)
- [Astro image handling](https://docs.astro.build/en/guides/images/)
- [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro deployment to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
