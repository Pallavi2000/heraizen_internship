"""Program to accept a 5 digit number and increment each digit by 1 
and then display the new number the digit 9 is incremented to 0"""

N = int(input("Enter a five digit number: "))

temp = 0
digit = N
while digit != 0:
    r = digit % 10
    temp = temp * 10 + r
    digit //= 10

while temp != 0:
    r = temp % 10
    temp //= 10
    if r == 9:
        r = 0
    else:
        r += 1
    digit = digit * 10 + r



print(f"Given number: {N} and modified number: {digit}")
