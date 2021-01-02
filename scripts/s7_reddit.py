# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S7
# Descripcion: Extrae el numero de posts nsfw de cada subreddit,
# contrastandolo frente a su numero total de posts e indicando el porcentaje de estos que son nsfw

from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe

conf = SparkConf().setAppName('S7')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('RS_2019-01', ss)

df_total_post_count = df.groupBy(f.col("subreddit")).count()\
    .select("subreddit", f.col("count").alias("total_posts"))

df_nsfw_post_count = df.filter(f.col("over_18") == True)\
    .groupBy(f.col("subreddit")).count().\
    select("subreddit", f.col("count").alias("nsfw_posts"))

df_nsfw_post_count.join(df_total_post_count, on=["subreddit"], how="inner").\
    withColumn("percentage", (f.col("nsfw_posts")/f.col("total_posts"))*100)\
    .write.json("s7_salida")