# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S5
# Descripcion: Extrae la lista de las 10 palabras más usadas en el cuerpo en los 10 posts con más votos
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe


conf = SparkConf().setMaster('local').setAppName('reddit')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('ficheros/Ejemplo10000Filas.json', ss)
top_10_posts = df.filter((f.col("title") != "") & (f.col("title") != "[deleted]") & (f.col("title") != "[removed]"))\
    .orderBy("score", ascending=False)\
    .limit(10)

top_10_words = top_10_posts.withColumn("word", f.explode(f.split(f.col("title"), ' ')))\
    .groupBy("word")\
    .count() \
    .sort('count', ascending=False).limit(10)

top_10_words.write.csv("wordcount_title_out.csv")