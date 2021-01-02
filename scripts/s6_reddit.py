# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S6
# Descripcion: Extrae el numero de posts nsfw de reddit, junto al número de posts totales y
# el porcentaje de los cuales es nsfw
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

conf = SparkConf().setAppName('S6')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('RS_2019-01', ss)
total_posts = df.count()
df.groupBy(f.col("over_18")).count()\
    .withColumn("percentage", (f.col("count")/total_posts)*100)\
    .write.json("s6_salida")
