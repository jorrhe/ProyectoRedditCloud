# Cloud y Big Data
# Realizado por Jorge Rosello, Daniel Alcazar, Francisco Javier Lozano
# Nombre Script: S5
# Descripcion: Extrae la lista de las 10 palabras más usadas en el cuerpo en los 10 posts con más votos
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
import pyspark.sql.functions as f
from pushshift import file_to_dataframe
arr= ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]

conf = SparkConf().setAppName('s5')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)
df = file_to_dataframe('ficheros/Ejemplo10000Filas.json', ss)
top_10_posts = df.filter((f.col("title") != "") & (f.col("title") != "[deleted]") & (f.col("title") != "[removed]"))\
    .orderBy("score", ascending=False)\
    .limit(10)

top_10_words = top_10_posts.withColumn("word", f.explode(f.split(f.col("title"), ' ')))\
    .groupBy("word")\
    .filter(f.col("word") in arr)\
    .count() \
    .sort('count', ascending=False).limit(10)

top_10_words.write.json("s5_salida")