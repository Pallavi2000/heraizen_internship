data=input("Enter the names delimiter is comma")

names=data.upper().split(",")
print(names)
print(type(names))
lst=[]
for name in names:
    if name.startswith("A") or  name.endswith("H"):
        lst.append(name)
lst.sort()
print(lst)