 #used to generate a text file containing sql insertions with random values
#syntax <column_name>:<type> <column_name>:<type> ...
#possible types: [i, ia] - integer, vc<number> - varchar, d - date

import random
from random import choice

table_name = input("Enter table name: ")
n = int(input("Enter number of records to generate: "))
table_syntax = input("Enter column syntax: ").rstrip().lstrip()

chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

i = 0
with open("inserts.txt", "w") as f:
    #generate syntax map
    columns = table_syntax.split(" ")
    column_data = [x.split(":") for x in columns]
    #print(f"syntax map: {column_data}")

    while (i < n):


        #create first part of insert statement
        statement = f"INSERT INTO \"{table_name}\" ("
        for x in column_data:
            statement += f"\"{x[0]}\", "
        statement = statement[:-2]
        statement += ") VALUES ("
        
        #generate values according to syntax map
        for x in column_data:
            if (x[1] == "i"):
                statement += f"\'{random.randint(0, n*n)}\', "
            elif (x[1] == "ia"):
                statement += f"\'{i}\', "
            elif (x[1][0:2] == "vc"):
                statement += f"\'{"".join(choice(chars) for i in range(int(x[1][2:])))}\', "
            elif (x[1] == "d"):
                #INSERT INTO table VALUES (TIMESTAMP 'YYYY-MM-DD HH:MI:SS');
                statement += f"TIMESTAMP '{random.randint(2000, 2024)}-{random.randint(1, 12)}-{random.randint(1, 28)} {random.randint(0, 23)}:{random.randint(0, 59)}:{random.randint(0, 59)}', "

        #trim character from end and terminate statement        
        statement = statement[:-2]
        statement += ");"

        print(statement)
        f.write(statement)
        f.write("\n")
        i += 1