const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Default initial payload matching mockCms.js
const defaultCmsData = {
  products: [
    {
      id: "p1",
      title: "Obsidian Tailored Wool Trench",
      price: "$590.00",
      originalPrice: "$680.00",
      tag: "NEW",
      tagColor: "bg-obsidian text-crispwhite",
      category: "Outerwear",
      imagePrimary: "/assets/product_black_coat.jpg",
      imageHover: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      gifSrc: "https://media.giphy.com/media/l41YlE2Z8iM2u1Zc4/giphy.gif",
      inStock: true
    },
    {
      id: "p2",
      title: "Terracotta Artisanal Suit Blazer",
      price: "$480.00",
      originalPrice: "$550.00",
      tag: "SALE",
      tagColor: "bg-terracotta text-crispwhite",
      category: "Outerwear",
      imagePrimary: "/assets/hero_black_1.jpg",
      imageHover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      gifSrc: "https://media.giphy.com/media/3o7TKSxZqH1q6bJ1tS/giphy.gif",
      inStock: true
    }
  ],
  collections: [
    { id: "c1", title: "AW26 Capsule", itemCount: "14 Items", image: "/assets/hero_black_1.jpg" },
    { id: "c2", title: "Outerwear & Coats", itemCount: "8 Items", image: "/assets/product_black_coat.jpg" }
  ],
  slides: [
    { id: "s1", title: "THE NEW ELEGANCE", subtitle: "DISCOVER THE AW26 COLLECTION", image: "/assets/hero_black_1.jpg" },
    { id: "s2", title: "MODERN ARTISANRY", subtitle: "LAGOS HERITAGE & CRAFTSMANSHIP", image: "/assets/hero_black_2.jpg" }
  ]
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight options request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // GET /api/cms
    if (request.method === 'GET' && url.pathname === '/api/cms') {
      try {
        const value = await env.VENN_CMS_KV.get('cms_data');
        if (value === null) {
          // If empty, seed database with default mock payload
          await env.VENN_CMS_KV.put('cms_data', JSON.stringify(defaultCmsData));
          return new Response(JSON.stringify(defaultCmsData), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
        return new Response(value, {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    // POST /api/cms (Secured via API token key matching environment variable VENN_API_KEY)
    if (request.method === 'POST' && url.pathname === '/api/cms') {
      try {
        const authHeader = request.headers.get('Authorization') || '';
        const token = authHeader.replace('Bearer ', '').trim();
        const expectedToken = env.VENN_API_KEY || 'venn_secret_token_123';

        if (token !== expectedToken) {
          return new Response(JSON.stringify({ error: 'Unauthorized: Invalid API key' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        const body = await request.json();
        await env.VENN_CMS_KV.put('cms_data', JSON.stringify(body));

        return new Response(JSON.stringify({ success: true, message: 'CMS updated successfully' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    // Fallback 404
    return new Response(JSON.stringify({ error: 'Endpoint Not Found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  },
};
