# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S11
# Descripcion: Extrae los autores que mas post han publicado en cada subreddit y el numero de post que han realizado

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pyspark.sql import Window
from pushshift import file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('subredditsUsersMorePosts')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('Ejemplo10000Filas.json', ss)

w = Window.partitionBy('subreddit')

resultadoDF = df.select("subreddit", "author") \
                .where(f.col('author') != "[deleted]")\
                .groupBy("subreddit", "author") \
                .count()\
                .withColumn('maxCount', f.max('count').over(w))\
                .where(f.col('count') == f.col('maxCount'))\
                .drop('maxCount')\
                .orderBy(f.col("count").desc(), f.col("subreddit").asc())

#resultadoDF.printSchema()
resultadoDF.show(50)
#resultadoDF.write.csv('outputUserMorePost.csv')
