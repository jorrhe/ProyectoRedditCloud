# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S1
# Descripcion: Franja horaria donde tienes mas posibilidades de conseguir puntuacion mas alta al crear un post.

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, avg

from pushshift import file_to_dataframe

import argparse
import sys
from os import path

parser = argparse.ArgumentParser()
parser.add_argument("--file", help="Path where the dataset is located")
args = parser.parse_args()

if not args.file:
    print("Error --file argument not passed")
    sys.exit()

file_path = args.file

if not path.exists(file_path):
    print("Error %s does not exist" % file_path)
    sys.exit()

conf = SparkConf().setAppName('S1')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(file_path, ss)

df.select(
    'score',
    from_unixtime('created_utc', "HH").alias("hour")
).groupby(
    'hour'
).agg(
    avg('score').alias('avg')
).write.json("s1_salida")
