const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface PeriodParts {
	/** Highlighted start year. */
	year: string;
	/** Start month abbreviation, when the source has one. */
	month: string | null;
	/** End of the range, e.g. "Jun 2021", "2017" or "Present". */
	end: string;
}

function formatPoint(point: string): { year: string; month: string | null; label: string } {
	const m = point.match(/^(\d{1,2})\/(\d{4})$/);
	if (!m) return { year: point, month: null, label: point };
	const month = MONTHS[Number(m[1]) - 1] ?? null;
	return { year: m[2], month, label: month ? `${month} ${m[2]}` : m[2] };
}

/** Parses "09/2019 - 06/2021", "01/2023 - Present" or "2014 - 2017". */
export function parsePeriod(period: string): PeriodParts {
	const [from, to = ''] = period.split(/\s+-\s+/);
	const start = formatPoint(from);
	return { year: start.year, month: start.month, end: to ? formatPoint(to).label : '' };
}
