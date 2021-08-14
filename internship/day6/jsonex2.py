import json

try:
    with open("ws1.json","r") as w, open("student.json","r") as s:
        s_lst = json.load(s)
        w_lst = json.load(w)

    for s in s_lst:
        for w in w_lst:
            if s['cid'] == w['id']:
                print(f"{w['id']},{s['name']},{w['year']},{w['Name']},{w['company']}")
except Exception as e:
    print(str(e))