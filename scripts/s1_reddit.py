# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S1
# Descripcion: Franja horaria donde tienes mas posibilidades de conseguir puntuacion mas alta al crear un post.

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, to_timestamp, hour, avg

from pushshift import file_to_dataframe

conf = SparkConf().setAppName('S1')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('RS_2019-01', ss)

df.select(
    'score',
    from_unixtime('created_utc', "HH").alias("hour")
).groupby(
    'hour'
).agg(
    avg('score').alias('avg')
).write.json("s1_salida")
