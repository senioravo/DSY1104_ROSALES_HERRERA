export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Construir la URL completa del backend
  const pathSegments = req.url.split('/api/usuarios')[1] || '';
  const targetUrl = `http://100.30.4.167:8081/api/usuarios${pathSegments}`;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Pasar Authorization header si existe
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    const options = {
      method: req.method,
      headers,
    };

    // Agregar body si no es GET/HEAD/OPTIONS
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
      // El body ya viene parseado por Vercel
      options.body = JSON.stringify(req.body);
    }

    console.log('Proxying to:', targetUrl, 'Method:', req.method);

    const response = await fetch(targetUrl, options);
    
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
