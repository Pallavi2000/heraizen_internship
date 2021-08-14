#Find the last player who possess the ball

testCases = int(input())

for i in range(testCases):
    passes = []

    noOfPasses = int(input())
    initialId = int(input())

    for j in range(noOfPasses):
        operation = input()
        if operation[0] == 'P':
            passes.append(int(operation[1]))
        elif operation[0] == 'B':
            passes.pop()
    
    print("Player ",passes[-1])