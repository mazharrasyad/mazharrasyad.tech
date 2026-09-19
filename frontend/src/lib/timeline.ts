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

function plural(n: number, unit: string, short: string) {
	return `${n} ${n === 1 ? unit : short}`;
}

/**
 * Length of a period as "1 yr 10 mos". Month-precise ranges ("09/2019 - 06/2021")
 * count both end months, like LinkedIn; year-only ranges ("2014 - 2017") are
 * whole years. "Present" runs up to `now`.
 */
export function formatDuration(period: string, now: Date): string {
	const [from, to = ''] = period.split(/\s+-\s+/);
	const s = from.match(/^(?:(\d{1,2})\/)?(\d{4})$/);
	if (!s) return '';

	const present = /^present$/i.test(to);
	const e = present ? null : to.match(/^(?:(\d{1,2})\/)?(\d{4})$/);
	if (!present && !e) return '';

	const monthPrecise = s[1] !== undefined;
	if (!monthPrecise) {
		const years = (e ? Number(e[2]) : now.getFullYear()) - Number(s[2]);
		return years > 0 ? plural(years, 'yr', 'yrs') : '';
	}

	const endYear = e ? Number(e[2]) : now.getFullYear();
	const endMonth = e ? Number(e[1]) : now.getMonth() + 1;
	const total = (endYear - Number(s[2])) * 12 + endMonth - Number(s[1]) + 1;
	if (total < 1) return '';

	const years = Math.floor(total / 12);
	const months = total % 12;
	return [years ? plural(years, 'yr', 'yrs') : '', months ? plural(months, 'mo', 'mos') : '']
		.filter(Boolean)
		.join(' ');
}
