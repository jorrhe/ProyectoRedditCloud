# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S3
# Descripcion: Numero de posts por dia y por subreddit

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_unixtime, col

from pushshift import file_to_dataframe, get_file

conf = SparkConf().setAppName('S3')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe(get_file(), ss)

df.select(
    from_unixtime('created_utc', "dd").alias("day")
).groupby(
    'subreddit', 'day'
).count().select(
    "day",
    "subreddit",
    col("count").alias("posts")
).orderBy("day", "subreddit").write.json("s3_salida")
