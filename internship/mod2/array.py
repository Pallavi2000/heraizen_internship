lst=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
    ]
res=[]
for l in lst:
    res.extend(l)
maximum=max(res)
minimum=min(res)

print(f"Maximum element in the array is {maximum}")
print(f"Minimum element in the array is {minimum}")

maxlst,minlst=[],[]

for l in lst:
    max1=max(l)
    min1=min(l)
    maxlst.append(max1)
    minlst.append(min1)

print(f"Elements with minimum values row wise {minlst}")
print(f"Elements with maximum values row wise {maxlst}")

maxlst,minlst=[],[]


