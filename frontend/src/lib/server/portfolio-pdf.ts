// Builds /portfolio.pdf at prerender time from the same JSON data the site
// renders: profile, education, publications, experience and every project.
// Written for the doctoral (S3) application, so research comes first.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import educationData from '$lib/data/education.json';
import experienceData from '$lib/data/experience.json';
import scholarData from '$lib/data/scholar.json';
import { bestPracticeProjects, categories, totalProjects, type ProjectWithYear } from '$lib/projects';
import { parsePeriod } from '$lib/timeline';
import type { Education, Experience, ScholarData } from '$lib/types';

const SITE = 'https://mazharrasyad.tech';
const STATIC_DIR = join(process.cwd(), 'static');
const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/inter/files');

const education = (educationData as Education[])
	.filter((e) => e.institution)
	.sort((a, b) => b.sortKey - a.sortKey);
const experience = (experienceData as Experience[]).slice().sort((a, b) => b.sortKey - a.sortKey);
const scholar = scholarData as ScholarData;

// Research first: it is what a doctoral committee reads for.
const GROUP_ORDER = ['Research', 'Government', 'Company', 'Organization', 'Campus', 'Learning'];
const groups = GROUP_ORDER.map((name) => categories.find((c) => c.name === name)!).filter(
	(c) => c && c.projects.length
);

const C = {
	ink: '#0f172a',
	body: '#334155',
	muted: '#64748b',
	faint: '#94a3b8',
	rule: '#e2e8f0',
	accent: '#1d4ed8',
	accentSoft: '#eff6ff',
	gold: '#b45309'
};

const PAGE = { margin: 50, width: 595.28, height: 841.89 };
const CONTENT_W = PAGE.width - PAGE.margin * 2;
const BOTTOM = PAGE.height - PAGE.margin - 14; // leave room for the footer

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function projectDate(p: ProjectWithYear) {
	return p.month ? `${MONTHS[p.month - 1]} ${p.year}` : String(p.year);
}

function projectLink(p: ProjectWithYear) {
	return p.websiteUrl ?? (p.visibility === 'Public' ? p.sourceUrl : undefined);
}

function periodLabel(period: string) {
	const p = parsePeriod(period);
	const start = p.month ? `${p.month} ${p.year}` : p.year;
	return p.end ? `${start} – ${p.end}` : start;
}

/** First screenshot of a project, downscaled to a JPEG so the PDF stays small. */
async function thumbnail(p: ProjectWithYear, width: number, height: number): Promise<Buffer | null> {
	const src = p.images[0];
	if (!src) return null;
	const file = join(STATIC_DIR, src.replace(/^\//, ''));
	if (!existsSync(file)) return null;
	return sharp(file)
		// Long full-page screenshots keep their top, where the hero section is.
		.resize({ width, height, fit: 'cover', position: 'top' })
		.flatten({ background: '#ffffff' })
		.jpeg({ quality: 72, mozjpeg: true })
		.toBuffer();
}

export async function buildPortfolioPdf(now = new Date()): Promise<ArrayBuffer> {
	const doc = new PDFDocument({
		size: 'A4',
		margin: PAGE.margin,
		bufferPages: true,
		info: {
			Title: 'Portfolio - Muhammad Azhar Rasyad',
			Author: 'Muhammad Azhar Rasyad',
			Subject: 'Academic and professional portfolio for doctoral (S3) application in Computer Science',
			Keywords: 'portfolio, software engineering, blockchain, data, computer science'
		}
	});

	const chunks: Buffer[] = [];
	doc.on('data', (c: Buffer) => chunks.push(c));
	const done = new Promise<void>((resolve) => doc.on('end', resolve));

	doc.registerFont('regular', join(FONT_DIR, 'inter-latin-400-normal.woff'));
	doc.registerFont('semibold', join(FONT_DIR, 'inter-latin-600-normal.woff'));
	doc.registerFont('bold', join(FONT_DIR, 'inter-latin-700-normal.woff'));
	doc.registerFont('black', join(FONT_DIR, 'inter-latin-800-normal.woff'));

	const x0 = PAGE.margin;

	/** Starts a new page when `h` points don't fit below the cursor. */
	const ensure = (h: number) => {
		if (doc.y + h > BOTTOM) doc.addPage();
	};

	const heightOf = (text: string, font: string, size: number, width: number, gap = 1.5) =>
		doc.font(font).fontSize(size).heightOfString(text, { width, lineGap: gap });

	const sectionTitle = (title: string, subtitle?: string) => {
		ensure(80);
		doc.moveDown(0.6);
		const y = doc.y;
		doc.rect(x0, y + 2, 3, 16).fill(C.accent);
		doc.font('black').fontSize(15).fillColor(C.ink).text(title, x0 + 11, y, { width: CONTENT_W - 11 });
		if (subtitle) {
			doc.font('regular').fontSize(9).fillColor(C.muted).text(subtitle, x0 + 11, doc.y + 2, {
				width: CONTENT_W - 11,
				lineGap: 1.5
			});
		}
		doc.moveDown(0.8);
		doc.x = x0;
	};

	const rule = () => {
		doc.moveTo(x0, doc.y).lineTo(x0 + CONTENT_W, doc.y).lineWidth(0.5).strokeColor(C.rule).stroke();
	};

	const bullets = (items: string[], indent = 0) => {
		for (const item of items) {
			const w = CONTENT_W - indent - 10;
			ensure(heightOf(item, 'regular', 9, w) + 3);
			const y = doc.y;
			doc.circle(x0 + indent + 2.5, y + 5.5, 1.3).fill(C.faint);
			doc.font('regular').fontSize(9).fillColor(C.body).text(item, x0 + indent + 10, y, {
				width: w,
				lineGap: 1.5
			});
			doc.moveDown(0.25);
		}
		doc.x = x0;
	};

	// ---------------------------------------------------------------- cover
	const photo = join(STATIC_DIR, 'logo.png');
	const photoSize = 84;
	doc.rect(0, 0, PAGE.width, 250).fill(C.ink);
	if (existsSync(photo)) {
		const img = await sharp(photo).resize(300, 300).png().toBuffer();
		doc.save();
		doc.circle(x0 + photoSize / 2, 60 + photoSize / 2, photoSize / 2).clip();
		doc.image(img, x0, 60, { width: photoSize, height: photoSize });
		doc.restore();
	}
	const tx = x0 + photoSize + 22;
	const tw = CONTENT_W - photoSize - 22;
	doc.font('semibold').fontSize(9).fillColor('#93c5fd').text('ACADEMIC & PROFESSIONAL PORTFOLIO', tx, 66, {
		width: tw,
		characterSpacing: 1.2
	});
	doc.font('black').fontSize(24).fillColor('#ffffff').text('Muhammad Azhar Rasyad', tx, doc.y + 4, { width: tw });
	doc.font('regular').fontSize(11).fillColor('#cbd5e1').text('Software Engineer · Master of Computer Science', tx, doc.y + 3, {
		width: tw
	});
	doc.font('regular').fontSize(9.5).fillColor('#94a3b8').text(
		'Prepared for doctoral (S3) application in Computer Science',
		tx,
		doc.y + 4,
		{ width: tw }
	);

	const contacts: [string, string][] = [
		['muhazharrasyad@gmail.com', 'mailto:muhazharrasyad@gmail.com'],
		['mazharrasyad.tech', SITE],
		['linkedin.com/in/mazharrasyad', 'https://www.linkedin.com/in/mazharrasyad'],
		['github.com/mazharrasyad', 'https://github.com/mazharrasyad'],
		['Google Scholar', scholar.profileUrl]
	];
	let cx = x0;
	let cy = 176;
	doc.font('regular').fontSize(8.5);
	for (const [label, href] of contacts) {
		const w = doc.widthOfString(label);
		if (cx + w > x0 + CONTENT_W) {
			cx = x0;
			cy += 15;
		}
		doc.fillColor('#e2e8f0').text(label, cx, cy, { link: href, lineBreak: false });
		cx += w + 16;
	}
	doc.font('regular').fontSize(8.5).fillColor('#94a3b8').text('Jakarta, Indonesia', x0, cy + 15, { lineBreak: false });

	// Key figures
	const stats: [string, string][] = [
		[`${totalProjects}`, 'projects documented'],
		['8+', 'years building software'],
		[`${scholar.publications.length}`, 'publications'],
		[`${scholar.citations}`, 'citations (Google Scholar)']
	];
	const statW = CONTENT_W / stats.length;
	const sy = 272;
	stats.forEach(([value, label], i) => {
		const sx = x0 + i * statW;
		doc.roundedRect(sx + (i ? 4 : 0), sy, statW - 4, 54, 6).fill(C.accentSoft);
		doc.font('black').fontSize(18).fillColor(C.accent).text(value, sx + (i ? 4 : 0) + 10, sy + 9, {
			width: statW - 24,
			lineBreak: false
		});
		doc.font('regular').fontSize(8).fillColor(C.muted).text(label, sx + (i ? 4 : 0) + 10, sy + 33, {
			width: statW - 24,
			lineBreak: false
		});
	});
	doc.x = x0;
	doc.y = sy + 70;

	sectionTitle('Profile');
	doc.font('regular').fontSize(10).fillColor(C.body).text(
		`I am a software engineer with more than eight years of hands-on experience and ${totalProjects} documented projects, ` +
			'most of them information systems for Indonesian government agencies, companies and communities. ' +
			'My master’s study at Universitas Budi Luhur moved this practical work toward research: my thesis compares the ' +
			'Raft and SmartBFT consensus algorithms in Hyperledger Fabric, and I have published on SVM-based record ' +
			'classification on a permissioned blockchain, enterprise architecture for healthcare digitalization and ' +
			'dimensional data modeling.',
		{ width: CONTENT_W, lineGap: 2.5, align: 'justify' }
	);
	doc.moveDown(0.6);
	doc.font('bold').fontSize(9.5).fillColor(C.ink).text('Research interests', { width: CONTENT_W });
	doc.moveDown(0.3);
	bullets([
		'Permissioned blockchain systems: consensus performance (Raft, SmartBFT) and data integrity on Hyperledger Fabric',
		'Machine learning on trusted data: classification models integrated with distributed ledgers',
		'Data engineering and modeling for decision support (Kimball dimensional modeling, dashboards)',
		'Enterprise architecture and digital transformation of public-sector and healthcare services'
	]);

	// ---------------------------------------------------------- education
	sectionTitle('Education');
	for (const e of education) {
		const highlightsH = e.highlights.reduce((h, t) => h + heightOf(t, 'regular', 9, CONTENT_W - 20) + 4, 0);
		ensure(44 + Math.min(highlightsH, 60));
		const y = doc.y;
		doc.font('bold').fontSize(11).fillColor(C.ink).text(e.degree, x0, y, { width: CONTENT_W - 110 });
		doc.font('semibold').fontSize(9).fillColor(C.accent).text(e.year, x0 + CONTENT_W - 110, y + 1, {
			width: 110,
			align: 'right'
		});
		doc.font('regular').fontSize(9.5).fillColor(C.muted).text(`${e.institution} · ${e.field}`, x0, doc.y + 1, {
			width: CONTENT_W
		});
		doc.moveDown(0.4);
		bullets(e.highlights, 6);
		doc.moveDown(0.5);
	}

	// ------------------------------------------------------- publications
	sectionTitle(
		'Publications',
		`${scholar.citations} citations · h-index ${scholar.hIndex} · i10-index ${scholar.i10Index} (Google Scholar)`
	);
	scholar.publications.forEach((p, i) => {
		const w = CONTENT_W - 22;
		ensure(heightOf(p.title, 'semibold', 10, w) + 34);
		const y = doc.y;
		doc.font('bold').fontSize(10).fillColor(C.accent).text(`[${i + 1}]`, x0, y, { width: 20 });
		doc.font('semibold').fontSize(10).fillColor(C.ink).text(p.title, x0 + 22, y, { width: w, lineGap: 1.5, link: p.url });
		doc.font('regular').fontSize(9).fillColor(C.body).text(p.authors, x0 + 22, doc.y + 1, { width: w });
		const cites = p.citations ? ` · cited by ${p.citations}` : '';
		doc.font('regular').fontSize(9).fillColor(C.muted).text(`${p.venue}, ${p.year}${cites}`, x0 + 22, doc.y + 1, {
			width: w
		});
		doc.font('regular').fontSize(8).fillColor(C.accent).text(p.url, x0 + 22, doc.y + 1, { width: w, link: p.url });
		doc.moveDown(0.7);
	});
	doc.x = x0;

	// --------------------------------------------------------- experience
	sectionTitle('Professional Experience');
	for (const e of experience) {
		ensure(60);
		const y = doc.y;
		doc.font('bold').fontSize(10.5).fillColor(C.ink).text(e.title, x0, y, { width: CONTENT_W - 130 });
		doc.font('semibold').fontSize(9).fillColor(C.accent).text(periodLabel(e.period), x0 + CONTENT_W - 130, y + 1, {
			width: 130,
			align: 'right'
		});
		doc.font('regular').fontSize(9.5).fillColor(C.muted).text(`${e.company} · ${e.type}`, x0, doc.y + 1, {
			width: CONTENT_W,
			link: e.companyUrl
		});
		doc.moveDown(0.4);
		bullets(e.bullets, 6);
		doc.moveDown(0.5);
	}

	// --------------------------------------------------- selected projects
	doc.addPage();
	sectionTitle(
		'Selected Projects',
		'Projects I consider reference work, each with the reason it stands out.'
	);
	for (const p of bestPracticeProjects) {
		const img = await thumbnail(p, 1000, 400);
		const imgH = img ? 200 : 0;
		const textH =
			heightOf(p.bestPractice!, 'regular', 9.5, CONTENT_W) + heightOf(p.description, 'regular', 9, CONTENT_W) + 60;
		ensure(imgH + textH);
		projectHeading(p);
		doc.font('semibold').fontSize(9.5).fillColor(C.gold).text(p.bestPractice!, x0, doc.y + 2, {
			width: CONTENT_W,
			lineGap: 1.5
		});
		doc.font('regular').fontSize(9).fillColor(C.body).text(p.description, x0, doc.y + 4, {
			width: CONTENT_W,
			lineGap: 1.5
		});
		const link = projectLink(p);
		if (link) {
			doc.font('regular').fontSize(8.5).fillColor(C.accent).text(link, x0, doc.y + 3, { width: CONTENT_W, link });
		}
		if (img) {
			const y = doc.y + 6;
			doc.save();
			doc.roundedRect(x0, y, CONTENT_W, imgH - 10, 6).clip();
			doc.image(img, x0, y, { cover: [CONTENT_W, imgH - 10], align: 'center' });
			doc.restore();
			doc.roundedRect(x0, y, CONTENT_W, imgH - 10, 6).lineWidth(0.5).strokeColor(C.rule).stroke();
			doc.y = y + imgH - 4;
		}
		doc.moveDown(0.6);
		rule();
		doc.moveDown(0.8);
	}

	function projectHeading(p: ProjectWithYear, width = CONTENT_W) {
		const y = doc.y;
		const link = projectLink(p);
		doc.font('bold').fontSize(10.5).fillColor(C.ink).text(p.title, x0, y, { width: width - 70, link });
		doc.font('semibold').fontSize(8.5).fillColor(C.accent).text(projectDate(p), x0 + width - 70, y + 1.5, {
			width: 70,
			align: 'right'
		});
		const meta = [p.category, p.group, p.tools, p.visibility === 'Private' ? 'Private' : null].filter(Boolean).join(' · ');
		doc.font('regular').fontSize(8.5).fillColor(C.muted).text(meta, x0, doc.y + 1, { width });
	}

	// ----------------------------------------------------- project catalog
	doc.addPage();
	sectionTitle(
		'Project Catalog',
		`All ${totalProjects} projects, grouped by where the work came from and listed newest first. ` +
			`Screenshots and live links are at ${SITE}/projects.`
	);
	const THUMB_W = 118;
	const THUMB_H = 74;
	const TEXT_W = CONTENT_W - THUMB_W - 14;
	for (const g of groups) {
		ensure(90);
		doc.moveDown(0.3);
		doc.font('black').fontSize(12).fillColor(C.accent).text(`${g.name}  `, x0, doc.y, { continued: true });
		doc.font('regular').fontSize(9).fillColor(C.muted).text(`${g.projects.length} projects`);
		doc.font('regular').fontSize(9).fillColor(C.muted).text(g.description, x0, doc.y + 4, { width: CONTENT_W });
		doc.moveDown(0.6);
		rule();
		doc.moveDown(0.6);

		for (const p of g.projects) {
			const img = await thumbnail(p, 354, 222);
			const w = img ? TEXT_W : CONTENT_W;
			const meta = [p.category, p.tools].join(' · ');
			const textH =
				heightOf(p.title, 'bold', 10, w - 70) +
				heightOf(meta, 'regular', 8.5, w) +
				heightOf(p.description, 'regular', 8.5, w) +
				10;
			const h = Math.max(textH, img ? THUMB_H : 0);
			ensure(h + 12);
			const top = doc.y;
			const link = projectLink(p);
			doc.font('bold').fontSize(10).fillColor(C.ink).text(p.title, x0, top, { width: w - 70, link });
			doc.font('semibold').fontSize(8.5).fillColor(C.accent).text(projectDate(p), x0 + w - 70, top + 1, {
				width: 70,
				align: 'right'
			});
			doc.font('regular').fontSize(8.5).fillColor(C.muted).text(meta, x0, doc.y + 1, { width: w });
			doc.font('regular').fontSize(8.5).fillColor(C.body).text(p.description, x0, doc.y + 2, {
				width: w,
				lineGap: 1.2
			});
			if (img) {
				const ix = x0 + CONTENT_W - THUMB_W;
				doc.save();
				doc.roundedRect(ix, top, THUMB_W, THUMB_H, 4).clip();
				doc.rect(ix, top, THUMB_W, THUMB_H).fill('#f1f5f9');
				doc.image(img, ix, top, { cover: [THUMB_W, THUMB_H], align: 'center' });
				doc.restore();
				doc.roundedRect(ix, top, THUMB_W, THUMB_H, 4).lineWidth(0.5).strokeColor(C.rule).stroke();
			}
			doc.x = x0;
			doc.y = Math.max(doc.y, top + (img ? THUMB_H : 0)) + 10;
		}
		doc.moveDown(0.6);
	}

	// ---------------------------------------------------------- footers
	const generated = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
	const range = doc.bufferedPageRange();
	for (let i = range.start; i < range.start + range.count; i++) {
		doc.switchToPage(i);
		if (i === 0) continue;
		// The footer sits inside the bottom margin; without this pdfkit would
		// treat it as overflow and start a new page.
		doc.page.margins.bottom = 0;
		const fy = PAGE.height - PAGE.margin + 12;
		doc.moveTo(x0, fy - 8).lineTo(x0 + CONTENT_W, fy - 8).lineWidth(0.5).strokeColor(C.rule).stroke();
		doc.font('regular').fontSize(7.5).fillColor(C.faint);
		doc.text(`Muhammad Azhar Rasyad · Portfolio · ${generated}`, x0, fy, { lineBreak: false });
		doc.text(`${SITE}  ·  ${i + 1} / ${range.count}`, x0, fy, {
			width: CONTENT_W,
			align: 'right',
			lineBreak: false
		});
	}

	doc.end();
	await done;
	const pdf = Buffer.concat(chunks);
	return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
}

