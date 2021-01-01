# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S10
# Descripcion: Extrae la relacion entre la puntuacion y el numero de comentarios de cada subreddit

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('subredditsScoreComments')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('Ejemplo10Filas.json', ss)

resultadoDF = df.select("subreddit", "score", "num_comments") \
                .groupBy("subreddit") \
                .sum("score", "num_comments")\
                .withColumn("Relacion", (f.col("sum(score)")/f.col("sum(num_comments)"))*100)\
                .withColumn("Relacion", f.round(f.col("Relacion"), 2))\
                .orderBy('sum(score)', ascending=False)

#resultadoDF.printSchema()
resultadoDF.show()
#resultadoDF.write.csv('outputScoreComments.csv')