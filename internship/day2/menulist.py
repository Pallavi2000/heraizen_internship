lst=[]
def add(ele):
    lst.append(ele)

def pop():
    if len(lst) == 0:
        print(f"List is empty")
    else:
        ele=lst.pop()
        print(f"Popped element  is {ele}")

def search(ele):
    if len(lst) == 0:
        print(f"List is  empty")
    else:
        if ele in lst:
            index=lst.index(ele)
            print(f"Given {ele} is found at the position {index}")
        else:
            print(f"Search is unsuccessfull")

def display():
    if len(lst) == 0:
        print(f"List is  empty")
    else:
        for l  in lst:
            print(l)

while True:
    print(f"\n1.Add 2.Delete 3.Search 4.Display 5.Exit")
    c=int(input("Enter your choice"))

    if c == 1:
        ele=int(input("Enter the element to be added to list"))
        add(ele)
    elif c == 2:
        pop()
    elif c == 3:
        ele=int(input("Enter the element to be searched in the list"))
        search(ele)
    elif c==4:
        display()
    else:
        break
