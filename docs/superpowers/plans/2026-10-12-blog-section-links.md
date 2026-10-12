# Blog Section Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let editors save fragment links such as `#definí-una-única-fuente-de-stock-por-sucursal` and make them scroll to the corresponding blog heading.

**Architecture:** Keep Sanity's existing `link.href` field and allow relative URLs. At rendering time, derive stable, Unicode-preserving IDs from heading text, disambiguate duplicate headings, and assign those IDs to H1–H4. Preserve current Portable Text link rendering and all unrelated site behavior.

**Tech Stack:** Sanity Studio 5, Astro 5, React 19, Portable Text, Node 22 built-in test runner.

## Global Constraints

- Do not edit, approve, deliver, or publish the SEOdraft/Sanity post.
- Preserve existing user changes in the original checkout; work in the isolated `fix/blog-section-anchors` worktree.
- Existing SEOdraft fragments contain Spanish accents, so generated IDs must retain them.
- Do not fabricate a URL or rewrite existing links.

---

### Task 1: Allow fragment links in the editor

**Files:**
- Modify: `studio/schemaTypes/blockContent.ts`
- Test: Studio production build and manual editor check after deployment.

**Interfaces:**
- Consumes: Existing Portable Text annotation `{_type: 'link', href: string}`.
- Produces: The same annotation shape; accepts `#fragment` and ordinary relative or absolute links.

- [ ] **Step 1: Confirm the failure:** `link.href` is `type: 'url'` without validation, so Sanity's default URI rule permits only HTTP(S).
- [ ] **Step 2: Change the field:** add `validation: (rule) => rule.uri({allowRelative: true})` to `href` without changing its name or type.
- [ ] **Step 3: Build:** run `npm run build` in `studio`; expect exit 0.
- [ ] **Step 4: On a deployed Studio, verify:** a `#fragment` annotation has no URL validation error, while an ordinary `https://` link remains valid.

### Task 2: Generate and render matching heading IDs

**Files:**
- Create: `src/lib/blogAnchors.ts`
- Create: `tests/blogAnchors.test.ts`
- Modify: `src/components/PortableTextRenderer.astro`
- Modify: `src/components/PortableTextComponents.tsx`

**Interfaces:**
- Consumes: Portable Text blocks with `style: 'h1' | 'h2' | 'h3' | 'h4'` and text spans in `children`.
- Produces: `withHeadingAnchors(content)` returns new blocks containing `anchorId`; the React heading components render `id={anchorId}`.

- [ ] **Step 1: Write a failing test:** assert the seven headings of “Cómo controlar el stock de varias sucursales” map to their existing accented `#...` fragments; assert duplicate headings gain `-2` and non-heading blocks are unchanged.
- [ ] **Step 2: Run `node --experimental-strip-types --test tests/blogAnchors.test.ts` and confirm failure because `withHeadingAnchors` does not exist.**
- [ ] **Step 3: Implement `withHeadingAnchors`:** join text spans, NFC-normalize, lowercase in Spanish, remove punctuation while preserving Unicode letters/digits, collapse whitespace/hyphens, and add a numeric suffix for duplicates.
- [ ] **Step 4: Re-run the test and expect pass.**
- [ ] **Step 5: Pass transformed blocks to Portable Text and set IDs on H1–H4 without changing the visible title text.**
- [ ] **Step 6: Run the test and `npm run build` at the repository root; expect both to pass.**

### Task 3: Review and handoff

**Files:**
- Review: all files from Tasks 1–2.

**Interfaces:**
- Consumes: build and test results.
- Produces: concise handoff with changed files and deployment status.

- [ ] **Step 1: Run `git diff --check` and review only the scoped changes.**
- [ ] **Step 2: If deployment access is available, deploy Studio and verify the fragment validation in the editor; otherwise explicitly hand off the deploy step.**
- [ ] **Step 3: Verify the web build output gives each target heading an `id` matching the table-of-contents fragment; report any blocker before claiming end-to-end success.**

