import os
from random import randint

for i in reversed(range(20)):
    for j in range(0,randint(1,10)):
        d = str(i) + 'days ago'
        with open('file.txt','a')as file:
            file.write(d)
        os.system('git add . ')
        os.system('git commit --date "' + d + '" -m "deployment"')

os.system('git push -u origin main')