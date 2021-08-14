import dbcontext as db

def create_table():
    try:
        with db.DbContext() as conn:
            cursor = conn.cursor()
            cursor.execute("create table registration(iid integer references internship(id),usn integer references student(usn),status integer)")
    
    except Exception as e:
        print(str(e))
def create_table_stu():
    try:
        with db.DbContext() as conn:
            cursor = conn.cursor()
            cursor.execute("create table student(usn integer primary key,name text,sem integer,placed integer)")
    
    except Exception as e:
        print(str(e))
    
def add_new_student(usn,name,sem,placed):
    try:
         with db.DbContext() as conn:
            cursor = conn.cursor()
            cursor.execute("insert into student(usn,name,sem,placed)values(?,?,?,?)",(usn,name,sem,placed))
            print(f"New Student is added to the database with usn : {usn}")
        
    except Exception as e:
        print(str(e))

def add_new_registration(iid,usn,status):
    try:
         with db.DbContext() as conn:
            cursor = conn.cursor()
            cursor.execute("insert into registration(iid,usn,status)values(?,?,?)",(iid,usn,status))
            print(f"New Student is registered to the internship with usn : {usn} and internship id {iid}")
        
    except Exception as e:
        print(str(e))
#create_table()
"""add_new_student(16001,"Pallavi",5,0)
add_new_student(16002,"Rajani",5,0)
add_new_student(16008,"Mohan",5,1)
add_new_student(16009,"Deeksha",5,1)
add_new_student(16010,"Shama",5,0)
add_new_student(16024,"Rama",5,0)"""

"""add_new_registration(3718,16002,1)
add_new_registration(7318,16010,1)
add_new_registration(3718,16010,1)
add_new_registration(9877,16024,0)
add_new_registration(3718,16001,1)"""

