# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S2
# Descripcion: Franja horaria donde tienes mas posibilidades de conseguir puntuacion mas alta al crear un post en un subreddit.

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, avg

from pushshift import file_to_dataframe

conf = SparkConf().setMaster('local').setAppName('StockSumary')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('Ejemplo100000FilasUTF8.json', ss)

df.select(
    'subreddit',
    'score',
    from_unixtime('created_utc', "HH").alias("hour")
).groupby(
    'subreddit',
    'hour'
).agg(
    avg('score').alias('avg')
).orderBy(
    "subreddit",
    "hour"
).write.csv("salida_s2.csv")
