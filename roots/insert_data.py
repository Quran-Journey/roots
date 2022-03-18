import psycopg2
from psycopg2 import Error

try:
    # Connect to an existing database
    connection = psycopg2.connect(user="qj",
                                  password="Yatathakar123!",
                                  host="127.0.0.1",
                                  port="5434:5432",
                                  database="postgres_db")

    # Create a cursor to perform database operations
    cursor = connection.cursor()
    # Print PostgreSQL details
    print("PostgreSQL server information")
    print(connection.get_dsn_parameters(), "\n")
    # Executing a SQL query
    cursor.execute("SELECT version();")
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


data = pd.read_excel("./cleaned_data")

def fetch_ayah():
    """
    Fetch and Ayah using quran.com's API
    """


def parse_word_from_verse():
    """
    Create an ordered list containing the words from a verse.
    """


def scrape_root():
    """
    Return the root letters of word by scraping https://corpus.quran.com/wordbyword.jsp.
    """


def main():
    """
    Put everything together in this function
    """


if __name__ == "__main__":
    main()