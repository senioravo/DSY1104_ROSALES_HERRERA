export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Capturar todo después de /api/ventas/
  const fullPath = req.url.replace(/^\/api\/ventas/, '');
  const targetUrl = `http://100.30.4.167:8084/api/ventas${fullPath}`;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    const options = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS' && req.body) {
      options.body = JSON.stringify(req.body);
    }

    console.log('Ventas proxy:', req.method, targetUrl);

    const response = await fetch(targetUrl, options);
    
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else if (response.status === 204) {
      return res.status(204).end();
    } else {
      const text = await response.text();
      return res.status(response.status).json({ message: text });
    }
  } catch (error) {
    console.error('Ventas proxy error:', error);
    return res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
