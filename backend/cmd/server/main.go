// Command server serves the mazharrasyad.tech SvelteKit build and its
// read-only JSON API. Listens on a local port only; nginx terminates TLS and
// reverse-proxies to it.
package main

import (
	"log"
	"net/http"
	"os"

	"mazharrasyad.tech/backend/internal/projects"
	"mazharrasyad.tech/backend/internal/security"
	"mazharrasyad.tech/backend/internal/static"
)

func main() {
	addr := envOr("LISTEN_ADDR", "127.0.0.1:8090")
	staticDir := envOr("STATIC_DIR", "../frontend/build")
	dataDir := envOr("DATA_DIR", "../data")

	// build.sh copies frontend/src/lib/data/projects.json here so the
	// server doesn't need to reach into the frontend source tree.
	projectsHandler, err := projects.LoadHandler(dataDir + "/projects.json")
	if err != nil {
		log.Fatalf("failed to load projects data: %v", err)
	}

	csp, err := security.LoadCSP(dataDir + "/csp-script-hashes.txt")
	if err != nil {
		log.Fatalf("failed to load CSP hashes: %v", err)
	}

	mux := http.NewServeMux()
	mux.Handle("/api/projects", projectsHandler)
	mux.Handle("/api/projects/", projectsHandler)
	mux.Handle("/", static.Handler(staticDir))

	log.Printf("listening on %s (static dir: %s)", addr, staticDir)
	if err := http.ListenAndServe(addr, security.Middleware(csp, mux)); err != nil {
		log.Fatal(err)
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
