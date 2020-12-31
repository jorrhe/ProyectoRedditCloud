# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S3
# Descripcion: Número de posts por dia y por subreddit

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, avg, col

from pushshift import file_to_dataframe

conf = SparkConf().setMaster('local').setAppName('StockSumary')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('Ejemplo100000FilasUTF8.json', ss)

df.select(
    from_unixtime('created_utc', "dd").alias("day")
).groupby(
    'day'
).count().select(
    "day",
    col("count").alias("posts")
).write.csv("salida_s3.csv")
