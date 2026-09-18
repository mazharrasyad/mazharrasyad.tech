// migrate parses the legacy projects-YYYY.html pages and emits a single
// structured projects.json consumed by the SvelteKit frontend. One-off tool,
// not part of the running server.
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Project struct {
	Title      string   `json:"title"`
	Category   string   `json:"category"`
	Images     []string `json:"images"`
	Description string  `json:"description"`
	Tools      string   `json:"tools"`
	Updated    string   `json:"updated,omitempty"`
	Visibility string   `json:"visibility"`
	SourceURL  string   `json:"sourceUrl"`
}

type YearData struct {
	Year     int       `json:"year"`
	Projects []Project `json:"projects"`
}

var numberPrefix = regexp.MustCompile(`^\d+\.\s*`)

func main() {
	root := "../" // run from backend/, legacy html lives at repo root
	if len(os.Args) > 1 {
		root = os.Args[1]
	}

	matches, err := filepath.Glob(filepath.Join(root, "projects-*.html"))
	if err != nil || len(matches) == 0 {
		log.Fatalf("no projects-*.html found under %s: %v", root, err)
	}
	sort.Strings(matches)

	var years []YearData
	total := 0
	for _, path := range matches {
		year, projects := parseFile(path)
		years = append(years, YearData{Year: year, Projects: projects})
		total += len(projects)
		fmt.Printf("%s: year=%d projects=%d\n", filepath.Base(path), year, len(projects))
	}

	sort.Slice(years, func(i, j int) bool { return years[i].Year > years[j].Year })

	out, err := json.MarshalIndent(years, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	outPath := filepath.Join(root, "frontend", "src", "lib", "data", "projects.json")
	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		log.Fatal(err)
	}
	if err := os.WriteFile(outPath, out, 0o644); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("wrote %s (total projects: %d)\n", outPath, total)
}

func parseFile(path string) (int, []Project) {
	f, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	doc, err := goquery.NewDocumentFromReader(f)
	if err != nil {
		log.Fatal(err)
	}

	base := filepath.Base(path)
	yearStr := strings.TrimSuffix(strings.TrimPrefix(base, "projects-"), ".html")
	year, err := strconv.Atoi(yearStr)
	if err != nil {
		log.Fatalf("cannot parse year from %s: %v", base, err)
	}

	var projects []Project

	// Each card is a direct child of the grid container inside <main>.
	doc.Find("main .grid").First().Children().Each(func(_ int, card *goquery.Selection) {
		p := Project{Visibility: "Public"}

		h3 := card.Find("h3").First()
		p.Title = numberPrefix.ReplaceAllString(strings.TrimSpace(h3.Text()), "")

		// category badge: the sibling span next to h3 in its parent row.
		h3.Parent().Find("span").First().Each(func(_ int, s *goquery.Selection) {
			p.Category = strings.TrimSpace(s.Text())
		})

		card.Find("img").Each(func(_ int, img *goquery.Selection) {
			if src, ok := img.Attr("src"); ok {
				p.Images = append(p.Images, src)
			}
		})

		card.Find("p, div").EachWithBreak(func(_ int, el *goquery.Selection) bool {
			class, _ := el.Attr("class")
			if strings.Contains(class, "leading-relaxed") {
				p.Description = strings.TrimSpace(el.Text())
				return false
			}
			return true
		})

		card.Find("span").Each(func(_ int, s *goquery.Selection) {
			label := strings.TrimSpace(s.Text())
			switch label {
			case "Tools":
				p.Tools = strings.TrimSpace(s.Next().Text())
			case "Updated":
				p.Updated = strings.TrimSpace(s.Next().Text())
			case "Public", "Private":
				p.Visibility = label
			}
		})

		if a := card.Find("a").Last(); a.Length() > 0 {
			if href, ok := a.Attr("href"); ok {
				p.SourceURL = href
			}
		}

		if p.Title != "" {
			projects = append(projects, p)
		}
	})

	return year, projects
}
