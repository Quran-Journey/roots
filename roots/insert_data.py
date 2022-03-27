# Import relevent libraries 
import os
import psycopg2
import pandas as pd
from psycopg2 import Error

# Read in the data file that we need to insert
df = pd.read_excel("/Users/tahir/Desktop/Github/documents/roots/Data/Cleaned_Root_letters.xlsx")

# Prep Data for RootWords Table 
lst = list(df['Root_Letters'])
lst = set(lst)

# Make it into a dataframe, and give it an index / ID column 
df_roots = pd.DataFrame(lst, columns=['Root_Words'])
df_roots = df_roots.reset_index()

# df_roots["Root_Words"] = lst
df_roots["Root_Words"] = df_roots["Root_Words"].values.astype(str)

# Put the data in the format the db accepts
root_data = []
for row in df_roots.index:
    arabic_text = df_roots.loc[row,"Root_Words"]
    unique_id = row
    root_data.append((row, arabic_text))

# Prep Data for the ArabicWord Table
arabic_df = df.drop(['ID', 'Transliteration'], axis=1)
arabic_df = arabic_df.drop_duplicates()
arabic_df["primary_key"] = list(range(2000,19623)) 

# Merge the df to get the RootWords PK (called "index")
arabic_words_df = arabic_df.merge(df_roots, how='inner', left_on='Root_Letters', right_on='Root_Words')
arabic_words_df = arabic_words_df.drop(['Root_Letters', 'Root_Words'], axis=1)

# Rename the index column to RootID to make it clear
arabic_words_df.rename(columns = {'index':'RootID'}, inplace = True)

# Put the dataframe into the format for postgres sql insertion 
arabic_words_data = []
for index, row in arabic_words_df.iterrows():
    arabic_words_data.append( (row['primary_key'], row['ARABIC'], row['RootID']) )

# Connect to the Postgres SQL Database 
try:         
    # Define DB connection parameters 
    dbHost = '127.0.0.1'
    dbPort = 5434
    dbUser = 'qj'
    dbPassword= 'Yatathakar123!'
    dbName = 'quranJourney'

    # connect to the PostgreSQL database
    connection = psycopg2.connect(user=dbUser,
                              password=dbPassword,
                              host=dbHost,
                              port=dbPort,
                              database=dbName)
    cursor = connection.cursor()

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)
    
# Create functions to insert root words and arabic words data     
def insert_root_words(root_words_data):
    """ Insert Root Words Data into the POSTGRES DB """
    postgres_insert_query = """ INSERT INTO RootWords (RootID, RootWord) VALUES (%s ,%s)"""
    counter = 0
    for row in root_words_data:
        record_to_insert = row
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        counter += cursor.rowcount
    print(counter, "records inserted successfully into rootWords table")
    return counter

def insert_arabic_text(arabic_text_data):
    """ Insert Arabic Text Data into the POSTGRES DB """
    postgres_insert_query = """ INSERT INTO ArabicWord (WordID, Word, RootID) VALUES (%s ,%s, %s)"""
    counter = 0
    for row in arabic_text_data:
        record_to_insert = row
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        counter += cursor.rowcount
    print(counter, "records inserted successfully into ArabicWord table")
    return counter

if __name__ == '__main__':

    # Insert the root_words data 
    insert_root_words(root_data)

    # Insert the arabic words data 
    insert_arabic_text(arabic_words_data)

    # Close the DB connection 
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")