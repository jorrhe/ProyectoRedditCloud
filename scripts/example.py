from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pushshift import file_to_dataframe

conf = SparkConf().setAppName('COUNT')
sc = SparkContext(conf=conf)
ss = SparkSession(sc)

df = file_to_dataframe('RS_2019-01', ss)

df.coun()