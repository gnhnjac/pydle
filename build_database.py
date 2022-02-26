# import requests,re

# with open("database.txt","w") as f:

#     for i in range(1,51):
#         try:
#             code = requests.get(f"https://raw.githubusercontent.com/r1cc4rdo/daily_coding_problem/master/problems/{str(i).zfill(2)}/problem_{str(i).zfill(2)}.py").text
#             part1 = ">>> coding_problem(.*?)\n"
#             func_call = re.search(part1, code).group(1)
#             part2 = "\)\n(.*?)\n"
#             answer = re.search(part2, code).group(1)
#             f.write(f"coding_problem{func_call.strip()} == {answer.strip()}")
#         except:
#             f.write(f"Coding challenge {i} not compatible")
#         f.write("\n")
#         print(i)

# import requests, re

# with open("challenges.txt", 'w') as f:

#     for i in range(1,51):
#         try:
#             code = requests.get(f"https://raw.githubusercontent.com/r1cc4rdo/daily_coding_problem/master/problems/{str(i).zfill(2)}/problem_{str(i).zfill(2)}.py").text
#             question = code[:code.find("pass")+4]
#             f.write(question + "\n" + "@@@@@@@")
#         except Exception as e:
#             print(e)
#             f.write(f"Coding challenge {i} not compatible")
#         f.write("\n")
#         print(i)

# with open("new_solutions.txt", 'w') as f:

#     with open("solutions.txt", "r") as f2:
#         for line in f2.readlines():
#             if "Coding challenge" not in line:
#                 f.write(line)

# with open("new_solutions.txt", "r") as f:
#     with open("very_solutions.txt", "w") as f2:
#         i = 0
#         for line in f.readlines():

#             for j in range(51):
#                 line = line.replace("coding_problem_" + str(j).zfill(2), "coding_problem_" + str(i).zfill(2))

#             f2.write(line)

#             i+=1

with open("challenges.txt", "r") as f:
    with open("new_challenges.txt", "w") as f2:
        i = 0
        for code in f.read().split("@@@@@@@"):

            for j in range(51):
                code = code.replace("coding_problem_" + str(j).zfill(2), "coding_problem_" + str(i).zfill(2))

            f2.write(code)
            f2.write("@@@@@@@")

            i+=1