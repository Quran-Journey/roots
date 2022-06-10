# Import relevent libraries 
import os
import psycopg2
import pandas as pd
from psycopg2 import Error
import os
from dotenv import load_dotenv

load_dotenv("../.env")

PG_HOST = os.getenv('POSTGRES_HOST')
PG_PORT = os.getenv('POSTGRES_PORT')
PG_PASSWORD = os.getenv('POSTGRES_PASSWORD')
PG_USER = os.getenv('POSTGRES_USER')
PG_DB = os.getenv('POSTGRES_DB')

# Read in the data file that we need to insert
df = pd.read_excel("./Data/Cleaned_Root_letters.xlsx")

# Clean the data right at the start 
df = df.convert_dtypes()
df['ARABIC'] = df['ARABIC'].str.strip()
df['Root_Letters'] = df['Root_Letters'].str.strip()

# Prep Data for RootWord Table 
lst = list(df['Root_Letters'])
lst = set(lst)

# Make it into a dataframe, and give it an index / ID column 
df_roots = pd.DataFrame(lst, columns=['Root_Words'])
df_roots = df_roots.reset_index()

# Turn it into string and get rid of white spaces 
df_roots = df_roots.convert_dtypes()
df_roots['Root_Words'] = df_roots['Root_Words'].str.strip()

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
arabic_df = arabic_df.convert_dtypes()

# Merge the df to get the RootWords PK (called "index")
arabic_words_df = arabic_df.merge(df_roots, how='inner', left_on='Root_Letters', right_on='Root_Words')
arabic_words_df = arabic_words_df.drop(['Root_Letters', 'Root_Words'], axis=1)

# Rename the index column to RootID to make it clear
arabic_words_df.rename(columns = {'index':'RootID'}, inplace = True)

# Put the dataframe into the format for postgres sql insertion 
arabic_words_data = []
for index, row in arabic_words_df.iterrows():
    arabic_words_data.append( (row['primary_key'], row['ARABIC'], row['RootID']) )
    
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

# Get the IndexIDs from the Quran Table  -- need to merge it since different lengths
indexID, count = [], 0
ayahs = df['Ayah'].to_list()
# Essentially generating each ayah = 1 unique id, from 1 - 6000. # Don't need quran table now
for i in range(len(ayahs)):
    if ayahs[i] != ayahs[i-1]:
        count+=1 
        indexID.append(count)
    else:
        indexID.append(count)
    
df['index_id'] = indexID

# Generate our text to words table
TextToWords_df = df.merge(arabic_words_df, left_on ="ARABIC", right_on = "ARABIC", how = 'inner')
TextToWords_df = TextToWords_df.reset_index()

# Put the dataframe into the format for postgres sql insertion 
TexttoWord = []
for index, row in TextToWords_df.iterrows():
    tup = tuple((row['index_id'], row['primary_key']))
    if tup not in TexttoWord:
        TexttoWord.append( tup )
    else:
        pass

try:

    # connect to the PostgreSQL database
    connection = psycopg2.connect(user=PG_USER,
                              password=PG_PASSWORD,
                              host=PG_HOST,
                              port=PG_PORT,
                              database=PG_DB)
    cursor = connection.cursor()

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)
    
# Create functions to insert root words, arabic words and text to word data   
def insert_root_words(root_words_data):
    """ Insert Root Words Data into the POSTGRES DB """
    postgres_insert_query = """ INSERT INTO RootWord (RootID, RootWord) VALUES (%s ,%s)"""
    counter = 0
    for row in root_words_data:
        record_to_insert = row
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        counter += cursor.rowcount
    print(counter, "records inserted successfully into rootWord table")
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

# Insert the root_words data 
insert_root_words(root_data)

# Insert the arabic words data 
insert_arabic_text(arabic_words_data)

def insert_text_to_word(text_to_word_data):
    """ Insert Text to Word  Data into the POSTGRES DB """
    postgres_insert_query = """ INSERT INTO TextToWord (IndexID, WordID) VALUES (%s, %s)"""
    counter = 0
    for row in text_to_word_data:
        record_to_insert = row
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        counter += cursor.rowcount
    print(counter, "records inserted successfully into TextToWord table")
    return counter

# Insert text_to_word_df
insert_text_to_word(TexttoWord)

# Close the DB connection 
cursor.close()
connection.close()
print("PostgreSQL connection is closed")