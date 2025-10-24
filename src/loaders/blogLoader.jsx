export async function blogLoader() {
    // Simular delay de red (opcional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
        articles: blogArticles,
        categories: ['Todos', 'Consejos', 'Recetas', 'Noticias'],
        featuredArticle: blogArticles[0]
    };
}