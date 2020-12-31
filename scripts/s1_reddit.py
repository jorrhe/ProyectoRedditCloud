# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S1
# Descripcion: Franja horaria donde tienes mas posibilidades de conseguir puntuacion mas alta al crear un post.

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, to_timestamp, hour, avg

from pushshift import file_to_dataframe

conf = SparkConf().setMaster('local').setAppName('StockSumary')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('Ejemplo10000Filas.json', ss)

df.select(
    'score',
    from_unixtime('created_utc', "HH").alias("hour")
).groupby(
    'hour'
).agg(
    avg('score').alias('avg')
).show()
