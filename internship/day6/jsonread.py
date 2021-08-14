import json

try:
    with open("ws1.json","r") as f:
        ws_lst = json.load(f)
    for w in ws_lst:
        print(f"Id:{w['id']} Name:{w['Name']} Year: {w['year']} status:{w['status']} company:{w['company']}")

except Exception as e:
    print(str(e))