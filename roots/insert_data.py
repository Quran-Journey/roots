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
    
########################################
### GET data for  TEXT TO WORD table ###
########################################

# Create surah and ayah columns 
surah, ayah = [], []
for row in df["ID"]:
    surah.append( row.split(":")[0] ) 
    ayah.append( row.split(":")[1] ) 
df["Surah"] = surah
df["Ayah"] = ayah
df["Surah"] = df["Surah"].values.astype(int)
df["Ayah"] = df["Ayah"].values.astype(int)

# Generate our text to words table
TextToWords_df = df.merge(arabic_words_df, left_on ="ARABIC", right_on = "ARABIC", how = 'inner')
TextToWords_df = TextToWords_df.reset_index()

# Put the dataframe into the format for postgres sql insertion 
TexttoWord = []
for index, row in TextToWords_df.iterrows():
    TexttoWord.append( (row['index'], row['Ayah'], row['primary_key']))
    

# Create functions to insert root words, arabic words and text to word data   
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

# Create function to get the quran text data 
def get_quran_text_df():
    """ Get the quran text dataframe """
    postgreSQL_select_Query = "select * from quran_text"
    cursor.execute(postgreSQL_select_Query)
    print("Selecting rows from table using cursor.fetchall")
    sql_table_result = cursor.fetchall()
    quran_text_df = pd.DataFrame(sql_table_result, columns=['index', 'sura', 'aya','text'])
    return quran_text_df

def insert_text_to_word(text_to_word_data):
    """ Insert Text to Word  Data into the POSTGRES DB """
    postgres_insert_query = """ INSERT INTO TextToWord (IndexID, AyahID, WordID) VALUES (%s, %s ,%s)"""
    counter = 0
    for row in text_to_word_data:
        record_to_insert = row
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        counter += cursor.rowcount
    print(counter, "records inserted successfully into TextToWord table")
    return counter

if __name__ == '__main__':

    # Insert the root_words data 
    insert_root_words(root_data)

    # Insert the arabic words data 
    insert_arabic_text(arabic_words_data)
    
    # Get the quran text df
    quran_text = get_quran_text_df
    
    # Insert text_to_word_df
    insert_text_to_word(TexttoWord)

    # Close the DB connection 
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")