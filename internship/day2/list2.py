import random as rn
lst=[]
for i in range(1,21):
    lst.append(rn.randint(1,50))

res=[max(lst),min(lst)]
print(lst)
print(res)
