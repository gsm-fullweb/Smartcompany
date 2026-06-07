-- Script de Configuração do Banco de Dados para Smartcompany

-- 1. Modificar a tabela 'posts' existente para adicionar colunas extras necessárias
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Gestão Empresarial',
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS read_time TEXT DEFAULT '5 min de leitura';

-- 2. Criar a tabela 'leads' para armazenar contatos/leads do site se não existir
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  site_slug TEXT REFERENCES sites(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Habilitar RLS (Row Level Security) para garantir a segurança dos dados
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Políticas para a tabela de 'posts'
-- Qualquer um (público) pode visualizar os posts do blog
DROP POLICY IF EXISTS "Permitir leitura pública de posts" ON posts;
CREATE POLICY "Permitir leitura pública de posts" ON posts
  FOR SELECT TO public USING (true);

-- Apenas administradores autenticados podem Criar/Editar/Excluir posts
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados em posts" ON posts;
CREATE POLICY "Permitir tudo para usuários autenticados em posts" ON posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Políticas para a tabela de 'leads'
-- Qualquer um (público) pode enviar um contato pelo formulário
DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON leads;
CREATE POLICY "Permitir inserção pública de leads" ON leads
  FOR INSERT TO public WITH CHECK (true);

-- Apenas administradores autenticados podem ver e gerenciar os leads recebidos
DROP POLICY IF EXISTS "Permitir leitura/gerenciamento apenas para autenticados em leads" ON leads;
CREATE POLICY "Permitir leitura/gerenciamento apenas para autenticados em leads" ON leads
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Políticas para a tabela de 'site_sections'
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir leitura pública de site_sections" ON site_sections;
CREATE POLICY "Permitir leitura pública de site_sections" ON site_sections
  FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Permitir modificação para usuários autenticados em site_sections" ON site_sections;
CREATE POLICY "Permitir modificação para usuários autenticados em site_sections" ON site_sections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Políticas para a tabela de 'site_contacts'
ALTER TABLE site_contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir leitura pública de site_contacts" ON site_contacts;
CREATE POLICY "Permitir leitura pública de site_contacts" ON site_contacts
  FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Permitir modificação para usuários autenticados em site_contacts" ON site_contacts;
CREATE POLICY "Permitir modificação para usuários autenticados em site_contacts" ON site_contacts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Políticas para a tabela de 'sites'
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir leitura pública de sites" ON sites;
CREATE POLICY "Permitir leitura pública de sites" ON sites
  FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Permitir modificação para usuários autenticados em sites" ON sites;
CREATE POLICY "Permitir modificação para usuários autenticados em sites" ON sites
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. Políticas para a tabela de 'phones'
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados em phones" ON phones;
CREATE POLICY "Permitir tudo para usuários autenticados em phones" ON phones
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Políticas para a tabela de 'change_requests'
ALTER TABLE change_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados em change_requests" ON change_requests;
CREATE POLICY "Permitir tudo para usuários autenticados em change_requests" ON change_requests
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 11. Políticas para a tabela de 'audit_logs'
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir tudo para usuários autenticados em audit_logs" ON audit_logs;
CREATE POLICY "Permitir tudo para usuários autenticados em audit_logs" ON audit_logs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. Configuração de Storage para Upload de Imagens
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Permitir leitura pública de objetos em site-assets" ON storage.objects;
CREATE POLICY "Permitir leitura pública de objetos em site-assets" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'site-assets');

DROP POLICY IF EXISTS "Permitir upload de objetos para autenticados em site-assets" ON storage.objects;
CREATE POLICY "Permitir upload de objetos para autenticados em site-assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');

DROP POLICY IF EXISTS "Permitir exclusão de objetos para autenticados em site-assets" ON storage.objects;
CREATE POLICY "Permitir exclusão de objetos para autenticados em site-assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-assets');

DROP POLICY IF EXISTS "Permitir atualização de objetos para autenticados em site-assets" ON storage.objects;
CREATE POLICY "Permitir atualização de objetos para autenticados em site-assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-assets') WITH CHECK (bucket_id = 'site-assets');
