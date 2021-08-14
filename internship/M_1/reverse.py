"""program to accept a number from the user; then display the reverse of the entered number."""

n=int(input("Enter the value of n: "))
rev=0
temp=n
while not n==0:
    r=n%10
    rev=(rev*10)+r
    n=n//10
print(f"given number is {temp}")
print(f"Revesed number is {rev}")
