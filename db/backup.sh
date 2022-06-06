docker-compose down
docker-compose up -d

python3 insert_data.py
cd ../model node insertMeanings.js

docker exec -i db_postgres_alone_1 /bin/bash -c "PGPASSWORD=Yatathakar123! pg_dump --username qj quranJourney" > ./filled.sql