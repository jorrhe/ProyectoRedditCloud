import json
import csv
import sys
import os

from collections import defaultdict

if len(sys.argv) == 3:
    file = sys.argv[1]
    out = sys.argv[2]
    try:
        with open(file, 'r') as input:
            array = []
            for line in input:
                jsonData = json.loads(line)
                array.append(jsonData)

            groups = defaultdict(list)

            for obj in array:
                groups[obj["subreddit"]].append(obj)

            filas = []

            for key, value in groups.items():

                fila = {"subreddit": key}
                nombres = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                           '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                           '31']

                for valor in value:
                    dia = valor["day"]
                    if int(dia) < 10:
                        dia = dia.replace("0","")
                    fila[dia] = valor["posts"]

                anterior = nombres[0]

                if anterior not in fila:
                    fila[anterior] = 0

                for dia in nombres:

                    if dia == anterior:
                        continue

                    if dia not in fila:
                        fila[dia] = 0

                    fila[dia] += fila[anterior]

                    anterior = dia

                filas.append(fila)

            keys = filas[0].keys()
            oredenada = sorted(filas, key=lambda k: k["31"], reverse=True)
            with open('../s3_out.csv', 'w', newline='') as output_file:
                dict_writer = csv.DictWriter(output_file, keys)
                dict_writer.writeheader()
                dict_writer.writerows(oredenada[0: 1000])

    except IOError:
        print("El archivo de input no existe")
else:
    print("Indica fichero de input y fichero de output")
