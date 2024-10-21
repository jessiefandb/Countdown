require('esbuild').build({
  entryPoints: {
    'countdown-index.min': 'src/scripts/countdown.js'
  },
  outdir: 'theme/assets',
  platform: 'node',
  bundle: true,
  minifyIdentifiers: true,
  minifyWhitespace: true
})
