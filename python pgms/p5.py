#Find missing numbers taking array 2 as base array

n = int(input())
arrayOne = list(map(int, input().split()))[:n]
m = int(input())
arrayTwo = list(map(int, input().split()))[:m]
missingNumbers = []
missingNumbers = []

for element in arrayTwo:
    if element not in arrayOne:
        missingNumbers.append(element)
    else:
        arrayOne.remove(element)

print(*list(sorted(set(missingNumbers))))
