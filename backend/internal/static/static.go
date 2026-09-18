// Package static serves the prerendered SvelteKit build from disk. Routes
// like /projects/2018 exist on disk as projects/2018.html (adapter-static's
// default, non-trailing-slash output), so extensionless requests are
// resolved to their .html file before falling through to the file server.
package static

import (
	"net/http"
	"os"
	"path/filepath"
)

func Handler(root string) http.Handler {
	fs := http.FileServer(http.Dir(root))

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		clean := filepath.Clean(r.URL.Path)
		candidate := filepath.Join(root, clean)

		if info, err := os.Stat(candidate); err == nil && !info.IsDir() {
			fs.ServeHTTP(w, r)
			return
		}

		if info, err := os.Stat(candidate + ".html"); err == nil && !info.IsDir() {
			r2 := r.Clone(r.Context())
			r2.URL.Path = clean + ".html"
			fs.ServeHTTP(w, r2)
			return
		}

		fs.ServeHTTP(w, r)
	})
}
