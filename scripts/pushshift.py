from pyspark.sql import SparkSession, DataFrame


def file_to_dataframe(file_path, ss):  # type: (str,SparkSession) -> DataFrame

    return ss.read.option("wholeFile", True)\
            .option("badRecordsPath", "/tmp/badRecordsPath")\
            .option("mode", "PERMISSIVE")\
            .option("columnNameOfCorruptRecord", "_corrupt_record").json(file_path)
