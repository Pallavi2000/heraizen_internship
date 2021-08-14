"""Program to accept 2 different numbers from the user and print all the prime numbers between these 2 numbers."""

LB=int(input("Enter Lower bound value "))
UB=int(input("Enter Upper bound value "))
flag=True
for i in range(LB,UB+1):
    if i<2:
        flag=False
    else:
        for j in range(2,(i//2)+1):
            if i%j==0:
                flag=False
                break
        if flag:
            print(i,end=" ")   
        flag=True                                                                                                                                                                                                                                                                                                                                        
