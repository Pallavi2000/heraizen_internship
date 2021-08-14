data_lst = [
            {"id":1001,"Name":"Python","year": 2019,"status" : 1,"company" : "Herazen"},
            {"id" : 1002,"Name" : "Web","year" : 2018,"status" : 1,"company":"Herazen"}
           ]

try :
    with open("ws1.txt","w") as f:
        for d in data_lst:
            line = f'{d["id"]},{d["Name"]},{d["year"]},{d["status"]},{d["company"]}\r\n'
            f.writelines(line)
except Exception as e :
    print(str(e))