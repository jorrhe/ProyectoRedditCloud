# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S9
# Descripcion: Extrae los 10 subreddits con mas comentarios

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe, get_file

conf = SparkConf().setAppName('S9')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(get_file(), ss)

df.select(
    "subreddit",
    "num_comments"
).groupBy(
    "subreddit"
).sum(
    "num_comments"
).withColumnRenamed(
    "sum(num_comments)",
    "num_comments"
).orderBy(
    'num_comments',
    ascending=False
).limit(
    10
).write.json("s9_salida")
