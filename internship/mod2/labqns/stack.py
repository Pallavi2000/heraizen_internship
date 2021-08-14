class Stack:

    def __init__(self):
        self.st = []
    
    def push(self,ele):
        self.st.append(ele)
    
    def pop(self):
        if self.is_empty:
            print(f"Stack is empty")
        else:
            print(f"Popped element is {self.st.pop()}")
    
    def search(self,ele):
     
        for index,i in enumerate(self.st): 
            if i == ele:
                return index
        return -1

    def show(self):

        if self.is_empty:
            print("Stack is empty")
        else:
            print(f"Stack elements are")
            for i in self.st:
                print(i,end = " ")
    
    def is_empty(self):
        if len(self.st) == 0:
            return True
        return False

if __name__=="__main__":
    st = Stack()
    while True:
        print(f"1.Push 2.Pop 3.Search 4.Display 5.Exit")
        try:
            ch = int(input("Enter your choice : "))
            if ch == 1:
                ele = int(input("Enter the element to be added to stack : "))
                st.push(ele)
            elif ch == 2:
                st.pop()
            elif ch == 3:
                ele = int(input("Enter the element to be searched in stack : "))
                i=st.search(ele)
                if i == -1:
                    print(f"Element is not found")
                else:
                    print(f"Element {ele} is found at position {i}")
            elif ch == 4:
                st.show()
            elif ch == 5:
                break
            else:
                raise ValueError
            
        except KeyError:
            print(f"Input can only be 1 to 5")
            



