#!/usr/bin/env bash
# Renders the public /stats report from the /hit beacon log (see the
# mazharrasyad_hits log_format in nginx/mazharrasyad.tech.conf). Run by
# mazharrasyad-stats.timer every 10 minutes.
#
# GoAccess keeps its totals in $DATA/db (--persist/--restore) and only parses
# lines newer than the last run, so history outlives logrotate's 14 days.
set -euo pipefail

LOG=/var/log/nginx/mazharrasyad.tech.hits.log
DATA=/var/lib/mazharrasyad-stats
GEOIP="$DATA/dbip-country-lite.mmdb"

mkdir -p "$DATA/db"

# Country lookup: DB-IP's free country database (CC BY 4.0), refreshed monthly.
# A failed download keeps the previous copy; the report works without one.
if [[ ! -s "$GEOIP" || -n "$(find "$GEOIP" -mtime +35)" ]]; then
	for month in "$(date -u +%Y-%m)" "$(date -u -d '-1 month' +%Y-%m)"; do
		if curl -fsSL "https://download.db-ip.com/free/dbip-country-lite-$month.mmdb.gz" | gunzip >"$GEOIP.tmp"; then
			mv "$GEOIP.tmp" "$GEOIP"
			break
		fi
	done
	rm -f "$GEOIP.tmp"
fi

# The rotated file is included so hits logged between the last run and a
# rotation are not lost; GoAccess skips lines it has already counted.
logs=()
for f in "$LOG.1" "$LOG"; do
	[[ -s $f ]] && logs+=("$f")
done
if ((${#logs[@]} == 0)); then
	[[ -s $DATA/index.html ]] || echo '<!doctype html><meta charset="utf-8"><title>Stats</title><p>No hits logged yet.</p>' >"$DATA/index.html"
	exit 0
fi

geoip=()
[[ -s $GEOIP ]] && geoip=(--geoip-database="$GEOIP")

goaccess "${logs[@]}" \
	--no-global-config \
	--log-format=COMBINED \
	--datetime-format='%d/%b/%Y:%H:%M:%S %z' \
	--tz=Asia/Jakarta \
	--persist --restore --db-path="$DATA/db" \
	"${geoip[@]}" \
	--ignore-crawlers \
	--anonymize-ip \
	--ignore-panel=HOSTS \
	--ignore-panel=STATUS_CODES \
	--ignore-panel=NOT_FOUND \
	--ignore-panel=STATIC_REQUESTS \
	--ignore-panel=VIRTUAL_HOSTS \
	--ignore-panel=REMOTE_USER \
	--ignore-panel=CACHE_STATUS \
	--ignore-panel=MIME_TYPE \
	--ignore-panel=TLS_TYPE \
	--ignore-panel=KEYPHRASES \
	--html-report-title='mazharrasyad.tech stats' \
	--output="$DATA/index.tmp.html"
mv "$DATA/index.tmp.html" "$DATA/index.html"
