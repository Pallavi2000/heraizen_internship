n=int(input("Enter the value of n: "))
i=1
c=0
while True:
    temp=i
    rev=0
    while not temp==0:
         r=temp%10
         rev=(rev*10)+r
         temp=temp//10
    if i==rev:
        print(i,end=" ")
        c+=1
    i+=1

    if c==n :
        break
