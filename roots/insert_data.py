import psycopg2
from psycopg2 import Error

try:
    # Connect to an existing database
    connection = psycopg2.connect(user="qj",
                                  password="Yatathakar123!",
                                  host="127.0.0.1",
                                  port="5434",
                                  database="quranJourney")

    # Create a cursor to perform database operations
    cursor = connection.cursor()
    # Print PostgreSQL details
    print("PostgreSQL server information")
    print(connection.get_dsn_parameters(), "\n")
    # Executing a SQL query
    cursor.execute("SELECT version();")
    fetch_rows =  "SELECT * FROM quran_text;"
    cursor.execute(fetch_rows)
    # Fetch result
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")
    

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

