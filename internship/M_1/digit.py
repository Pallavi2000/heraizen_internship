"""program to accept a number from the user and determine the sum of digits of that number.
 Repeat the operation until the sum gets to be a single digit number."""

n=int(input("Enter the value of n: "))
temp=n
digit=n
while digit>=10:
    digit=0
    while not n==0 :
        r=n%10
        digit+=r
        n=n//10
    n=digit

print(f"Given Number : {temp} Sum of Digits : {digit}")

