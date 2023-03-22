import QRCode from 'qrcode'

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())

    const qrcode = await QRCode.create('https:/' + pathname)
    const svg = await qrcode.toString({ type: 'svg' })
    
    return new Response(JSON.stringify({qrcode, svg}), {})
  }
}

const headers = {
  'content-type': 'image/svg+xml' 
}
