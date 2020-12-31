from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe, s3_to_dataframe
# Por temas de caracteres al hacer df.show
import sys

conf = SparkConf().setMaster('local').setAppName('reddit')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('ficheros/Ejemplo10000Filas.json', ss)
top_10_posts = df.filter((f.col("title") != "") & (f.col("title") != "[deleted]") & (f.col("title") != "[removed]"))\
    .orderBy("score", ascending=False)\
    .limit(10)

top_10_words = top_10_posts.withColumn("word", f.explode(f.split(f.col("title"), ' ')))\
    .groupBy("word")\
    .count() \
    .sort('count', ascending=False).limit(10)

top_10_words.write.csv("wordcount_title_out.csv")