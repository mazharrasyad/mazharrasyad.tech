// Package projects serves the project archive as read-only JSON. The
// SvelteKit frontend prerenders its own pages directly from the same JSON
// file at build time; this API exists for any future consumer (e.g. a
// separate client, or programmatic access) that wants the raw data.
package projects

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type Project struct {
	Title       string   `json:"title"`
	Category    string   `json:"category"`
	Images      []string `json:"images"`
	Description string   `json:"description"`
	Tools       string   `json:"tools"`
	Updated     string   `json:"updated,omitempty"`
	Visibility  string   `json:"visibility"`
	SourceURL   string   `json:"sourceUrl"`
}

type YearData struct {
	Year     int       `json:"year"`
	Projects []Project `json:"projects"`
}

type Handler struct {
	years []YearData
}

func LoadHandler(jsonPath string) (*Handler, error) {
	b, err := os.ReadFile(jsonPath)
	if err != nil {
		return nil, err
	}
	var years []YearData
	if err := json.Unmarshal(b, &years); err != nil {
		return nil, err
	}
	return &Handler{years: years}, nil
}

// ServeHTTP handles GET /api/projects and GET /api/projects/{year}.
func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	yearParam := strings.TrimPrefix(r.URL.Path, "/api/projects")
	yearParam = strings.Trim(yearParam, "/")

	if yearParam == "" {
		json.NewEncoder(w).Encode(h.years)
		return
	}

	year, err := strconv.Atoi(yearParam)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid year"})
		return
	}

	for _, y := range h.years {
		if y.Year == year {
			json.NewEncoder(w).Encode(y)
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "year not found"})
}
