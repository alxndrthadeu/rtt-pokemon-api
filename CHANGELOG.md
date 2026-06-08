# Changelog

## [0.1.0] - 2026-06-07

### Adicionado

- **Setup inicial** — NestJS com suporte a TypeScript, configuração de CORS e porta via env
- **Banco de dados** — Integração com PostgreSQL via Prisma ORM; módulo `PrismaService` global
- **Módulo Runs** — CRUD completo para gerenciar partidas (runs) do jogador:
  - `POST /runs` — cria nova run com deck inicial, modo e gênero do personagem
  - `GET /runs?session_id=` — lista runs ativas da sessão
  - `GET /runs/:id/public` — busca run por ID sem validação de sessão (compartilhamento)
  - `PATCH /runs/:id` — atualiza estado da run (andar atual, deck, badges, turnos, conquistas, status)
  - `DELETE /runs/:id` — remove run vinculada à sessão
- **Módulo Leaderboard** — `GET /leaderboard` retorna top 20 runs finalizadas ordenadas por andares percorridos
- **Schema Prisma** — modelo `Run` com campos: `session_id`, `mode`, `gender`, `status`, `current_floor`, `player_deck` (JSON), `badges_earned`, `turns_played`, `achievements`, `finished_at`; índices em `session_id` e `(status, finished_at)`
- **Migração inicial** — criação da tabela `runs` com todos os campos
- **Migração v2** — remoção de auth de usuário; adoção de `session_id` para identificação anônima de sessão
