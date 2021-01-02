# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S3
# Descripcion: Numero de posts por dia y por subreddit

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, avg, col

from pushshift import file_to_dataframe

conf = SparkConf().setMaster('local').setAppName('s3')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('RS_2019-01', ss)

df.select(
    from_unixtime('created_utc', "dd").alias("day")
).groupby(
    'day'
).count().select(
    "day",
    col("count").alias("posts")
).write.json("s3_salida")