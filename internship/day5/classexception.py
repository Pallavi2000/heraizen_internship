class MaxLimitError(Exception):

    def __init__(self,msg):
        self.msg = msg
    
    def __str__(self):
        return f"{self.__class__.__name__} : {self.msg}"
c = 0

def login(usrname,passwd):
    global c
    if usrname == "abc" and passwd == "cba":
        print(f"Login is successfull")
    else:
        print(f"Bad credentials")
    c += 1
    if c > 2:
        raise MaxLimitError("You have rached maximum number of attempts")


login("ANC","AcD")
login("a","c")
login("abc","cba")