# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S11
# Descripcion: Extrae los autores que mas post han publicado en cada subreddit y el numero de post que han realizado

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pyspark.sql import Window
from pushshift import file_to_dataframe, get_file

conf = SparkConf().setAppName('S11')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(get_file(), ss)

w = Window.partitionBy('subreddit')

df.select(
    "subreddit",
    "author"
).where(
    f.col('author') != "[deleted]"
).groupBy(
    "subreddit",
    "author"
).count().withColumn(
    'maxCount',
    f.max('count').over(w)
).where(
    f.col('count') == f.col('maxCount')
).drop(
    'maxCount'
).orderBy(
    f.col("count").desc(),
    f.col("subreddit").asc()
).write.json("s11_salida")
