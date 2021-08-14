"""To calaculate simple interest"""

p=float(input("Enter the value of principle: "))
t=int(input("Enter the value of time in month: "))
r=float(input("Enter the value of rate : "))

si=(p*t*r)/100

print(f"Simple interest is {si}")