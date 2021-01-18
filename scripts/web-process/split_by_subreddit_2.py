import json

with open("../../salida/S2_output.json", 'r')as file:
    line = file.readline()
    jsonData = json.loads(line)
    previousSubreddit= jsonData['subreddit']
    toFile = []
    while line:
        jsonData = json.loads(line)
        if jsonData['subreddit'] != previousSubreddit:

            if len(toFile) == 23:
                with open("../docs/assets/json/s2/"+previousSubreddit + ".json", 'w') as output:
                    json.dump(toFile, output, ensure_ascii=False)
            previousSubreddit = jsonData['subreddit']
            toFile = []
        else:
            toFile.append(jsonData)

        line = file.readline()

