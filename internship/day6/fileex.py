data_lst = [
            [1001,"Python",2019,1,"Herazen"],
            [1002,"Web",2018,1,"Herazen"]
           ]

try :
    with open("ws.txt","w") as f:
        for d in data_lst:
            line = f'{d[0]},{d[1]},{d[2]},{d[3]},{d[4]}\r\n'
            f.writelines(line)
except Exception as e :
    print(str(e))
