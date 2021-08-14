n=int(input("Enter the value of n: "))
rev=0
temp=n
while not temp==0:
    r=temp%10
    rev=(rev*10)+r
    temp=temp//10
if n==rev:
    print(f"{n} is a palindrome")
else:
    print(f"{n} Not a palindrome")