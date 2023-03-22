import QRCode from 'qrcode'

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())

    const qrcode = await QRCode.create('https:/' + pathname)
    const svg = await qrcode.toString('https:/' + pathname, { type: 'svg' })
    const utf = await qrcode.toString('https:/' + pathname, { type: 'utf8' })
    const terminal = await qrcode.toString('https:/' + pathname, { type: 'terminal' })
    
    return new Response(JSON.stringify({qrcode, svg, utf, terminal}), {})
  }
}

const headers = {
  'content-type': 'image/svg+xml' 
}
