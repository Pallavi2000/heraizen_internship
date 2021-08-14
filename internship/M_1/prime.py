"""Program to accept a number and determine whether it is a prime number or not."""

num=int(input("Enter a number: "))
flag=True
if num<2:
    flag=False
else:
    for i in range(2,(num//2) + 1):
        if num%i==0:
            flag=False
            break
if flag:
    print(f"{num} is prime number")
else:
    print(f"{num} is not prime number")
        