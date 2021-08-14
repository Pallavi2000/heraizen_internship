"""a program to add the elements of 2 arrays 
that are of the same dimension"""

lst_1 = [1, 3, 4, 6, 8] 
lst_2 = [4, 5, 6, 2, 10] 

res = list(map(lambda x,y:x+y, lst_1, lst_2)) 

print(f"Resultant array is : {res}")