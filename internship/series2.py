""""Program to find series 2"""

n=int(input("Enter the value of n : "))
for i in range(1,n+1):
    for j in range(1,n-i+2):
        print(j,end="")
    print()
