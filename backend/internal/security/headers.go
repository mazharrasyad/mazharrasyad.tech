// Package security builds the Content-Security-Policy header. CSP has to be
// set by this server (not nginx) because script-src needs the sha256 hashes
// of this specific build's inline <script> tags (see cmd/csphash) -- nginx
// serves multiple unrelated vhosts on this box and has no per-app build
// artifacts to read from. Every other security header (HSTS, X-Frame-Options,
// etc.) is set once, centrally, in the nginx vhost.
package security

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

// LoadCSP reads the sha256 hash list written by cmd/csphash and returns the
// header value to send on every response.
func LoadCSP(hashesPath string) (string, error) {
	b, err := os.ReadFile(hashesPath)
	if err != nil {
		return "", fmt.Errorf("load CSP script hashes (run build.sh's csphash step first): %w", err)
	}
	hashes := strings.TrimSpace(string(b))
	if hashes == "" {
		return "", fmt.Errorf("CSP script hashes file %s is empty", hashesPath)
	}

	directives := []string{
		"default-src 'self'",
		"script-src 'self' " + hashes,
		// SvelteKit's own client runtime creates a visually-hidden
		// #svelte-announcer div (screen-reader route-change announcements)
		// with a hardcoded inline style attribute -- it never appears in the
		// prerendered HTML (only after hydration), so csphash can't pick it
		// up. The value is fixed by SvelteKit's source, not user content, so
		// it's pinned here by hash instead of falling back to unsafe-inline.
		// 'unsafe-hashes' is required for a hash to match an attribute
		// (rather than a <style> block). Re-verify this hash if a SvelteKit
		// upgrade changes internal/kit/src/core/sync/write_root.js.
		"style-src 'self' 'unsafe-hashes' 'sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo='",
		"img-src 'self' data:",
		"font-src 'self'",
		"connect-src 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"object-src 'none'",
	}
	return strings.Join(directives, "; "), nil
}

// Middleware sets the Content-Security-Policy header on every response.
func Middleware(csp string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Security-Policy", csp)
		next.ServeHTTP(w, r)
	})
}
