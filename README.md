# isotope-pattern-ui #

A one-page React UI for [`isotope-pattern-service`](https://github.com/ksmirn0v/isotope-pattern-service).
Enter a molecular formula, submit it against `POST /isotope-pattern/api/compute`, and
view the resulting isotope pattern as a bar chart (mass on the X-axis, probability on
the Y-axis).

## Requirements ##

`node >= 20`

## Development ##

```
npm install
VITE_API_BASE_URL=http://localhost:8000 npm run dev
```

`VITE_API_BASE_URL` should point at a running `isotope-pattern-service` instance
(e.g. `uv run uvicorn isotope_pattern_service.main:app --reload` in that repo, which
defaults to `http://localhost:8000`).

Run the test suite:

```
npm test -- --run
```

Build for production:

```
VITE_API_BASE_URL=https://your-service-url npm run build
```

## Deployment ##

The app deploys to two persistent Netlify sites — test and prod — via GitHub Actions,
mirroring the `isotope-pattern-lib` / `isotope-pattern-service` CI pattern:

- `ci-branch.yaml`: on every push to a non-`master` branch, lint + build + test.
- `ci-pull-request.yaml`: on PRs into `master`, lint + build + test, then deploy to the
  test Netlify site and check it responds with HTTP 200.
- `ci-master.yaml`: on push to `master`, lint + build + test, tag a release (using the
  same `[MAJOR]`/`[MINOR]`/`[PATCH]` PR-title convention as the other repos), then
  deploy to the prod Netlify site.

### One-time setup ###

1. Create two Netlify sites (e.g. `isotope-pattern-ui-test`, `isotope-pattern-ui-prod`),
   with builds disabled/unlinked from a repo — deploys are pushed by GitHub Actions via
   the Netlify CLI, not Netlify's own build hooks.
2. Add these GitHub Actions secrets to this repo:
   - `NETLIFY_AUTH_TOKEN` — a Netlify personal access token
   - `NETLIFY_TEST_SITE_ID`, `NETLIFY_PROD_SITE_ID` — the site IDs from step 1
   - `TEST_API_BASE_URL`, `PROD_API_BASE_URL` — the `isotope-pattern-service` URLs to
     build against for each environment
3. Make sure `isotope-pattern-service` has CORS enabled for browser requests from the
   Netlify origins (see its `main.py`).
