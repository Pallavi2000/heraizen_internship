"""program to find the sum of squares of 
only the even numbers in the given list."""

from functools import reduce

lst = [1,2,3,4,16,17]

res = reduce(lambda x,y:x + y,list(map(lambda a:a ** 2,list(filter(lambda c:c % 2 == 0,lst)))))

print(f"Sum of Squares of evem numbers is {res}") 