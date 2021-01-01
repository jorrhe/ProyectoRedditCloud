# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S8
# Descripcion: Extrae los 10 subreddits con mas puntuacion

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('subredditsTop10Score')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('Ejemplo10Filas.json', ss)

resultadoDF = df.select("subreddit", "score") \
                .groupBy("subreddit") \
                .sum("score") \
                .withColumnRenamed("sum(score)", "score") \
                .orderBy('score', ascending=False) \
                .limit(10)

#resultadoDF.printSchema()
resultadoDF.show()
#resultadoDF.write.csv('outputScore.csv')