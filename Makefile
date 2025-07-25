# ┌──────────────────────────────────────────────┐
# │                   Setup                     │
# └──────────────────────────────────────────────┘

DOCKER_COMPOSE = docker compose
ENV_FILE = .env

init:
	$(MAKE) check-env
	$(MAKE) install
	$(MAKE) db-generate

check-env:
	@test -f $(ENV_FILE) || (echo "🚨 Fichier .env manquant ! Copiez .env.example en .env avant de démarrer." && exit 1)

create-env:
	@cp .env.example .env
	@echo "✅ Fichier .env généré. Remplissez-le avec vos variables d’environnement."

# ┌──────────────────────────────────────────────┐
# │                Installations                 │
# └──────────────────────────────────────────────┘

install:
	pnpm install

# ┌──────────────────────────────────────────────┐
# │              Project Control                 │
# └──────────────────────────────────────────────┘

up:
	$(DOCKER_COMPOSE) up -d --build

restart:
	$(DOCKER_COMPOSE) restart

down:
	$(DOCKER_COMPOSE) down

# ┌──────────────────────────────────────────────┐
# │                  Prisma                      │
# └──────────────────────────────────────────────┘

validate-prisma:
	npx prisma validate --schema=prisma/schema.prisma

db-migrate:
	@if [ -z "$(name)" ]; then \
		echo "❌ Merci de fournir un nom avec 'make db-migrate name=ton_nom'"; \
		exit 1; \
	fi
	DATABASE_URL=$(shell grep "^DATABASE_URL_LOCAL=" .env | cut -d '=' -f2- | tr -d '"') \
	npx prisma migrate dev --name $(name) --schema=prisma/schema.prisma

db-reset:
	DATABASE_URL=$(shell grep "^DATABASE_URL_LOCAL=" .env | cut -d '=' -f2- | tr -d '"') \
	npx prisma migrate reset --force --schema=prisma/schema.prisma

db-pull:
	DATABASE_URL=$(shell grep "^DATABASE_URL_LOCAL=" .env | cut -d '=' -f2- | tr -d '"') \
	npx prisma db pull --schema=prisma/schema.prisma

db-generate: validate-prisma
	DATABASE_URL=$(shell grep "^DATABASE_URL_LOCAL=" .env | cut -d '=' -f2- | tr -d '"') \
	npx prisma generate --schema=prisma/schema.prisma

db-seed:
	DATABASE_URL=$(shell grep "^DATABASE_URL_LOCAL=" .env | cut -d '=' -f2- | tr -d '"') \
	npx tsx prisma/seed.ts

reset-db:
	$(MAKE) db-reset
	$(MAKE) db-seed

db-studio:
	npx prisma studio --schema=prisma/schema.prisma

# ┌──────────────────────────────────────────────┐
# │              Logs & Debugging                │
# └──────────────────────────────────────────────┘

logs:
	$(DOCKER_COMPOSE) logs -f

# ┌──────────────────────────────────────────────┐
# │                   Clean                      │
# └──────────────────────────────────────────────┘

clean:
	$(DOCKER_COMPOSE) down -v

clean-next:
	rm -rf .next