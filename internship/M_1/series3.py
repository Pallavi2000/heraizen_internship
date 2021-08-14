"""Program to print the following output pattern.
         1
        121
       12321
      1234321
     123454321"""

n=8
for i in range(1,6):
    for j in range(n,0,-1):
        print(end=" ")

    for j in range(1,i+1):
        print(j,end=" ")

    for k in range(i-1,0,-1):
        print(k,end=" ")
    print()
    n-=2