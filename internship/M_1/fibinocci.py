"""program to print the Fibonacci series up to the number 34."""

fib1,fib2=0,1
print(fib1,fib2,end=" ")
while True:
    fib3=fib1+fib2
    fib1,fib2=fib2,fib3
    print(fib3,end=" ")
    if fib3==34:
        break
    