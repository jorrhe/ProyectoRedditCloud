from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import s3_to_dataframe, file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('StockSumary')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

# df = s3_to_dataframe('s3://cloud-jorge/Ejemplo10000Filas.json', sc, ss)
df = file_to_dataframe('Ejemplo10000Filas.json', ss)

print(df.count())

print(df.where("stickied = True").count())
