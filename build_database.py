import requests,re

with open("database.txt","w") as f:

    for i in range(1,51):
        try:
            code = requests.get(f"https://raw.githubusercontent.com/r1cc4rdo/daily_coding_problem/master/problems/{str(i).zfill(2)}/problem_{str(i).zfill(2)}.py").text
            part1 = ">>> coding_problem(.*?)\n"
            func_call = re.search(part1, code).group(1)
            part2 = "\)\n(.*?)\n"
            answer = re.search(part2, code).group(1)
            f.write(f"coding_problem{func_call.strip()} == {answer.strip()}")
        except:
            f.write(f"Coding challenge {i} not compatible")
        f.write("\n")
        print(i)