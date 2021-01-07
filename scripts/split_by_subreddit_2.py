import json

with open("../salida/S2_output.json",'r')as file:
    line = file.readline()
    jsonData = json.loads(line)
    previousSubreddit= jsonData['subreddit']
    toFile = []
    while line:
        jsonData = json.loads(line)
        if jsonData['subreddit'] != previousSubreddit:
            with open("s2split/"+previousSubreddit + ".json", 'w') as output:
                json.dump(toFile, output)
            previousSubreddit = jsonData['subreddit']
            toFile = []
        else:
            toFile.append(jsonData)

        line = file.readline()

