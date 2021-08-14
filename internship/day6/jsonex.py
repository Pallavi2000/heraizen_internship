import json

data_lst = [
            {"id":1001,"Name":"Python","year": 2019,"status" : 1,"company" : "Herazen"},
            {"id" : 1002,"Name" : "Web","year" : 2018,"status" : 1,"company":"Herazen"}
           ]

try :
    with open("ws1.json","w",newline = '') as f:
        json.dump(data_lst,f,indent = 4)
    
except Exception as e :
    print(str(e))