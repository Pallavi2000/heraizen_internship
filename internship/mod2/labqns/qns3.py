"""Program to find sum of digits of a number"""

N = int(input("Enter a Number: "))

temp = N
digit = 0
while True:
    while temp != 0:
        digit += temp % 10
        temp //= 10
    if digit <= 9:
        break
    temp = digit
    digit = 0

print(f"Sum of digits of {N} is {digit}")
