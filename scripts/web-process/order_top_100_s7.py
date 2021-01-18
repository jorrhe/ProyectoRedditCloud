import json,os

with open("../../salida/S7_output.json", 'r')as file:
    line = file.readline()
    array = []
    while line:
        jsonData = json.loads(line)

        array.append(jsonData)

        line = file.readline()

    array.sort(key=lambda x: x["nsfw_posts"], reverse=True)

    top100 = array[0:100]

    with open("../../docs/assets/json/S7_output.json", 'w') as output:
        json.dump(top100, output, ensure_ascii=True)