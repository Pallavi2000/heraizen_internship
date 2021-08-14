def biggest(a,b,c):
    if a > b and a > c:
        big = a
    elif b > c:
        big = b
    else:
        big = c
    return big

print("Enter 3 numbers: ")
a=int(input())
b=int(input())
c=int(input())

print(f"biggest number is {biggest(a,b,c)}")