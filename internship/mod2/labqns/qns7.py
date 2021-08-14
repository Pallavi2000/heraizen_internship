lower_bound = int(input("Enter lower bound value: "))
upper_bound = int(input("Enter upper bound value: "))

for i in range(lower_bound,upper_bound+1):
    if  i % 9 == 0 and not i % 5 == 0:
        print(i,end = " ")