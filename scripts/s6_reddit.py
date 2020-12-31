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
total_posts = df.count();
df.groupBy(f.col("over_18")).count()\
    .withColumn("percentage", (f.col("count")/total_posts)*100)\
    .write.csv("nsfw_count_reddit_out.csv")