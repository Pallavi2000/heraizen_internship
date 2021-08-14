from functools import reduce
lst = [1,2,3,4,5]

res=reduce(lambda a,b:a+b,list(filter(lambda x:x%2==0,list(map(lambda x:x**2,lst)))))
print(res)