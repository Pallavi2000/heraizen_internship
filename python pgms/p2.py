#Checking if given 2 strings are anagrams or not

testCases = int(input())

for i in range(testCases):
    flag = True
    stringOne = input()
    stringTwo = input()

    if len(stringOne) != len(stringTwo):
        print("False")
    
    else:
        for character in stringOne:
            if character not in stringTwo:
                flag = False
                break
            else:
                stringTwo = stringTwo.replace(character,'',1)
        if flag:
            print("True")
        else:
            print("False")