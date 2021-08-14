#Maximum element in the stack

numberOfOperations = int(input())
outputs = []
stack = []
for i in range(numberOfOperations):
    operation = input().split()

    if operation[0] == '1':
        stack.append(int(operation[1]))
    
    elif operation[0] == '2':
        if len(stack) > 0:
            stack.pop()
        else:
            outputs.append("Stack is Empty")
    
    elif operation[0] == '3':
        if len(stack) > 0:
            outputs.append(max(stack))
        else:
            outputs.append("Stack is Empty")
    
    else:
        outputs.append("Invalid Input")

print(*outputs)
