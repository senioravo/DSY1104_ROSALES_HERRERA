export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extraer token_ws de la query string
  const { token_ws } = req.query;
  
  if (!token_ws) {
    console.error('Token no proporcionado en la query string');
    return res.redirect(307, 'https://dsy-1104-rosales-herrera.vercel.app/checkout/error');
  }

  // URL del backend en EC2
  const targetUrl = `http://100.30.4.167:8084/api/ventas/transbank/return?token_ws=${token_ws}`;
  
  try {
    console.log('Transbank return proxy - Token:', token_ws);
    console.log('Forwarding to:', targetUrl);
    
    // Llamar al endpoint del backend
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Backend response status:', response.status);
    
    // Si el backend devuelve una redirección (302/307)
    const location = response.headers.get('location');
    if (location) {
      console.log('Redirecting to:', location);
      return res.redirect(307, location);
    }
    
    // Si no hay redirección pero fue exitoso
    if (response.ok) {
      // Por defecto redirigir a página de éxito
      return res.redirect(307, 'https://dsy-1104-rosales-herrera.vercel.app/checkout/result?status=COMPLETADA');
    } else {
      // Error en el backend
      console.error('Error response from backend:', response.status);
      return res.redirect(307, 'https://dsy-1104-rosales-herrera.vercel.app/checkout/result?status=RECHAZADA');
    }
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.redirect(307, 'https://dsy-1104-rosales-herrera.vercel.app/checkout/error');
  }
}
