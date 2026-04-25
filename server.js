// Production static server for Railway / любой Node-хостинг.
// Использует serve-handler из пакета `serve`. Кроссплатформенно (без шелл-подстановок).
import http from 'node:http'
import handler from 'serve-handler'

const port = Number(process.env.PORT) || 3000
const host = '0.0.0.0'

const server = http.createServer((req, res) => {
  return handler(req, res, {
    public: 'dist',
    cleanUrls: true,
    rewrites: [{ source: '**', destination: '/index.html' }],
    headers: [
      {
        source: 'assets/**',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '**/*.html',
        headers: [{ key: 'Cache-Control', value: 'no-cache' }],
      },
    ],
  })
})

server.listen(port, host, () => {
  console.log(`Halol Avlod running on http://${host}:${port}`)
})
