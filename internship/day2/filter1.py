def prime(num):
    if num >= 2 :
        for i in range(2,(num // 2) + 1):
            if num % i == 0:
                return False
        return True
    return False

nums=[i for i in range(100,201)]
lst=list(filter(prime,nums))
print(lst)