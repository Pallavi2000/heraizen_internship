n=int(input("Enter the value of n: "))
i=1
c=0
while True:
    temp=i
    sum=0
    while not temp==0:
         r=temp%10
         sum+=r**3
         temp=temp//10
    if i==sum:
        print(i)
        c+=1
    i+=1

    if c==n or c==5:
        break
