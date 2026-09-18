// csphash scans the prerendered SvelteKit build for inline <script> tags and
// writes their sha256 CSP source values (e.g. 'sha256-abc...') to a file, one
// space-separated line, so the running server can build a script-src
// directive with no 'unsafe-inline'. Run as part of build.sh, after the
// frontend build and before starting/restarting the server.
package main

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

var scriptTag = regexp.MustCompile(`(?s)<script(?:\s[^>]*)?>(.*?)</script>`)

func main() {
	if len(os.Args) != 3 {
		log.Fatalf("usage: csphash <build-dir> <output-file>")
	}
	buildDir, outPath := os.Args[1], os.Args[2]

	var htmlFiles []string
	err := filepath.WalkDir(buildDir, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && strings.HasSuffix(path, ".html") {
			htmlFiles = append(htmlFiles, path)
		}
		return nil
	})
	if err != nil {
		log.Fatal(err)
	}

	hashes := make(map[string]struct{})
	for _, path := range htmlFiles {
		b, err := os.ReadFile(path)
		if err != nil {
			log.Fatal(err)
		}
		for _, m := range scriptTag.FindAllSubmatch(b, -1) {
			body := m[1]
			if len(strings.TrimSpace(string(body))) == 0 {
				continue
			}
			sum := sha256.Sum256(body)
			hashes[base64.StdEncoding.EncodeToString(sum[:])] = struct{}{}
		}
	}

	var sorted []string
	for h := range hashes {
		sorted = append(sorted, fmt.Sprintf("'sha256-%s'", h))
	}
	sort.Strings(sorted)

	if err := os.WriteFile(outPath, []byte(strings.Join(sorted, " ")), 0o644); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("wrote %d script hashes from %d html files to %s\n", len(sorted), len(htmlFiles), outPath)
}
