# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S5
# Descripcion: Extrae la lista de las 10 palabras mas usadas en el cuerpo en los 10 posts con mas votos

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

conf = SparkConf().setAppName('S5')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('RS_2019-01', ss)

df.select("title", "score", "permalink").filter((f.col("title") != "") & (f.col("title") != "[deleted]") & (f.col("title") != "[removed]"))\
    .orderBy("score", ascending=False)\
    .limit(100).withColumn("words_title", f.size(f.split(f.col("title"), ' ')))\
    .select("score", "words_title", "permalink").write.json("s5_salida")

