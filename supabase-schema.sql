-- ── Executar no SQL Editor do Supabase ─────────────────────

-- Perfis (estende auth.users)
create table if not exists public.perfis (
  id             uuid references auth.users(id) on delete cascade primary key,
  email          text,
  nome           text,
  plano          text not null default 'free',
  logo_url       text,
  cor_marca      text default '#2D6FFF',
  stripe_id      text,
  posts_hoje     int  not null default 0,
  ultimo_reset   timestamptz default now(),
  criado_em      timestamptz default now()
);

-- RLS: usuário só vê o próprio perfil
alter table public.perfis enable row level security;
create policy "Usuário acessa próprio perfil"
  on public.perfis for all
  using (auth.uid() = id);

-- Cria perfil automaticamente ao cadastrar
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.perfis (id, email, nome)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Carrosséis
create table if not exists public.carrosseis (
  id          uuid default gen_random_uuid() primary key,
  usuario_id  uuid references public.perfis(id) on delete cascade not null,
  tema        text not null,
  tom         text not null,
  slides      jsonb not null default '[]',
  status      text not null default 'pronto',
  criado_em   timestamptz default now()
);

-- RLS: usuário só vê próprios carrosséis
alter table public.carrosseis enable row level security;
create policy "Usuário acessa próprios carrosséis"
  on public.carrosseis for all
  using (auth.uid() = usuario_id);

-- Index para busca por usuário
create index if not exists carrosseis_usuario_id_idx on public.carrosseis(usuario_id);
create index if not exists carrosseis_criado_em_idx  on public.carrosseis(criado_em desc);

-- ── Migração: adicionar legenda e cfg aos carrosséis ────────────────────────
-- Executar no SQL Editor do Supabase caso as colunas não existam ainda
alter table public.carrosseis
  add column if not exists legenda text,
  add column if not exists cfg     jsonb;
