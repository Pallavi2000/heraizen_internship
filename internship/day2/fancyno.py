""" Program to get a fsncy  number"""

def sum_digit(num):
    res=0
    while num != 0:
        res += num%10
        num //= 10
    return res == 12

def  get_num(num):
    a,num = num % 1000,num // 1000
    b,num = num % 100,num // 100
    c,num = num % 10,num // 10
    d,num = num % 1,num // 1

    return a,b,c,d

for i in range(1000,10000):
    if(sum_digit(i)):
        a,b,c,d=get_num(i)
        if c == a-b and d == a+c :
            print(i)
