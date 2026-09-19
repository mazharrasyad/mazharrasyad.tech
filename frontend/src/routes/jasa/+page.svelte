<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { reveal } from '$lib/actions/reveal';

	const title = 'Jasa Pembuatan Website & Sistem Informasi - Muhammad Azhar Rasyad';
	const description =
		'Jasa pembuatan sistem informasi, aplikasi web, dan website company profile oleh Software Engineer dengan 8+ tahun pengalaman dan 130+ proyek. Konsultasi langsung via WhatsApp.';
	const url = 'https://mazharrasyad.tech/jasa';
	const image = 'https://mazharrasyad.tech/logo.png';

	const waText = encodeURIComponent(
		'Halo Mas Azhar, saya tertarik menggunakan jasa pembuatan website/aplikasi. Boleh konsultasi?'
	);
	const waUrl = `https://wa.me/6281290351971?text=${waText}`;

	const stats = [
		{ value: '8+', label: 'Tahun pengalaman' },
		{ value: '130+', label: 'Proyek dikerjakan' },
		{ value: '50+', label: 'Sistem untuk instansi pemerintah' }
	];

	const services = [
		{
			title: 'Sistem Informasi & Aplikasi Web',
			text: 'Aplikasi yang disesuaikan dengan alur kerja organisasi Anda: pencatatan data, pengajuan dan persetujuan, pelaporan, hingga hak akses per pengguna.'
		},
		{
			title: 'Website Company Profile',
			text: 'Situs perusahaan yang menampilkan profil, produk atau layanan, artikel, dan testimoni, dengan tombol konsultasi langsung ke WhatsApp.'
		},
		{
			title: 'Dashboard & Laporan Data',
			text: 'Ringkasan data dalam bentuk grafik dan rekapitulasi, sehingga pimpinan dapat memantau kinerja dan mengambil keputusan lebih cepat.'
		},
		{
			title: 'Aplikasi Operasional & Kasir (POS)',
			text: 'Sistem untuk pemesanan, reservasi, stok, transaksi penjualan, dan pengelolaan operasional harian usaha.'
		},
		{
			title: 'API & Integrasi Sistem',
			text: 'Backend REST API, autentikasi, dan penghubungan aplikasi Anda dengan sistem lain yang sudah berjalan.'
		}
	];

	const projects = [
		{
			name: 'Kin Baja Suksestama',
			type: 'Company profile',
			text: 'Situs perusahaan trading material baja dengan katalog produk, artikel, testimoni, dan konsultasi via WhatsApp.'
		},
		{
			name: 'Folio POS',
			type: 'Aplikasi kasir',
			text: 'Point of Sale untuk ritel dan usaha lokal: transaksi penjualan, inventaris dan stok, serta laporan penjualan.'
		},
		{
			name: 'Recerva',
			type: 'Reservasi hotel',
			text: 'Platform manajemen properti dan mesin pemesanan hotel dengan dukungan multi-tenant untuk banyak hotel.'
		},
		{
			name: 'Putra Jasa V2',
			type: 'Manajemen rental',
			text: 'Sistem rental kendaraan dengan pemesanan otomatis, kalkulator harga sewa, dan pengelolaan data kendaraan.'
		},
		{
			name: 'Insight Hub',
			type: 'Dashboard data',
			text: 'Dashboard analitik yang menyajikan grafik dan ringkasan visual kinerja bisnis.'
		},
		{
			name: 'SIDANRU',
			type: 'Sistem pemesanan',
			text: 'Reservasi ruang rapat dan fasilitas dengan pencegahan jadwal bentrok otomatis.'
		}
	];

	const stack = ['Laravel', 'Livewire', 'Tailwind CSS', 'MySQL', 'PostgreSQL', 'Vue.js', 'React', 'Python'];

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Muhammad Azhar Rasyad - Jasa Pembuatan Website & Sistem Informasi',
		url,
		image,
		email: 'mailto:muhazharrasyad@gmail.com',
		telephone: '+6281290351971',
		areaServed: { '@type': 'Country', name: 'Indonesia' },
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

<div class="min-h-[calc(100dvh-3.5rem)] text-white p-4 md:p-8 w-full pb-28 md:pb-12">
	<main class="max-w-3xl mx-auto w-full space-y-14 md:space-y-20 pt-4 md:pt-10">
		<!-- Hero -->
		<section use:reveal class="text-center md:text-left">
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
				Butuh website perusahaan, aplikasi internal, atau sistem untuk merapikan pekerjaan yang
				masih manual? Saya membantu dari analisis kebutuhan hingga aplikasi berjalan.
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
				<a
					href="/projects"
					class="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold hover:bg-white/10 transition-all"
				>
					Lihat semua proyek
				</a>
			</div>
		</section>

		<!-- Stats -->
		<section use:reveal aria-label="Ringkasan pengalaman">
			<dl class="grid grid-cols-3 gap-3">
				{#each stats as s (s.label)}
					<div class="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
						<dt class="sr-only">{s.label}</dt>
						<dd class="text-2xl md:text-4xl font-black text-blue-300">{s.value}</dd>
						<p class="mt-1 text-[11px] md:text-xs text-slate-400 leading-tight" aria-hidden="true">
							{s.label}
						</p>
					</div>
				{/each}
			</dl>
		</section>

		<!-- Services -->
		<section use:reveal>
			<h2 class="text-2xl md:text-3xl font-black mb-6">Layanan</h2>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each services as s (s.title)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<h3 class="font-bold text-white">{s.title}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{s.text}</p>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Projects -->
		<section use:reveal>
			<h2 class="text-2xl md:text-3xl font-black mb-2">Contoh Hasil Kerja</h2>
			<p class="text-sm text-slate-400 mb-6">
				Sebagian dari proyek yang pernah saya kerjakan. Daftar lengkapnya ada di halaman
				<a
					href="/projects"
					class="text-blue-300 underline underline-offset-2 hover:text-blue-200">Projects</a
				>.
			</p>
			<ul class="grid gap-3 md:grid-cols-2">
				{#each projects as p (p.name)}
					<li class="rounded-2xl bg-white/5 border border-white/10 p-5">
						<p class="text-[11px] font-bold uppercase tracking-wider text-blue-300">{p.type}</p>
						<h3 class="mt-1 font-bold text-white">{p.name}</h3>
						<p class="mt-2 text-sm text-slate-300 leading-relaxed">{p.text}</p>
					</li>
				{/each}
			</ul>
			<div class="mt-4 text-sm">
				<a
					href="/projects"
					class="text-blue-300 underline underline-offset-2 hover:text-blue-200"
					>Lihat semua proyek &rarr;</a
				>
			</div>
		</section>

		<!-- Stack -->
		<section use:reveal>
			<h2 class="text-2xl md:text-3xl font-black mb-4">Teknologi</h2>
			<ul class="flex flex-wrap gap-2">
				{#each stack as t (t)}
					<li
						class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200"
					>
						{t}
					</li>
				{/each}
			</ul>
		</section>

		<!-- Final CTA -->
		<section
			use:reveal
			class="rounded-3xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 p-6 md:p-10 text-center"
		>
			<h2 class="text-2xl md:text-3xl font-black">Ceritakan kebutuhan Anda</h2>
			<p class="mt-3 text-slate-300 max-w-xl mx-auto">
				Jelaskan singkat apa yang ingin dibuat. Saya akan membalas dengan gambaran solusi dan
				langkah selanjutnya.
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

<!-- Sticky on phones, where most ad traffic lands. -->
<a
	href={waUrl}
	target="_blank"
	rel="noopener noreferrer"
	data-track-location="jasa-sticky"
	class="md:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 h-12 rounded-xl bg-green-500 text-white font-bold shadow-xl shadow-black/40 active:scale-[0.98] transition-transform"
>
	<Icon name="whatsapp" class="w-5 h-5" />
	Konsultasi via WhatsApp
</a>
