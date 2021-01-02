# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S4
# Descripcion: El numero de palabras en el cuerpo de los 100 posts con mas votos de tipo text

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

conf = SparkConf().setAppName('S4')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('RS_2019-01', ss)

df.select("selftext", "score", "permalink").filter((f.col("selftext") != "") & (f.col("selftext") != "[deleted]") & (f.col("selftext") != "[removed]"))\
    .orderBy("score", ascending=False)\
    .limit(100).withColumn("words", f.size(f.split(f.col("selftext"), ' ')))\
    .select("score", "words", "permalink").write.json("s4_salida")