"""Program to check whether a given number is armstrong number or not"""

n=int(input("Enter the value of n: "))
temp=n
sum=0
while not temp==0:
    r=temp%10
    sum+=r**3
    temp=temp//10
if n==sum:
    print(f"{n} is a armstrong number")
else:
    print(f"{n} is not a armstrong number")