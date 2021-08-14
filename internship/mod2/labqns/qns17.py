str = input("Enter a string: ")
ch = str.endswith('y')
if ch :
    str = str[:len(str)-1]+"ies" # str = str[:-1] + "ies"
print(str)