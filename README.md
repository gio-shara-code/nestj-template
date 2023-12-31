## Description

This is a generic [Nest](https://github.com/nestjs/nest) template intended to be used as a starting point for new projects where you need
to have a REST API and with authentication and authorization. It uses [Prisma ORM](https://www.prisma.io/).

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Endpoints
- POST /auth/register 
- POST /auth/login
- POST /profile
- POST /firebase/email
- POST /firebase/anonymous
- POST /firebase/phone
- POST /webauth/connect
- POST /webauth/approve

## Databse migration
Creating migration
```bash
prisma migrate dev --name init
```

When you make changs=es ti schema.prisma, run this again to creating a second migration
```bash
prisma migrate dev --name second_migration
```

Deploy the migrations
```bash
prisma migrate deploy
```

Migration status
```bash
prisma migrate deploy
```

## Heroku
login into herioku
```bash
heroku login
```

create an application
```bash
heroku create
```
 
## Primsa

### Local development database
For local development db you can either use these following options:
```bash
pnpm dotenv -e .env.dev -- pnpm prisma migrate dev --name <dev_name>
```
or
```bash
pnpm prisma db push
```

### Production database
```bash
pnpm prisma migrate deploy
```