nos=[1,2,2,23,1,4,5,1,4]
c_nos={}

for  no in nos:
    if c_nos.get(no)==None:
        c_nos[no]=1
    else:
        c_nos[no]+=1
print(c_nos)