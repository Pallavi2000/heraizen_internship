import time
import random as rn
import dbcontext as db
from models import Internship,Student,Registration
from beautifultable import BeautifulTable

def _get_new_id():
    t_obj = time.localtime()
    new_id = rn.randint(1000,9900) + (t_obj.tm_min + t_obj.tm_hour + t_obj.tm_sec)
    return new_id

def add_internship(iname,company,i_year):
    id = _get_new_id()
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("insert into internship(id,iname,company,i_year,status) values(?,?,?,?,?)",(id,iname,company,i_year,1))
            print(f"Internship is added successfully with id:{id}")
    except Exception as e:      
        print(str(e))

def view_all_internships():
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select id,iname,company,i_year,status from internship")
            rows = cursor.fetchall()
            intern_pro_lst = [Internship(*row) for row in rows]
            _view_internship_list(intern_pro_lst)
    except Exception as e:
        print(str(e))

def search_internship_by_name(name):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select id,iname,company,i_year,status from internship where iname = ?",(name,))
            rows = cursor.fetchall()
            intern_pro_lst = [Internship(*row) for row in rows]
            _view_internship_list(intern_pro_lst)
    except Exception as e:
        print(str(e))

def change_status_internship(iid):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("update internship set status = 0 where id = ?",(iid,))
            connection.commit()
    except Exception as e:
        print(str(e))

def delete_internship(id):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            si = cursor.execute("delete from internship where id = ?",(id,))
            connection.commit()
            if si:
                print(f"Internship with id {id} is deleted successfully")
            else:
                print(f"There is no internship with such id {id}")
    except Exception as e:
        print(str(e))

def add_student_internship(iid,usn):
    try:
         with db.DbContext() as conn:
            cursor = conn.cursor()
            cursor.execute("insert into registration(iid,usn,status)values(?,?,?)",(iid,usn,1))
            print(f"New Student is registered to the internship with usn :{usn}  and internship id {iid} ")
    except Exception as e:
        print(str(e))

def view_all_reg_student():
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select iid,usn,status from registration")
            rows = cursor.fetchall()
            reg_pro_lst = [Registration(*row) for row in rows]
            _view_reg_list(reg_pro_lst)
    except Exception as e:
        print(str(e))

def search_student_by_name(sname):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select usn,name,sem,placed from student where name = ?",(sname,))
            rows = cursor.fetchall()
            student_pro_lst = [Student(*row) for row in rows]
            _view_student_list(student_pro_lst)
    except Exception as e:
        print(str(e))

def update_student(usn,attribute,att_value):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            if attribute =='usn':
                cursor.execute("update student set usn = ? where usn = ? ",(int(att_value),usn))
            elif attribute =='name':
                cursor.execute("update student set name = ? where usn = ? ",(att_value,usn))
            elif attribute =='sem':
                cursor.execute("update student set sem = ? where usn = ? ",(int(att_value),usn))
            elif attribute == 'placed':
                cursor.execute("update student set sem = ? where usn = ? ",(int(att_value),usn))
            else:
                print(f"Please provide the correct field which is to be updated.......")
    except Exception as e:
        print(str(e))
               
def delete_student(usn):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            si = cursor.execute("delete from student where usn = ?",(usn,))
            connection.commit()
            if si:
                print(f"Student with usn {usn} is deleted successfully")
            else:
                print(f"There is no student with such usn {usn}")
    except Exception as e:
        print(str(e))

def company_ws_count():
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select id,company,count(*) from internship group by company")
            rows = cursor.fetchall()
            if rows:
                table = BeautifulTable()
                table.column_headers = ["ID", "COMPANY", "COUNT"]
                for row in rows:
                    table.append_row([row[0],row[1],row[2]])
        print(table)
    except Exception as e:
        print(str(e))

def student_ws_count():
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select s.usn,s.name,count(*) from student s inner join registration r on r.usn = s.usn group by r.usn")
            rows = cursor.fetchall()
            if rows:
                table = BeautifulTable()
                table.column_headers = ["USN", "NAME","NO_WORKSHOP_COUNT"]
                for row in rows:
                    table.append_row([row[0],row[1],row[2]])
                print(table)
            else:
                print(f"There is no student who registered for workshop")
    except Exception as e:
        print(str(e))
    
def ws_student_reports(name):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("select s.usn,s.name,s.sem,i.iname from student s inner join \
                           registration r on r.usn = s.usn  inner join internship i on r.iid = i.id and i.iname like '%?%'",(name))
            rows = cursor.fetchall()
            if rows:
                table = BeautifulTable()
                table.column_headers = ["USN", "NAME","SEM","INTERNSHIP"]
                for row in rows:
                    table.append_row([row[0],row[1],row[2],row[3]])
                print(table)
    except Exception as e:
        print(str(e))
    

def reg_stu_internship():
    pass

def update_stu_intership_status(usn):
    try:
        with db.DbContext() as connection:
            cursor = connection.cursor()
            cursor.execute("update student set status = 0 where usn = ?",(usn,))
            connection.commit()
    except Exception as e:
        print(str(e))

def _view_internship_list(lst):
    if lst and len(lst) > 0:
        table = BeautifulTable()
        table.column_headers = ["ID", "NAME", "COMPANAY", "YEAR","STATUS"]
        for l in lst:
            status = "Comleted" if l.status == 0 else "Going on" 
            table.append_row([l.id, l.iname, l.company, l.i_year,status])
        print(table)
    else:
        print(f"There are no Intership programms, yet to add...")

def _view_student_list(lst):
    if lst and len(lst) > 0:
        table = BeautifulTable()
        table.column_headers = ["USN", "NAME", "SEM", "PLACED"]
        for l in lst:
            status = "Not Placed" if l.status == 0 else "Placed" 
            table.append_row([l.usn, l.name, l.sem,status])
        print(table)
    else:
        print(f"There are no student records, yet to add...")
   
def _view_reg_list(lst):
    if lst and len(lst) > 0:
        table = BeautifulTable()
        table.column_headers = ["IID", "USN", "STATUS"]
        for l in lst:
            status = "Not attending" if l.status == 0 else "Attending" 
            table.append_row([l.iid, l.usn,status])
        print(table)
    else:
        print(f"There are no registered student records, yet to add...")