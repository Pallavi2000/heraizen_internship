import random as a
lst=[]
res=[]
for i in range(1,101):
    l=a.randint(1,1000)
    lst.append(l)
    if l % 3 == 0 and l % 6 == 0 and not l % 9 ==0:
        res.append(l)

print(lst)
print(res)