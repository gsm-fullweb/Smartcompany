// Scripts / Seed Posts in database
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Simple parser for .env file
const dotenvPath = path.join(__dirname, '../.env');
if (fs.existsSync(dotenvPath)) {
  const envContent = fs.readFileSync(dotenvPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      let value = parts.slice(1).join('=').trim();
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper to extract first image from html content
const getFeaturedImage = (content) => {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : '/assets/logo_fundo_escuro.png';
};

async function seed() {
  console.log('Iniciando o seed dos posts no Supabase...');
  
  try {
    // 2. Read src/data/posts.ts
    const postsFilePath = path.join(__dirname, '../src/data/posts.ts');
    if (!fs.existsSync(postsFilePath)) {
      throw new Error(`Arquivo de posts não encontrado em: ${postsFilePath}`);
    }
    
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    
    // Find the starting bracket of the array
    const startIndex = postsFileContent.indexOf('[');
    if (startIndex === -1) {
      throw new Error('Não foi possível encontrar a declaração do array no posts.ts');
    }
    
    // Find the end of the array (we assume it's the last ]; or ] in the file)
    const lastBracketIndex = postsFileContent.lastIndexOf(']');
    if (lastBracketIndex === -1) {
      throw new Error('Não foi possível encontrar o fechamento do array no posts.ts');
    }
    
    const arrayStr = postsFileContent.slice(startIndex, lastBracketIndex + 1);
    
    // Evaluate the array string as Javascript code to get the array
    // This is safe here since we control the file content
    const blogPosts = eval(arrayStr);
    console.log(`Carregados ${blogPosts.length} posts do arquivo estático.`);
    
    // 3. Insert each post into database
    for (const post of blogPosts) {
      const imageUrl = getFeaturedImage(post.content);
      
      const mappedPost = {
        id: parseInt(post.id),
        site_slug: 'smartcompany',
        title: post.title,
        body: post.content,
        status: 'published',
        slug: post.slug,
        image_url: imageUrl,
        published_at: new Date(post.date).toISOString(),
        category: post.category,
        excerpt: post.excerpt,
        read_time: post.readTime
      };
      
      console.log(`Inserindo post: "${mappedPost.title}" (slug: ${mappedPost.slug})...`);
      
      const { data, error } = await supabase
        .from('posts')
        .upsert(mappedPost, { onConflict: 'id' });
        
      if (error) {
        console.error(`Erro ao inserir post ID ${post.id}:`, error.message);
      } else {
        console.log(`Sucesso: Post ID ${post.id} inserido/atualizado.`);
      }
    }
    
    console.log('Processo de seed concluído com sucesso!');
  } catch (err) {
    console.error('Erro catastrófico no seed:', err);
    process.exit(1);
  }
}

seed();
