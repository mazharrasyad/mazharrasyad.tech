# mazharrasyad.tech

Personal portfolio — Muhammad Azhar Rasyad, Software Engineer. 130+ projects, 2018–present.

Live: [mazharrasyad.tech](https://mazharrasyad.tech)

## Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev) (Svelte 5, TypeScript, Tailwind CSS v4), prerendered to static HTML via `adapter-static`. Project archive lives in `frontend/src/lib/data/projects.json` and is grouped by year on disk but rendered by category (`group` field: Government, Company, Organization, Research, Campus, Learning) at `/projects` and `/projects/[category]`.
- **Backend:** Go. Serves the prerendered build and a small read-only JSON API (`GET /api/projects`, `GET /api/projects/{year}`), and sets the `Content-Security-Policy` header (built from this build's inline-script hashes — see `backend/cmd/csphash`).
- **Ops:** nginx (TLS via Certbot) reverse-proxies to the Go service, which runs as a hardened, fully read-only systemd unit (`systemd/mazharrasyad-web.service`) under a dedicated unprivileged user.

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
./build.sh                                 # builds frontend + backend, stages data/projects.json + CSP hashes
sudo systemctl restart mazharrasyad-web    # picks up the new build/binary
```

`build.sh` requires Go 1.22+ and Node 20+ on the host.

## Project data

`frontend/src/lib/data/projects.json` is the single source of truth for the project archive, grouped by year. It was originally migrated from the old flat-HTML site via `backend/cmd/migrate` (one-off tool, kept for reference — not part of the running server). Screenshots referenced by `images` live in `frontend/static/projects/<year>/<project>/`.

## Connect

- **LinkedIn:** [linkedin.com/in/mazharrasyad](https://www.linkedin.com/in/mazharrasyad)
- **GitHub:** [github.com/mazharrasyad](https://github.com/mazharrasyad)
- **Email:** [muhazharrasyad@gmail.com](mailto:muhazharrasyad@gmail.com)
