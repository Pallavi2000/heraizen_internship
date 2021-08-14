str = input("Enter a string: ")

lst = ['a','e','i','o','u']
for ch in str:
    if ch in lst:
        str = str.replace(ch,'')
print(str)
