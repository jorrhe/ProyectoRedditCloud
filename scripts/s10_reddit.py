# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S10
# Descripcion: Extrae la relacion entre la puntuacion y el numero de comentarios de cada subreddit

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe, get_file

conf = SparkConf().setAppName('S10')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(get_file(), ss)

df.select(
    "subreddit",
    "score",
    "num_comments"
).groupBy(
    "subreddit"
).sum(
    "score",
    "num_comments"
).withColumn(
    "Relacion",
    (f.col("sum(score)")/f.col("sum(num_comments)"))*100
).withColumn(
    "Relacion",
    f.round(f.col("Relacion"), 2)
).orderBy(
    'sum(score)',
    ascending=False
).write.json("s10_salida")
