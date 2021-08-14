"""program to accept a five-digit number, increment each digit by 1 and then display the new number formed. 
Note that digit 9 gets incremented to 0."""

n=int(input("Enter a 5 digit number: "))
temp=n
digit=0
while n!=0:
    r=n%10
    n=n // 10
    if r==9:
        r=0
    else:
        r+=1
    digit=digit*10+r
while digit != 0:
    r=digit%10
    digit=digit // 10
    n=n*10+r
print(f"Given number is {temp}" )
print(f"Modified number is {n}")


