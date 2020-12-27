from pyspark import SparkContext
from pyspark.sql import SparkSession, DataFrame
import configparser
import os


def file_to_dataframe(file_path, ss):  # type: (str,SparkSession) -> DataFrame

    return ss.read.option("wholeFile", True).option("mode", "PERMISSIVE").json(file_path)


def s3_to_dataframe(file_url, sc, ss):  # type: (str,SparkContext,SparkSession) -> DataFrame

    config = configparser.ConfigParser()
    config.read(os.path.expanduser("~/.aws/credentials"))
    access_id = config.get("default", "aws_access_key_id")
    access_key = config.get("default", "aws_secret_access_key")

    hadoop_conf = sc._jsc.hadoopConfiguration()
    hadoop_conf.set("fs.s3n.impl", "org.apache.hadoop.fs.s3native.NativeS3FileSystem")
    hadoop_conf.set("fs.s3n.awsAccessKeyId", access_id)
    hadoop_conf.set("fs.s3n.awsSecretAccessKey", access_key)

    return ss.read.option("wholeFile", True).option("mode", "PERMISSIVE").json(file_url)
