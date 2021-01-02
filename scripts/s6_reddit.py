# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S6
# Descripcion: Extrae el numero de posts nsfw de reddit, junto al número de posts totales y
# el porcentaje de los cuales es nsfw
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

conf = SparkConf().setMaster('local').setAppName('reddit')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('ficheros/Ejemplo10000Filas.json', ss)
total_posts = df.count()
df.groupBy(f.col("over_18")).count()\
    .withColumn("percentage", (f.col("count")/total_posts)*100)\
    .write.csv("nsfw_count_reddit_out.csv")
