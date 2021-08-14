"""Program to find the factorial of the number"""

N = int(input("Enter a Number: "))
fact = 1
for i in range(2,N+1):
    fact *= i

print(f"Factorial of {N} = {fact}")