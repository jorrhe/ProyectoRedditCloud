# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S8
# Descripcion: Extrae los 10 subreddits con mas puntuacion

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe, get_file

conf = SparkConf().setAppName('S8')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(get_file(), ss)

df.select(
    "subreddit",
    "score"
).groupBy(
    "subreddit"
).sum(
    "score"
).withColumnRenamed(
    "sum(score)",
    "score"
).orderBy(
    'score',
    ascending=False
).limit(
    10
).write.json("s8_salida")
