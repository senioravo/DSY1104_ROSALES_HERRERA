export async function articuloLoader({ params }) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { slug } = params;
    
    // Buscar artículo por slug
    const article = blogArticles.find(art => art.slug === slug);
    
    if (!article) {
        throw new Response("Artículo no encontrado", { status: 404 });
    }
    
    // Artículos relacionados (excluyendo el actual)
    const relatedArticles = blogArticles
        .filter(art => art.id !== article.id)
        .slice(0, 3);
    
    return {
        article,
        relatedArticles
    };
}