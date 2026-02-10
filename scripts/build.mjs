import { execSync } from 'child_process';
import { build, context } from 'esbuild';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const isWatch = process.argv.includes('--watch');

// --- CSS (Tailwind via PostCSS CLI) ---
function buildCSS() {
  console.log('[css] Building Tailwind…');
  execSync(
    `npx tailwindcss -i ./src/css/main.css -o ./gingr_theme/assets/main.css --minify`,
    { cwd: root, stdio: 'inherit' }
  );
  console.log('[css] Done.');
}

// --- JS (esbuild) ---
const jsConfig = {
  entryPoints: [resolve(root, 'src/js/main.js')],
  bundle: true,
  outfile: resolve(root, 'gingr_theme/assets/main.js'),
  format: 'iife',
  minify: true,
  target: ['es2020'],
};

async function run() {
  // Always build CSS first
  buildCSS();

  if (isWatch) {
    // Watch JS
    const ctx = await context(jsConfig);
    await ctx.watch();
    console.log('[js] Watching for changes…');

    // Watch CSS via Tailwind --watch
    const { spawn } = await import('child_process');
    const tw = spawn(
      'npx',
      ['tailwindcss', '-i', './src/css/main.css', '-o', './gingr_theme/assets/main.css', '--watch', '--minify'],
      { cwd: root, stdio: 'inherit', shell: true }
    );
    tw.on('error', (e) => console.error('[css watch]', e));
  } else {
    await build(jsConfig);
    console.log('[js] Done.');
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
