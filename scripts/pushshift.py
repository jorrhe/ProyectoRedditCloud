from pyspark.sql import SparkSession, DataFrame
import argparse
import sys


def get_file():

    parser = argparse.ArgumentParser()
    parser.add_argument("--file", help="Path where the dataset is located")
    args = parser.parse_args()

    if not args.file:
        print("Error --file argument not passed")
        sys.exit()

    file_path = args.file

    return file_path


def file_to_dataframe(file_path, ss):  # type: (str,SparkSession) -> DataFrame

    return ss.read.option("wholeFile", True)\
            .option("badRecordsPath", "/tmp/badRecordsPath")\
            .option("mode", "PERMISSIVE")\
            .option("columnNameOfCorruptRecord", "_corrupt_record").json(file_path)
