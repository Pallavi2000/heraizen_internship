import database as db

def c_add_internship():
    iname = input("Internship name:")
    company = input("Company name:")
    i_year = int(input("Conducted year:"))
    db.add_internship(iname, company, i_year)

def c_view_all_internships():
    db.view_all_internships()
    
def c_search_internship_by_name():
    name = input("Enter the name to search:")
    db.search_internship_by_name(name)

def c_change_status_internship():
    id = int(input("Enter the internship id whose status needs to be changed"))
    db.change_status_internship(id)

def c_delete_internship():
    id = int(input("Enter the internship id which is to be deleted"))
    db.delete_internship(id)

# Student oprations
def c_add_student():
    id = int(input("Enter internship id"))
    usn = int(input("Enter the usn which to be registered to internship"))
    db.add_student_internship(id,usn)

def c_view_all_student():
    db.view_all_reg_student()

def c_search_student_by_name():
    name = input("Enter the student name to be searched")
    db.search_student_by_name(name)

def c_update_student():
    usn = int(input("Enter the student usn whose field has to be  modified"))
    attribute = input("Enter the field")
    value = input("Enter the modified value")
    db.update_student(usn,attribute,value)

def c_delete_student():
    usn = int(input("Enter the student usn which is to be deleted"))
    db.delete_student(usn)

# Registrations and summary reports 
def c_company_ws_count():
    db.company_ws_count()

def c_student_ws_count():
    db.student_ws_count()

def c_ws_student_reports():
    name = input("Enter the workshop name of which student report has to be displayed")
    db.ws_student_reports(name)

def c_reg_stu_internship():
    id = int(input("Enter internship id"))
    usn = int(input("Enter the usn which to be registered to internship"))
    db.add_student_internship(id,usn)

def c_update_stu_intership_status():
    usn = int(input("Enter the student usn whose status has to be modified"))
    db.update_stu_intership_status(usn)

while True:
    try:
        print("1. Add Internship 2.Student 3.Reports 4.Exit")
        mch = int(input("Enter you choice:"))
        
        if mch == 1:
            while True:
                try:
                    print("*"*50)
                    print("Internship programms conducted at MITE by Companies")
                    print("1.Add 2.View All 3.Search 4.Update 5.Delete 6.Main Menu")
                    print("*"*50)
                    ch = int(input("Enter your choice:"))
                    if ch == 1:
                        c_add_internship()
                    elif ch == 2:
                        c_view_all_internships()
                    elif ch == 3:
                        c_search_internship_by_name()
                    elif ch == 4:
                        c_change_status_internship()
                    elif ch == 5:
                        c_delete_internship()
                    elif ch == 6:
                        break
                    else:
                        raise Exception()
                except Exception as e:
                    print("Please provide valid input 1 - 6")
        elif mch == 2:
            while True:
                try:
                    print("*"*50)
                    print("Add Students to Internship programms")
                    print("1.Add 2.View All 3.Search 4.Update 5.Delete 6.Main Menu")
                    print("*"*50)
                    ch = int(input("Enter your choice:"))
                    if ch == 1:
                        c_add_student()
                    elif ch == 2:
                        c_view_all_student()
                    elif ch == 3:
                        c_search_student_by_name()
                    elif ch == 4:
                        c_update_student()
                    elif ch == 5:
                        c_delete_student()
                    elif ch == 6:
                        break
                    else:
                        raise Exception()
                except Exception as e:
                    print("Please provide valid input 1 - 6")
        elif mch == 3:
                while True:
                    try:
                        print("*"*50)
                        print("Internship programms conducted at MITE Reports")
                        print("1.Register Student 2.Update Status 3.Company ws count 4.Student ws count 5.Studen_ws_name_company_year 6.Main Menu")
                        ch = int(input("Enter your choice:"))
                        if ch == 1:
                            c_reg_stu_internship()
                        elif ch == 2:
                            c_update_stu_intership_status()                       
                        if ch == 3:
                            c_company_ws_count()
                        elif ch == 4:
                            c_student_ws_count()
                        elif ch == 5:
                            c_ws_student_reports()
                        elif ch == 6:
                            break
                        else:
                            raise Exception()
                    except Exception as e:
                        print("Please provide valid input 1 - 4")
        elif mch == 4:
            print("Thank you programming is going to terminate.....")
            exit()
        else:
            raise Exception()
    except Exception as e:
        print("Enter valid input (1 to 3) only...")