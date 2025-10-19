// Hook personalizado para usar datos de loaders
// Archivo: src/hooks/useLoaderData.js

import { useLoaderData as useRouterLoaderData } from "react-router-dom";

// Hook wrapper que proporciona tipado y estructura consistente
export const useLoaderData = () => {
  return useRouterLoaderData();
};

// Hook específico para datos de Home
export const useHomeData = () => {
  const data = useRouterLoaderData();
  return {
    hero: data?.hero || {},
    stats: data?.stats || {},
    featuredProducts: data?.featuredProducts || []
  };
};

// Hook específico para datos de Nosotros
export const useNosotrosData = () => {
  const data = useRouterLoaderData();
  return {
    mission: data?.mission || "",
    vision: data?.vision || "",
    timeline: data?.timeline || [],
    values: data?.values || [],
    team: data?.team || {}
  };
};

// Hook específico para datos de Productos
export const useProductosData = () => {
  const data = useRouterLoaderData();
  return {
    categories: data?.categories || [],
    products: data?.products || [],
    specialOffers: data?.specialOffers || []
  };
};

// Hook específico para datos de Personaliza Tu Torta
export const usePersonalizaTuTortaData = () => {
  const data = useRouterLoaderData();
  return {
    customizationOptions: data?.customizationOptions || {
      sizes: [],
      flavors: [],
      fillings: [],
      decorations: []
    },
    deliveryInfo: data?.deliveryInfo || {}
  };
};

// Hook específico para datos del Blog
export const useBlogData = () => {
  const data = useRouterLoaderData();
  return {
    posts: data?.posts || [],
    categories: data?.categories || [],
    recentPosts: data?.recentPosts || 0,
    totalPosts: data?.totalPosts || 0,
    // Flag para saber si los datos vienen del loader o no
    hasLoaderData: data && data.posts && data.posts.length > 0
  };
};

// Hook específico para datos de Artículo
export const useArticuloData = () => {
  const data = useRouterLoaderData();
  return {
    post: data?.post || {},
    relatedPosts: data?.relatedPosts || []
  };
};

// Hook específico para datos de Contacto
export const useContactoData = () => {
  const data = useRouterLoaderData();
  return {
    contactInfo: data?.contactInfo || {},
    socialMedia: data?.socialMedia || [],
    branches: data?.branches || [],
    formConfig: data?.formConfig || {}
  };
};