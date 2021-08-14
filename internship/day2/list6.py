m1=[1,2,3,4,5,6]
m2=[2,3,7,5,9]
m3=[1,5,4,10,11]
res=[]

res.extend(m1)
res.extend(m2)
res.extend(m3)

u=[]

for i in res:
    if i in u:
        pass
    else:
        u.append(i)
print(u)

