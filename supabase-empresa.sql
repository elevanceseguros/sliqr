-- Perfil da empresa (um por usuário)
create table if not exists public.empresas (
  id           uuid default gen_random_uuid() primary key,
  usuario_id   uuid references public.perfis(id) on delete cascade not null unique,
  nome         text not null,
  segmento     text not null,
  descricao    text,
  produtos     text,
  publico      text,
  objetivo     text default 'vender',
  instagram    text,
  criado_em    timestamptz default now(),
  atualizado_em timestamptz default now()
);

alter table public.empresas enable row level security;
create policy "Usuário acessa própria empresa"
  on public.empresas for all
  using (auth.uid() = usuario_id);

-- Sugestões geradas
create table if not exists public.sugestoes (
  id           uuid default gen_random_uuid() primary key,
  usuario_id   uuid references public.perfis(id) on delete cascade not null,
  tema         text not null,
  descricao    text,
  tom          text default 'vender',
  usado        boolean default false,
  criado_em    timestamptz default now()
);

alter table public.sugestoes enable row level security;
create policy "Usuário acessa próprias sugestões"
  on public.sugestoes for all
  using (auth.uid() = usuario_id);

create index if not exists sugestoes_usuario_id_idx on public.sugestoes(usuario_id);
create index if not exists sugestoes_criado_em_idx on public.sugestoes(criado_em desc);
