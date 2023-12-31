login:
	@heroku login

teams:
	@heroku teams

create:
	@heroku create

create-postgres:
	@heroku addons:create heroku-postgresql:mini

attach-addon:
	@heroku addons:attach $(addon) -a $(app)

set-env:
	@heroku config:set $(ENV_NAME)=$(ENV_VALUE)


prisma-dev:
	@pnpm dotenv -e .env.development -- pnpm prisma migrate dev --name $(name)

prisma-deploy:
	@prisma migrate deploy