"""program to find the sum of the given elements of the list. """

from functools import reduce

lst = [1,2,3,4,5,6]

res = reduce(lambda x,y:x+y,lst)

print(f"Sum of elements of array = {res}")

