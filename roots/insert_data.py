# Import relevent libraries 
import os
import psycopg2
import pandas as pd
from psycopg2 import Error

# Read in the data file that we need to insert
df = pd.read_excel("/Users/tahir/Desktop/Github/documents/roots/Data/Cleaned_Root_letters.xlsx")

# Prep data for the RootWords Table 
# Get only the unique root words
lst = list(df['Root_Letters'])
lst = set(lst)

# Make it into a dataframe, and give it an index / ID column 
df_roots = pd.DataFrame(lst, columns=['Root_Words'])
df_roots = df_roots.reset_index()

#########################
# ROOT WORDS TABLE DATA #
#########################

# Extract the data we need from the dataframe
data = []
for row in df_roots.index:
    arabic_text = df_roots.loc[row,"Root_Words"]
    unique_id = row
    data.append((row, arabic_text))

# Define parameters for the database as global variables
dbHost = '127.0.0.1'
dbPort = 5434
dbUser = 'qj'
dbPassword= 'Yatathakar123!'
dbName = 'quranJourney'

def insert_root_words(root_words_data):
    try:
        # connect to the PostgreSQL database
        connection = psycopg2.connect(user=dbUser,
                                  password=dbPassword,
                                  host=dbHost,
                                  port=dbPort,
                                  database=dbName)
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO RootWords (RootID, RootWord) VALUES (%s ,%s)"""
        counter = 0
        for row in root_words_data:
            record_to_insert = row
            cursor.execute(postgres_insert_query, record_to_insert)
            connection.commit()
            counter += cursor.rowcount
        print(counter, "records inserted successfully into rootWords table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into rootwords table", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
            
    return counter

# Call this function to insert the data inside the DB
insert_root_words(data)

############################
# ARABIC WORDS TEXT TABLE  #
############################ 



