from functools import reduce

lst=[1,2,3,4,5,6]

res=reduce(lambda a,b:a+b,lst)
print(f"Sum of elements of the list is {res}")