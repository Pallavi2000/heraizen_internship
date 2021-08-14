N = int(input("Enter a five digit number: "))

count = 0
while N != 0:
    r = N % 10
    if r in [2,3,5,7]:
        count += 1
    N //= 10
print(count)