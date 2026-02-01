# vamoali.github.io
Landing page estática com Next.js 16.1.6 para GitHub Pages.

## Como rodar localmente
```bash
npm install
npm run dev
```

## Build estático (GitHub Pages)
```bash
npm run build
```

O build gera a pasta `out/` (export estático). Publique o conteúdo de `out/` no GitHub Pages.

### Base path (para project pages)
Se você estiver usando `https://usuario.github.io/REPO`, defina:
```bash
NEXT_PUBLIC_BASE_PATH=/REPO npm run build
```
