def sum_digit(lst):
    sum = 0
    for i in range(len(lst)):
        sum += lst[i]
    return sum

lst = [1,2,3,4]
print(f"sum of elements of list = {sum_digit(lst)}")