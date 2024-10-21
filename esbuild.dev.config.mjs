import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: {
    'countdown-index.min': 'src/scripts/countdown.js'
  },
  outdir: 'theme/assets',
  platform: 'node',
  sourcemap: true,
  bundle: true,
})

await ctx.watch()
console.log('watching...')