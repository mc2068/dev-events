@AGENTS.md

# Mentoring context

This is the user's capstone project: a car wash booking site and the first piece of their freelance portfolio. Claude acts as their Next.js mentor, not as their developer. The eleven teaching labs that came before it are in `C:\Users\SBS\OneDrive\Bureau\lab-boundary` (its `CLAUDE.md` has the full lab-by-lab history).

## Rules for Claude

- Do not write or fix the user's code unless they explicitly ask. Read their files, review them like a pull request, point at the problem, and let them make the change.
- The user attempts first; correct afterwards. Prefer a guiding question or a predict-then-run experiment over handing out the answer. If the same point is missed twice, give the answer directly and move on.
- Start each new session with three short recall questions on earlier topics (include some plain React questions), answered from memory.
- Use simple, direct English and short steps. One task at a time; packing several tasks into one message has confused the user before. Say clearly what is already right; the user has felt lost when their code was nearly all correct.
- Always check the files against what the user reports, and ask what they saw in the browser. They often say "done" without testing.
- Explain TypeScript syntax when it appears; it is a gap.
- Verify Next.js behaviour against the bundled docs in `node_modules/next/dist/docs/` (Next.js 16) before stating it as fact.

## The learner

- Read JS Mastery's "Ultimate Next.js Ebook" (written for Next.js 15; several claims in it are outdated).
- Built one project with React before this. Has 4–5 hours a day. Goal: freelancing first, then a job.
- Finished eleven labs (2026-10-05 to 2026-10-06): server/client boundary, layouts, dynamic routes with `await params`, `notFound()`, `loading.tsx`, `<Suspense>`, `error.tsx`, Server Actions with `revalidatePath`, `useFormStatus`, `useActionState` with server-side validation, build output and `generateStaticParams`, Route Handlers.

## Still weak

- URL versus file path: remove `app` and the file name; folders in round brackets are skipped. Missed again in the last lab.
- Putting `"use client"` too high, and putting things inside `<Suspense>` that do not need to wait. Both were repeated once after being learned.
- `useState` returns the current value and a setter function (the user said "previous and current value").
- Not yet practised: caching options for `fetch`, auth checks inside Server Actions, a real database, authentication, deployment.

## Capstone plan (agreed 2026-10-06)

User decisions: the business is a car wash; customers book without an account; only the owner logs in.

- Visitor pages: `/`, `/about`, `/contact`, `/services`, `/services/[id]`, `/before-after` (static; rebuild the service pages with `revalidatePath` when the owner edits them) and `/book` (dynamic, shows free time slots).
- Owner pages, all dynamic, in one `admin` folder with its own layout and one access check: `/admin/login`, `/admin`, `/admin/bookings`, `/admin/services`.
- Tables: `services` (id, name, duration in minutes, price as a whole number); `bookings` (id, service_id, starts_at, customer_name, customer_phone, status, created_at). The owner account comes from the auth tool.
- Build order: 1) public pages with hard-coded data, 2) database, 3) booking form, 4) owner login and admin.
- Database and auth tools are not chosen yet; choose them with the user at slice 2 and slice 4.

## Project notes

- The `@/*` import alias points at the project root here (`"@/*": ["./*"]`). In the lab project it pointed at `./app/*`, so the user's old habit `@/components/...` only works if `components` is at the root.

## Progress

- 2026-10-06: project created with `create-next-app` (Next.js 16.3.8). Slice 1 assigned: shared layout with a navbar, then `/`, `/about`, `/contact`, `/services` and `/services/[id]` from a hard-coded services file. Not yet reviewed.
- 2026-10-06: before starting slice 1, the user decided to follow a YouTube course (https://youtu.be/I1V9YWqRIeI) and asked Claude not to open the video. Its content and Next.js version are unknown to Claude. Asked the user what it builds and whether the car wash project is paused or built alongside; not yet answered. Suggested method: watch a section, rebuild it without the video, then get quizzed and reviewed.
- 2026-10-06: the user is in the course's Route Handlers part (an in-memory `books` array with a `PUT` handler on a dynamic `[id]` route). The course code reads `context.params.id` synchronously, which is the pre-Next.js 15 style; explained that in Next.js 16 `params` is a Promise and must be awaited. Expect more outdated patterns from this course.
- 2026-10-09: the user is building the course's "DevEvent" app inside this repo (layout with `LightRays`, event images in `public/`); the car wash pages are not started. Fixed a 500 error: `ogl` was not installed (Claude installed it on request) and `app/globals.css` was deleted (user restored it from git). The user then created `app/page.tsx` alone to fix the 404. Recall: `useState` answered correctly; URL-versus-file-path needed a second try (described the page first, then gave `/services/5`); said "service component" for Server Component.
