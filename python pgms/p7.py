#Harry Potter and the Sorceror's Stone

numberOfGoldCoins = int(input())
worthOfCoins = list(map(int, input().split()))[:numberOfGoldCoins]

numberOfInstructions = int(input())
value = int(input())
monksBag = []

for i in range(numberOfInstructions):
    instruction = input()
    if instruction == 'Harry':
        monksBag.append(worthOfCoins.pop(0))
    if sum(monksBag) == value:
        print(len(monksBag))
        break
    elif instruction == 'Remove':
        monksBag.pop()

if sum(monksBag) != value:
    print(-1)