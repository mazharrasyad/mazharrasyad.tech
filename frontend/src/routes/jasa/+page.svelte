<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categories, projectCountLabel } from '$lib/projects';

	const title = 'Jasa Pembuatan Website & Sistem Informasi Instansi - Muhammad Azhar Rasyad';
	const url = 'https://mazharrasyad.tech/jasa';
	const image = 'https://mazharrasyad.tech/logo.png';

	const waText = encodeURIComponent(
		'Halo, saya menemukan layanan pembuatan website/aplikasi di mazharrasyad.tech dan ingin berkonsultasi mengenai kebutuhan saya. Kapan ada waktu untuk berdiskusi?'
	);
	const waUrl = `https://wa.me/6281290351971?text=${waText}`;

	const services = [
		{
			icon: 'monitor',
			title: 'Sistem Informasi & Aplikasi Web',
			text: 'Aplikasi yang disesuaikan dengan alur kerja organisasi Anda, menggantikan pencatatan manual di Excel atau kertas.',
			points: [
				'Pencatatan dan pengelolaan data',
				'Pengajuan dan persetujuan berjenjang',
				'Hak akses per pengguna dan peran',
				'Pelaporan dan ekspor data'
			]
		},
		{
			icon: 'globe',
			title: 'Website Company Profile',
			text: 'Situs perusahaan yang rapi dan mudah ditemukan di Google, tampil baik di ponsel maupun desktop.',
			points: [
				'Profil perusahaan, produk, dan layanan',
				'Artikel dan testimoni',
				'Formulir kontak dan tombol WhatsApp',
				'Dasar SEO agar mudah ditemukan'
			]
		},
		{
			icon: 'bar-chart',
			title: 'Dashboard & Laporan Data',
			text: 'Data yang tersebar dirangkum menjadi tampilan yang mudah dibaca, sehingga keputusan bisa diambil lebih cepat.',
			points: [
				'Grafik dan ringkasan kinerja',
				'Rekapitulasi harian, bulanan, tahunan',
				'Filter data sesuai kebutuhan',
				'Unduh laporan'
			]
		},
		{
			icon: 'shopping-cart',
			title: 'Aplikasi Operasional & Kasir (POS)',
			text: 'Sistem untuk menjalankan operasional harian usaha, dari pemesanan hingga laporan penjualan.',
			points: [
				'Transaksi penjualan dan kasir',
				'Stok dan inventaris',
				'Pemesanan dan reservasi',
				'Laporan penjualan'
			]
		},
		{
			icon: 'server',
			title: 'API & Integrasi Sistem',
			text: 'Backend yang aman dan terstruktur, serta penghubung antara aplikasi Anda dengan sistem lain yang sudah berjalan.',
			points: [
				'REST API untuk web dan mobile',
				'Autentikasi dan otorisasi',
				'Integrasi dengan layanan pihak ketiga',
				'Migrasi dan perapian data'
			]
		},
		{
			icon: 'lock',
			title: 'Blockchain & Verifikasi Dokumen',
			text: 'Untuk data yang harus tahan manipulasi, seperti sertifikat dan catatan resmi. Berbasis riset Hyperledger Fabric, bukan sekadar tren.',
			points: [
				'Smart contract dan chaincode',
				'Pencatatan yang tidak bisa diubah diam-diam',
				'Jaringan dengan konsensus Raft',
				'Antarmuka web untuk pengguna non-teknis'
			]
		}
	] as const;

	const education = [
		{
			level: 'S2',
			title: 'Master of Computer Science',
			place: 'Universitas Budi Luhur',
			year: '2024 - 2026',
			text: 'Riset pemodelan data, arsitektur enterprise untuk digitalisasi layanan kesehatan, serta blockchain Hyperledger Fabric. Tiga artikel telah dipublikasikan di jurnal ilmiah.'
		},
		{
			level: 'S1',
			title: 'Bachelor of Computer Science',
			place: 'STT Terpadu Nurul Fikri',
			year: '2017 - 2021',
			text: 'Juara 1 Hackathon Web Development Astro II, juara 2 dan 3 Smart City Web Development, juara 3 Web Design, dan finalis Hackathon Jamkrindo.'
		},
		{
			level: 'SMK',
			title: 'Rekayasa Perangkat Lunak',
			place: 'SMKN 1 Cibinong',
			year: '2014 - 2017',
			text: 'Awal belajar membangun perangkat lunak, dengan tugas akhir berupa plugin WordPress untuk multiposting.'
		}
	];

	const experienceHighlights = [
		'8+ tahun pengalaman sebagai Software Engineer',
		'Aktif di Tripasysfo dan Join PKS, serta menerima proyek freelance',
		'Berpengalaman untuk instansi pemerintah, perusahaan, dan organisasi'
	];

	// Learning and Campus work is left out on purpose: this page is about client work.
	const categoryInfo = [
		{
			slug: 'government',
			icon: 'landmark',
			label: 'Instansi Pemerintah',
			text: 'Sistem informasi untuk dinas dan pemerintah daerah, layanan publik, dan aplikasi kepegawaian.'
		},
		{
			slug: 'company',
			icon: 'briefcase',
			label: 'Company',
			text: 'Produk untuk perusahaan dan klien, sebagai karyawan, magang, maupun freelance.'
		},
		{
			slug: 'organization',
			icon: 'users',
			label: 'Organisasi',
			text: 'Sistem untuk komunitas, organisasi politik, dan organisasi kampus.'
		},
		{
			slug: 'research',
			icon: 'flask',
			label: 'Riset',
			text: 'Pengembangan berbasis blockchain, data, dan IoT dari riset pascasarjana.'
		}
	] as const;

	const projectCategories = categoryInfo.map((c) => ({
		...c,
		count: categories.find((cat) => cat.slug === c.slug)?.projects.length ?? 0
	}));

	const governmentCount = categories.find((c) => c.slug === 'government')?.projects.length ?? 0;

	const description = `Jasa website & sistem informasi untuk instansi, organisasi, dan perusahaan. ${governmentCount} sistem pemerintah, ${projectCountLabel} proyek, engineer 8+ tahun. Konsultasi via WhatsApp.`;

	const stats = [
		{ value: String(governmentCount), label: 'sistem instansi pemerintah' },
		{ value: projectCountLabel, label: 'proyek dikerjakan' },
		{ value: '8+', label: 'tahun pengalaman' },
		{ value: 'S2', label: 'Ilmu Komputer' }
	];

	// Every claim here is backed by something on /projects, /experience or /education.
	const differentiators = [
		{
			icon: 'landmark',
			title: 'Paham cara kerja instansi',
			text: `${governmentCount} sistem untuk kelurahan, kecamatan, dan suku dinas sudah dikerjakan. Alur berjenjang, laporan berkala, dan hak akses per peran bukan hal baru bagi saya.`
		},
		{
			icon: 'users',
			title: 'Langsung dengan engineernya',
			text: 'Anda berdiskusi dengan orang yang menulis kodenya, tanpa lapisan sales atau project manager yang menerjemahkan kebutuhan.'
		},
		{
			icon: 'graduation-cap',
			title: 'Dasar keilmuan, bukan coba-coba',
			text: 'Lulusan S2 Ilmu Komputer dengan riset data dan blockchain, serta tiga artikel jurnal ilmiah. Cocok untuk kebutuhan yang tidak standar.'
		},
		{
			icon: 'lock',
			title: 'Dibuat sesuai alur Anda',
			text: 'Bukan template yang dipaksakan. Sistem mengikuti cara kerja organisasi Anda, sehingga tim tidak perlu mengubah kebiasaan hanya untuk menyesuaikan aplikasi.'
		}
	] as const;

	// Real systems from /projects, grouped by the problem they solve.
	const useCases = [
		{
			icon: 'users',
			title: 'Kinerja & kepegawaian',
			text: 'Pencatatan aktivitas harian, penilaian atasan, dan rekap kinerja tenaga kerja.',
			examples: ['E-Kinerja PJLP', 'ESETKO PJLP', 'SIVERJAB']
		},
		{
			icon: 'file-text',
			title: 'Perizinan & layanan publik',
			text: 'Pengajuan warga, pelacakan status berkas, dan pelaporan dari masyarakat.',
			examples: ['SIP', 'SITEMAN-NIB', 'PAMOR', 'PPID']
		},
		{
			icon: 'search',
			title: 'Arsip, kontrak & pengadaan',
			text: 'Dokumen digital yang terindeks dan mudah dicari, alur kontrak, serta pengajuan kebutuhan barang.',
			examples: ['Arsip', 'SIARIS', 'E-Contract', 'E-RKBU']
		},
		{
			icon: 'map-pin',
			title: 'Kesehatan & lingkungan',
			text: 'Pencatatan lapangan oleh petugas dan pemantauan kasus atau kondisi wilayah.',
			examples: ['Posyandu', 'DBD', 'PSN', 'Penataan']
		}
	] as const;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Muhammad Azhar Rasyad - Jasa Pembuatan Website & Sistem Informasi',
		url,
		image,
		email: 'mailto:muhazharrasyad@gmail.com',
		telephone: '+6281290351971',
		areaServed: { '@type': 'Country', name: 'Indonesia' },
		knowsAbout: [
			'Sistem informasi pemerintah',
			'Aplikasi web',
			'Website company profile',
			'Migrasi data dari Excel',
			'Blockchain Hyperledger Fabric'
		],
		address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
		founder: { '@type': 'Person', name: 'Muhammad Azhar Rasyad', url: 'https://mazharrasyad.tech/' },
		makesOffer: services.map((s) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: s.title, description: s.text }
		}))
	};
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
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Menerima proyek baru
			</span>
			<h1 class="text-3xl md:text-5xl font-black leading-tight">
				Jasa Pembuatan <span
					class="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent"
					>Website &amp; Sistem Informasi</span
				>
			</h1>
			<p class="mt-4 text-base md:text-lg text-slate-300 max-w-2xl">
				Spesialis sistem untuk instansi, organisasi, dan perusahaan yang ingin beralih dari Excel
				dan kertas ke aplikasi yang benar-benar dipakai. Didampingi dari memahami kebutuhan sampai
				sistemnya siap berjalan.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="jasa-hero"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Konsultasi via WhatsApp
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

		<!-- Why me -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Kenapa memilih saya</h2>
			<p class="text-sm text-slate-400 mb-6">
				Bukan agensi besar dan bukan template siap pakai.
			</p>
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
		</section>

		<!-- Use cases -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Masalah yang sudah saya selesaikan</h2>
			<p class="text-sm text-slate-400 mb-6">
				Sistem nyata yang sudah berjalan, dikelompokkan menurut kebutuhannya.
			</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each useCases as u (u.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center gap-3">
							<div
								class="w-10 h-10 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
							>
								<Icon name={u.icon} class="w-5 h-5" />
							</div>
							<h3 class="font-bold text-white">{u.title}</h3>
						</div>
						<p class="mt-3 text-sm text-slate-300 leading-relaxed">{u.text}</p>
						<ul class="mt-3 flex flex-wrap gap-1.5">
							{#each u.examples as ex (ex)}
								<li
									class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300"
								>
									{ex}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
			<a
				href="/projects"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				Lihat semua proyek
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Services -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Layanan</h2>
			<p class="text-sm text-slate-400 mb-6">Apa saja yang bisa dikerjakan untuk Anda.</p>
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

		<!-- Education -->
		<section>
			<div class="flex items-center gap-3 mb-2">
				<div
					class="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 flex items-center justify-center"
				>
					<Icon name="graduation-cap" class="w-5 h-5" />
				</div>
				<h2 class="text-2xl md:text-3xl font-black">Latar Belakang Pendidikan</h2>
			</div>
			<p class="text-sm text-slate-400 mb-6">
				Dikerjakan dengan dasar keilmuan yang kuat, bukan sekadar coba-coba.
			</p>
			<ul class="space-y-3">
				{#each education as e (e.level)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<div class="flex items-center justify-between gap-3">
							<span
								class="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold"
								>{e.level}</span
							>
							<span class="text-xs text-slate-400">{e.year}</span>
						</div>
						<h3 class="mt-2 font-bold text-white">{e.title}</h3>
						<p class="text-sm text-slate-400">{e.place}</p>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{e.text}</p>
					</li>
				{/each}
			</ul>
			<a
				href="/education"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				Lihat riwayat pendidikan lengkap
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Experience -->
		<section>
			<div class="flex items-center gap-3 mb-6">
				<div
					class="w-11 h-11 shrink-0 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
				>
					<Icon name="briefcase" class="w-5 h-5" />
				</div>
				<h2 class="text-2xl md:text-3xl font-black">Pengalaman Kerja</h2>
			</div>
			<ul class="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2.5">
				{#each experienceHighlights as h (h)}
					<li class="flex items-start gap-2 text-sm text-slate-300">
						<Icon name="check" class="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
						{h}
					</li>
				{/each}
			</ul>
			<a
				href="/experience"
				class="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				Lihat pengalaman lengkap
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Projects -->
		<section>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Proyek yang Pernah Dikerjakan</h2>
			<p class="text-sm text-slate-400 mb-6">
				Dari {projectCountLabel} proyek yang telah dikerjakan, berikut sebarannya berdasarkan kategori.
			</p>
			<ul class="grid grid-cols-2 gap-3 mb-4">
				{#each projectCategories as c (c.slug)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5">
						<div class="flex items-center justify-between">
							<div
								class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center"
							>
								<Icon name={c.icon} class="w-5 h-5" />
							</div>
							<span class="text-3xl md:text-4xl font-black text-blue-300">{c.count}</span>
						</div>
						<h3 class="mt-3 font-bold text-white">{c.label}</h3>
						<p class="mt-1 text-xs md:text-sm text-slate-300 leading-relaxed">{c.text}</p>
					</li>
				{/each}
			</ul>
			<a
				href="/projects"
				class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200"
			>
				Lihat proyek lengkap
				<Icon name="arrow-right" class="w-4 h-4" />
			</a>
		</section>

		<!-- Final CTA -->
		<section
			class="rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 p-6 md:p-10 text-center"
		>
			<h2 class="text-2xl md:text-3xl font-black">Ceritakan kebutuhan Anda</h2>
			<p class="mt-3 text-slate-300 max-w-xl mx-auto">
				Punya rencana membuat website atau sistem? Silakan ceritakan dulu, nanti kita diskusikan
				bersama solusi yang paling cocok.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
				<a
					href={waUrl}
					target="_blank"
					rel="noopener noreferrer"
					data-track-location="jasa-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
				>
					<Icon name="whatsapp" class="w-5 h-5" />
					Chat WhatsApp
				</a>
				<a
					href="mailto:muhazharrasyad@gmail.com?subject=Konsultasi%20Jasa%20Pembuatan%20Website%2FAplikasi"
					data-track-location="jasa-footer"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					<Icon name="mail" class="w-5 h-5" />
					Kirim Email
				</a>
			</div>
		</section>
	</main>
</div>
