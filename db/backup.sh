# Comment out this part of the script if you are running things locally
docker-compose down;
docker-compose up --build -d;

# Uncomment this part of the script if you are running postgres locally
# PGPASSWORD=postgres psql quranjourney < drop.sql;
# PGPASSWORD=postgres psql quranjourney < quran-simple.sql;
# PGPASSWORD=postgres psql quranjourney < root_tables.sql;

python3 insert_data.py;
cd ../model; node insertMeanings.js;

docker exec -i db_postgres_alone_1 /bin/bash -c "PGPASSWORD=Yatathakar123! pg_dump --username qj quranJourney" > ./filled.sql
