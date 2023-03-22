import QRCode from 'qrcode'

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())

    const svg = await QRCode.create('https:/' + pathname).toString({ type: 'svg' })
    
    return new Response(JSON.stringify(svg), {})
  }
}

const headers = {
  'content-type': 'image/svg+xml' 
}
