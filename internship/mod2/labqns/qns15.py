class Account:
    def __init__(self,accno,name, balance):
        self.accno = accno
        self.name = name
        self.balance = balance
    
    def deposit(self,deposit_amount):
        self.balance += deposit_amount
        print(f"Updated balance after deposit : {self.balance}")
    
    def withdraw(self,withdraw_amount):
        self.balance -= withdraw_amount
        print(f"Updated balance after withdrawal: {self.balance}")
    
    def show_info(self):
        print(f"Account no : {self.accno}")
        print(f"Name : {self.name}")
        print(f"Balance : {self.balance}")