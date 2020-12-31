from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe

# Por temas de caracteres al hacer df.show
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

conf = SparkConf().setMaster('local').setAppName('StockSumary')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('Ejemplo10000Filas.json', ss)


print("Total:")
print(df.count())
print("Stickied:")
print(df.where("stickied = True").count())
