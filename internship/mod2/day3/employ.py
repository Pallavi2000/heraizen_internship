class Employee:

    def __init__(self,empno,name,qual,salary,dept_name):
        self.empno = empno
        self.name = name
        self.qual = qual 
        self.salary = salary
        self.dept_name = dept_name

    def show_info(self):
        print(f"{self.empno}-{self.name}-{self.qual}-{self.salary}-{self.dept_name}")

    def increment_salary(self,inc_amt):
        self.salary += inc_amt
        print(f"{self.name} salary after increament {self.salary}")
    