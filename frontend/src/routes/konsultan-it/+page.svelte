<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categories, projectCountLabel } from '$lib/projects';

	// Google Ads landing page for the Indonesian "Konsultan IT" campaign; /services is the English page.
	const title = 'Konsultan IT untuk Bisnis & Instansi - Muhammad Azhar Rasyad';
	const url = 'https://mazharrasyad.tech/konsultan-it';
	const image = 'https://mazharrasyad.tech/logo.png';

	const waText = encodeURIComponent(
		'Halo Azhar, saya menemukan mazharrasyad.tech dan ingin konsultasi IT. Kapan bisa diskusi?'
	);
	const waUrl = `https://wa.me/6281290351971?text=${waText}`;
	const mailUrl = 'mailto:muhazharrasyad@gmail.com?subject=Konsultasi%20IT';

	const governmentCount = categories.find((c) => c.slug === 'government')?.projects.length ?? 0;

	const description = `Konsultan IT independen di Jakarta: perencanaan sistem, audit aplikasi, pemilihan teknologi dan transformasi digital. S2 Ilmu Komputer, 8+ tahun, ${projectCountLabel} proyek.`;

	const stats = [
		{ value: '8+', label: 'tahun pengalaman' },
		{ value: projectCountLabel, label: 'proyek selesai' },
		{ value: String(governmentCount), label: 'sistem instansi pemerintah' },
		{ value: 'S2', label: 'Ilmu Komputer' }
	];

	// Pain points a prospect searching "konsultan IT" typically arrives with.
	const problems = [
		'Proses kerja masih di Excel, kertas atau grup WhatsApp, dan mulai berantakan',
		'Ingin membuat aplikasi, tapi belum tahu mulai dari mana dan butuh biaya berapa',
		'Sudah punya sistem, tapi lambat, sering error atau vendornya sudah tidak ada',
		'Dapat beberapa penawaran vendor IT dan bingung mana yang masuk akal'
	];

	const services = [
		{
			icon: 'search',
			title: 'Analisis Kebutuhan & Perencanaan Sistem',
			text: 'Memetakan alur kerja tim Anda lalu menerjemahkannya menjadi rencana sistem yang jelas sebelum ada biaya pengembangan.',
			points: [
				'Pemetaan proses bisnis yang berjalan',
				'Spesifikasi fitur dan prioritas',
				'Estimasi waktu dan anggaran',
				'Roadmap pengembangan bertahap'
			]
		},
		{
			icon: 'lock',
			title: 'Audit & Review Aplikasi',
			text: 'Pemeriksaan menyeluruh atas aplikasi yang sudah ada: apa yang bermasalah, apa yang berisiko, dan apa yang layak dipertahankan.',
			points: [
				'Review kode dan struktur database',
				'Cek keamanan dasar dan hak akses',
				'Analisis performa dan bottleneck',
				'Rekomendasi: perbaiki atau bangun ulang'
			]
		},
		{
			icon: 'server',
			title: 'Arsitektur & Pemilihan Teknologi',
			text: 'Memilih teknologi, hosting dan pola integrasi yang sesuai skala dan anggaran, bukan sekadar yang sedang tren.',
			points: [
				'Pemilihan stack dan framework',
				'Hosting, server dan cloud',
				'Integrasi antar sistem dan API',
				'Beli aplikasi jadi atau bangun sendiri'
			]
		},
		{
			icon: 'landmark',
			title: 'Transformasi Digital & Arsitektur Enterprise',
			text: 'Mendigitalkan proses organisasi secara terarah, berbekal riset arsitektur enterprise untuk digitalisasi layanan.',
			points: [
				'Digitalisasi dari Excel dan kertas',
				'Alur persetujuan bertingkat',
				'Standarisasi data antar unit',
				'Dashboard untuk pengambilan keputusan'
			]
		},
		{
			icon: 'briefcase',
			title: 'Pendampingan Proyek & Vendor IT',
			text: 'Second opinion yang independen agar proyek IT Anda tidak salah arah dan anggaran tidak membengkak.',
			points: [
				'Review penawaran dan proposal vendor',
				'Penyusunan kebutuhan teknis (KAK/TOR)',
				'Pengawasan progres pengembangan',
				'Uji terima sebelum serah terima'
			]
		},
		{
			icon: 'monitor',
			title: 'Implementasi Sampai Jadi',
			text: 'Jika dibutuhkan, rekomendasi tidak berhenti di dokumen: saya juga bisa membangun sistemnya sampai berjalan.',
			points: [
				'Aplikasi web dan sistem informasi',
				'Dashboard dan laporan data',
				'API untuk web dan mobile',
				'Blockchain untuk verifikasi dokumen'
			]
		}
	] as const;

	const differentiators = [
		{
			icon: 'users',
			title: 'Langsung dengan konsultannya',
			text: 'Anda berdiskusi langsung dengan orang yang memahami teknisnya sampai level kode, tanpa perantara sales.'
		},
		{
			icon: 'graduation-cap',
			title: 'Berbasis ilmu, bukan coba-coba',
			text: 'Magister Ilmu Komputer dengan riset arsitektur enterprise, pemodelan data dan blockchain, serta tiga artikel jurnal ilmiah.'
		},
		{
			icon: 'landmark',
			title: 'Terbukti di proses yang kompleks',
			text: `${governmentCount} sistem untuk instansi pemerintah di Jakarta, dari kelurahan sampai tingkat kota: persetujuan bertingkat, pelaporan berkala dan hak akses per peran.`
		},
		{
			icon: 'check',
			title: 'Independen dan objektif',
			text: 'Rekomendasi tidak terikat vendor atau produk tertentu, sehingga yang disarankan adalah yang paling sesuai kebutuhan Anda.'
		}
	] as const;

	const process = [
		{
			title: 'Diskusi awal',
			text: 'Ceritakan kondisi dan tujuan Anda lewat WhatsApp atau email. Kita petakan masalah utamanya bersama.'
		},
		{
			title: 'Analisis & rekomendasi',
			text: 'Saya pelajari kebutuhan dan sistem yang ada, lalu memberikan rekomendasi tertulis beserta lingkup, waktu dan biaya.'
		},
		{
			title: 'Eksekusi',
			text: 'Rekomendasi dijalankan, baik saya bangun sendiri maupun mendampingi tim atau vendor Anda.'
		},
		{
			title: 'Pendampingan',
			text: 'Setelah sistem berjalan, tim Anda mendapat dokumentasi dan arahan untuk mengelolanya.'
		}
	];

	const faqs = [
		{
			q: 'Apa yang dikerjakan konsultan IT?',
			a: 'Membantu Anda mengambil keputusan teknologi yang tepat: menganalisis kebutuhan, merancang sistem, memilih teknologi dan vendor, mengaudit aplikasi yang ada, sampai mendampingi implementasinya.'
		},
		{
			q: 'Berapa biaya konsultan IT?',
			a: 'Biaya dihitung per kebutuhan berdasarkan lingkup dan durasi pekerjaan, bukan paket tetap. Setelah diskusi awal, Anda menerima rincian lingkup dan biaya tertulis sebelum pekerjaan dimulai.'
		},
		{
			q: 'Apakah bisa sekaligus membuatkan aplikasinya?',
			a: 'Bisa. Selain konsultasi, saya berpengalaman membangun aplikasi web, dashboard, API dan sistem informasi, jadi rekomendasi bisa langsung dieksekusi.'
		},
		{
			q: 'Apakah melayani klien di luar Jakarta?',
			a: 'Ya. Konsultasi dan pengerjaan dilakukan secara online, sehingga bisa melayani bisnis dan instansi di seluruh Indonesia.'
		},
		{
			q: 'Siapa yang cocok menggunakan layanan ini?',
			a: 'UMKM dan perusahaan yang ingin mendigitalkan proses kerja, instansi yang merencanakan sistem informasi, serta tim yang membutuhkan second opinion atas proyek atau vendor IT.'
		}
	];

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			name: 'Muhammad Azhar Rasyad - Konsultan IT',
			url,
			image,
			description,
			email: 'mailto:muhazharrasyad@gmail.com',
			telephone: '+6281290351971',
			areaServed: { '@type': 'Country', name: 'Indonesia' },
			address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
			founder: { '@type': 'Person', name: 'Muhammad Azhar Rasyad', url: 'https://mazharrasyad.tech/' },
			makesOffer: services.map((s) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: s.title, description: s.text }
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((f) => ({
				'@type': 'Question',
				name: f.q,
				acceptedAnswer: { '@type': 'Answer', text: f.a }
			}))
		}
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Muhammad Azhar Rasyad" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:locale" content="id_ID" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<div class="relative min-h-[calc(100dvh-3.5rem)] text-white p-4 md:p-8 w-full pb-28 md:pb-12">
	<div aria-hidden="true" class="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[900px]"></div>
	<main class="relative max-w-3xl mx-auto w-full space-y-14 md:space-y-20 pt-4 md:pt-10">
		<!-- Hero -->
		<section class="text-center md:text-left">
			<span
				class="inline-flex items-center gap-1.5 mb-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-widest"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Konsultan IT Independen
			</span>
			<h1 class="text-3xl md:text-5xl font-black leading-tight">
				Konsultan IT untuk <span
					class="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent"
					>Bisnis &amp; Instansi</span
				>
			</h1>
			<p class="mt-4 text-base md:text-lg text-slate-300 max-w-2xl">
				Bantu Anda mengambil keputusan teknologi yang tepat sebelum anggaran keluar: dari
				perencanaan sistem, audit aplikasi, pemilihan teknologi dan vendor, sampai transformasi
				digital proses kerja.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="konsultan-it-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Konsultasi via WhatsApp
				</a>
				<a
					href={mailUrl}
					data-track-location="konsultan-it-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Kirim Email
				</a>
			</div>
			<dl class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each stats as st (st.label)}
					<div class="rounded-2xl bg-white/5 border border-white/10 p-4 text-center md:text-left">
						<dt class="sr-only">{st.label}</dt>
						<dd class="text-2xl md:text-3xl font-black text-blue-300">{st.value}</dd>
						<dd class="mt-0.5 text-xs text-slate-400">{st.label}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<!-- Problems -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Apakah ini kondisi Anda?</h2>
			<p class="text-sm text-slate-400 mb-6">Masalah yang paling sering dibawa klien ke diskusi pertama.</p>
			<ul class="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
				{#each problems as p (p)}
					<li class="flex items-start gap-2 text-sm md:text-base text-slate-300">
						<Icon name="check" class="w-4 h-4 mt-1 shrink-0 text-emerald-400" />
						{p}
					</li>
				{/each}
			</ul>
		</section>

		<!-- Services -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Layanan Konsultasi IT</h2>
			<p class="text-sm text-slate-400 mb-6">Dari perencanaan sampai sistem berjalan.</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each services as s (s.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div
							class="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
						>
							<Icon name={s.icon} class="w-5 h-5" />
						</div>
						<h3 class="mt-4 font-bold text-white">{s.title}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{s.text}</p>
						<ul class="mt-3 space-y-1.5">
							{#each s.points as point (point)}
								<li class="flex items-start gap-2 text-sm text-slate-300">
									<Icon name="check" class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
									{point}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Why me -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Kenapa konsultasi dengan saya</h2>
			<p class="text-sm text-slate-400 mb-6">Bukan agensi besar, dan bukan jawaban template.</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each differentiators as d (d.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div
							class="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center"
						>
							<Icon name={d.icon} class="w-5 h-5" />
						</div>
						<h3 class="mt-4 font-bold text-white">{d.title}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{d.text}</p>
					</li>
				{/each}
			</ul>
			<div class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
				<a href="/projects" class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200">
					Lihat {projectCountLabel} proyek
					<Icon name="arrow-right" class="w-4 h-4" />
				</a>
				<a href="/journal" class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200">
					Lihat publikasi jurnal
					<Icon name="arrow-right" class="w-4 h-4" />
				</a>
			</div>
		</section>

		<!-- Process -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Alur konsultasi</h2>
			<p class="text-sm text-slate-400 mb-6">Online dari Jakarta, melayani seluruh Indonesia.</p>
			<ol class="grid gap-3 md:grid-cols-2">
				{#each process as step, i (step.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center gap-3">
							<span
								class="w-9 h-9 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center font-black tabular-nums"
								>{i + 1}</span
							>
							<h3 class="font-bold text-white">{step.title}</h3>
						</div>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{step.text}</p>
					</li>
				{/each}
			</ol>
		</section>

		<!-- FAQ -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-6">Pertanyaan yang sering diajukan</h2>
			<div class="space-y-3">
				{#each faqs as f (f.q)}
					<details class="group rounded-2xl bg-white/5 border border-white/10 p-5">
						<summary class="cursor-pointer list-none flex items-center justify-between gap-3 font-bold text-white">
							{f.q}
							<Icon name="chevron-right" class="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
						</summary>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{f.a}</p>
					</details>
				{/each}
			</div>
		</section>

		<!-- Final CTA -->
		<section
			class="rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 p-6 md:p-10 text-center"
		>
			<h2 class="text-2xl md:text-3xl font-black">Diskusikan kebutuhan IT Anda</h2>
			<p class="mt-3 text-slate-300 max-w-xl mx-auto">
				Ceritakan kondisi sistem dan proses kerja Anda saat ini. Saya bantu petakan masalahnya dan
				sarankan langkah yang paling masuk akal untuk anggaran Anda.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="konsultan-it-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Konsultasi via WhatsApp
				</a>
				<a
					href={mailUrl}
					data-track-location="konsultan-it-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Kirim Email
				</a>
			</div>
		</section>
	</main>
</div>

<!-- Ad visitors are mostly on phones: keep the WhatsApp button within thumb reach. -->
<a
	href={waUrl}
	target="_blank"
	rel="noopener noreferrer"
	data-track-location="konsultan-it-sticky"
	class="md:hidden fixed bottom-4 inset-x-4 z-40 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-black/40"
>
	<Icon name="whatsapp" class="w-5 h-5" />
	Konsultasi via WhatsApp
</a>
