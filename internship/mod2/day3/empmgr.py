from employ import Employee

lst_emp=[]

def load_emp():
    with open("file.txt") as f:
        fdata=f.readlines()
        print(fdata)
        print(type(fdata))
        for data in fdata:
            print(data)
            edata=data.strip("\n").split(",")
            empno=int(edata[0])
            ename=edata[1]
            qual=edata[2]
            sal=int(edata[3])
            dept_name=edata[4]
            emp=Employee(empno,ename,qual,sal,dept_name)
            lst_emp.append(emp)
        print(f"Total number of employees {len(lst_emp)}")

def showDeptname():

    dnames=set(map(lambda emp:emp.dept_name,lst_emp))
    for name in dnames:
        print(name)

def showAllqual():

    dqual=set(map(lambda emp:emp.qual,lst_emp))
    for qual in dqual:
        print(qual)

def MaxSalaryEmployee():

    sal1=list(map(lambda emp:emp.salary,lst_emp))
    maximum=max(sal1)
    lst2=list(filter(lambda emp:emp.salary == maximum,lst_emp))

    for emp in lst2:
        emp.show_info()

def showEmpCountByDeptName():
    pass

def showTotalSalByDeptName():
    pass

def showEmpCountByQual():
    pass

load_emp()
print("All Departments")
showDeptname()
print("All Qualification")
showAllqual()
MaxSalaryEmployee()

