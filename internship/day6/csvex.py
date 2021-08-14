import csv

data_lst = [
            {"id":1001,"Name":"Python","year": 2019,"status" : 1,"company" : "Herazen"},
            {"id" : 1002,"Name" : "Web","year" : 2018,"status" : 1,"company":"Herazen"}
           ]

try :
    with open("ws1.csv","w",newline = '') as f:
        headings = ["id","Name","year","status","company"]
        obj = csv.DictWriter(f,fieldnames = headings)
        obj.writeheader()
        obj.writerows(data_lst)

except Exception as e :
    print(str(e))