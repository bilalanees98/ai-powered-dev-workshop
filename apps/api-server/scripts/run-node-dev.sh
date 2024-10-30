#!/bin/sh

echo "Install bash and execute 'wait-for-it.sh' script"
apk add --update bash
./scripts/wait-for-it.sh $DATABASE_HOST:$DATABASE_PORT --timeout=90 --strict -- echo "mysql up and running"

npm run dev -w apps/api-server