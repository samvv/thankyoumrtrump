// The link-preview image (Open Graph / Twitter card), rendered at build time.
// It reproduces the thank-you card from the top of the page, in light mode,
// because previews don't follow the viewer's color scheme.

import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import type { APIRoute } from 'astro';

const WIDTH = 1200;
const HEIGHT = 630;

const color = {
	bg: '#f4efe6',
	card: '#fffdf8',
	text: '#1d1b19',
	muted: '#6b655d',
	rule: '#d9d2c6',
	accent: '#a3261b',
};

// resvg needs static TrueType fonts; the site's own fonts are system fonts,
// so the image uses open lookalikes bundled in the repo.
const fontDir = resolve('src/assets/fonts');
const fontFiles = [
	'EBGaramond-Italic.ttf',
	'EBGaramond-SemiBoldItalic.ttf',
	'Inter-Regular.ttf',
	'Inter-Bold.ttf',
].map((file) => resolve(fontDir, file));

const serif = `font-family="EB Garamond" font-style="italic"`;
const sans = `font-family="Inter"`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
	<defs>
		<filter id="grain" x="0" y="0" width="100%" height="100%">
			<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
			<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.2 -0.08" />
		</filter>
		<path id="seal-arc" d="M16 60a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
	</defs>

	<rect width="100%" height="100%" fill="${color.bg}" />

	<!-- The card, with a second inset rule like printed stationery. -->
	<rect x="70.5" y="60.5" width="1059" height="509" fill="${color.card}" stroke="${color.rule}" stroke-width="1.5" />
	<rect x="79.5" y="69.5" width="1041" height="491" fill="none" stroke="${color.rule}" stroke-width="1.5" />

	<!-- Grain over everything, as on the page. -->
	<rect width="100%" height="100%" filter="url(#grain)" />

	<g transform="translate(942 96) scale(1.4) rotate(10 60 60)" color="${color.accent}">
		<circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2" />
		<circle cx="60" cy="60" r="52.5" fill="none" stroke="currentColor" stroke-width="0.75" />
		<circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="0.75" />
		<text fill="currentColor" ${sans} font-size="9" font-weight="700" letter-spacing="2.45">
			<textPath xlink:href="#seal-arc">WITH GRATITUDE ★ SINCERELY YOURS ★</textPath>
		</text>
		<g transform="translate(60 60) scale(1.55) translate(-16 -16.5)" fill="currentColor">
			<path d="M13.4 8 18.6 8 22.5 24 16 30.5 9.5 24Z" />
			<path d="M12 2.5 20 2.5 18.6 7.2 13.4 7.2Z" />
		</g>
	</g>

	<text x="150" y="168" fill="${color.muted}" ${sans} font-size="19" font-weight="700" letter-spacing="2.7">A NOTE OF THANKS</text>

	<text x="146" y="262" fill="${color.text}" ${serif} font-size="80" font-weight="600">Thank You, Mr. Trump</text>

	<text fill="${color.text}" ${sans} font-size="27">
		<tspan x="150" y="340">A grateful record of everything you and your friends</tspan>
		<tspan x="150" y="380">have done for America and the world.</tspan>
	</text>

	<text x="150" y="462" fill="${color.muted}" ${serif} font-size="27">With sincere appreciation,</text>
	<text x="150" y="506" fill="${color.text}" ${serif} font-size="38">The rest of the world</text>
</svg>`;

export const GET: APIRoute = async () => {
	const png = new Resvg(svg, {
		font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
		fitTo: { mode: 'width', value: WIDTH },
	})
		.render()
		.asPng();

	// JPEG, not PNG: the grain is noise, which PNG can't compress (it came out
	// near 1 MB), and some link-preview crawlers drop images that large.
	const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

	return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } });
};
