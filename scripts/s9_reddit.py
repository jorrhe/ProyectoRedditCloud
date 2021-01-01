# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S9
# Descripcion: Extrae los 10 subreddits con mas comentarios

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('subredditsTop10Comments')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('Ejemplo10Filas.json', ss)

resultadoDF = df.select("subreddit", "num_comments") \
                .groupBy("subreddit") \
                .sum("num_comments") \
                .withColumnRenamed("sum(num_comments)", "num_comments") \
                .orderBy('num_comments', ascending=False) \
                .limit(10)

#resultadoDF.printSchema()
resultadoDF.show()
#resultadoDF.write.csv('outputComments.csv')
