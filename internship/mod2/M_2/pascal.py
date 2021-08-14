"""function which implements the Pascal's triangle."""

lst_1 = [1]
lst_2 = []
res= []
res.append(lst_1)

for i in range(1,8):
    lst_2.append(1)
    for j in range((len(lst_1)-1)):
        ele = lst_1[j]+lst_1[j+1]
        lst_2.append(ele)
    lst_2.append(1)
    res.append(lst_2)
    lst_1 = lst_2
    lst_2 = []

for i in res:
    print(i)
        
