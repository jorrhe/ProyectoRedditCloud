import json
import re
import sys
import os

if len(sys.argv) == 3:
    file = sys.argv[1]
    out = sys.argv[2]
    try:
        with open(file, 'r') as input:
            array = []
            for line in input:
                jsonData = json.loads(line)
                array.append(jsonData)
                if not os.path.isdir("jsontoarray_out"):
                    os.mkdir("jsontoarray_out")
            with open(os.getcwd() + "/jsontoarray_out/" + out, 'w') as output:
                json.dump(array, output, ensure_ascii=True)
    except IOError:
        print("El archivo de input no existe")
else:
    print("Indica fichero de input y fichero de output")