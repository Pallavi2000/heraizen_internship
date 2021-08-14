"""Program to check the given number is armstrong 
number or not"""

def amstg(num):
    num_1=num
    res=0
    while num!=0:
        r=num%10
        res=res+r**3
        num=num//10
    return num_1 == res

num=int(input("Enter a number: "))

if(amstg(num)):
    print(f"{num} is armstrong number")
else:
    print(f"{num} is not armstrong number")
