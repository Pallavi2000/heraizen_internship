"""Program to find the prime series"""
lower_bound = int(input("Enter lower bound value: "))
upper_bound = int(input("Enter upper bound value: "))
if lower_bound <= 2 and upper_bound > 2:
    lower_bound=2
for i in range(lower_bound,upper_bound+1):
    flag = 1
    for j in range(2,(i // 2)+1):
        if i % j == 0:
            flag = 0
            break
                
    if flag == 1:
        print(i)

    """
    def prime(i):
    if i<2:
        return False
    for j in range(2,(i // 2)+1):
        if i % j == 0:
            return False
    return True

    for i in range(lb,ub+1):
        if prime(i):
            print(i)"""
