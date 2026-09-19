# mazharrasyad.tech

Personal portfolio — Muhammad Azhar Rasyad, Software Engineer. 130+ projects, 2018–present.

Live: [mazharrasyad.tech](https://mazharrasyad.tech)

## Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev) (Svelte 5, TypeScript, Tailwind CSS v4), prerendered to static HTML via `adapter-static`. Project archive lives in `frontend/src/lib/data/projects.json` and is grouped by year on disk but rendered by category (`group` field: Government, Company, Organization, Research, Campus, Learning) at `/projects` and `/projects/[category]`.
- **Serving:** nginx (TLS via Certbot) serves the prerendered build in `frontend/build` directly -- no application server and no database. Clean URLs (`/projects` -> `projects.html`), one canonical URL per page (301s for `/x.html` and trailing slashes), real 404s, cache headers and security headers all live in `nginx/mazharrasyad.tech.conf` and `nginx/security-headers.conf`.
- **CSP:** the `Content-Security-Policy` header needs the sha256 of this build's inline scripts, so `build.sh` generates `nginx/csp.conf` from the build (`scripts/csp-hashes.mjs`) on every deploy.
- **SEO:** every page is prerendered with its own title, description, canonical and Open Graph/Twitter tags; the home page carries `Person` JSON-LD; `sitemap.xml` and `robots.txt` are generated/served from the build.

No third-party CDNs are loaded at runtime — fonts (Inter) and icons are bundled at build time.

## Development

```bash
cd frontend
npm install
npm run dev
```

## Deploy

From the repo root on the server:

```bash
./build.sh    # builds the frontend, regenerates nginx/csp.conf, tests + reloads nginx
```

`build.sh` requires Node 20+ and passwordless `sudo` for `nginx -t` / `systemctl reload nginx`.

The vhost is versioned here but lives in nginx's tree. After changing `nginx/mazharrasyad.tech.conf`:

```bash
sudo cp nginx/mazharrasyad.tech.conf /etc/nginx/sites-available/mazharrasyad.tech
sudo nginx -t && sudo systemctl reload nginx
```

## Project data

`frontend/src/lib/data/projects.json` is the single source of truth for the project archive; it is bundled into the prerendered pages at build time. Screenshots referenced by `images` live in `frontend/static/projects/<year>/<project>/`.

## Connect

- **LinkedIn:** [linkedin.com/in/mazharrasyad](https://www.linkedin.com/in/mazharrasyad)
- **GitHub:** [github.com/mazharrasyad](https://github.com/mazharrasyad)
- **Email:** [muhazharrasyad@gmail.com](mailto:muhazharrasyad@gmail.com)
