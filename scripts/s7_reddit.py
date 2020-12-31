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

df_total_post_count = df.groupBy(f.col("subreddit")).count()\
    .select("subreddit", f.col("count").alias("total_posts"))

df_nsfw_post_count = df.filter(f.col("over_18") == True)\
    .groupBy(f.col("subreddit")).count().\
    select("subreddit", f.col("count").alias("nsfw_posts"))

df_final = df_nsfw_post_count.join(df_total_post_count, on=["subreddit"], how="inner").\
    withColumn("percentage", (f.col("nsfw_posts")/f.col("total_posts"))*100)\
    .write.csv("nsfw_count_subreddit_out.csv")