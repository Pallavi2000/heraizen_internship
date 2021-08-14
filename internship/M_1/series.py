"""program to accept a number “n” from the user; 
then display the sum of the following series:
1+ 1/2 + 1/3 + …….+ 1/n"""

N=int(input("Enter the value of N "))
sum=1
if N==0:
    print(f"Input nonzero value")
else:
    for i in range(2,N+1):
        sum+=1/i

    print(f"Sum of series={sum}")
