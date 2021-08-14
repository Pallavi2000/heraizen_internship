""""Program to find first n numbers which are divisible by 3,6 but not by 9"""

n=int(input("Enter the value of n"))
i=1
c=0
while True:
    if i%3==0 and i%6==0 and (not i%9==0):
        print(i,end=" ")
        c+=1
    if c==n:
        break
    i+=1

