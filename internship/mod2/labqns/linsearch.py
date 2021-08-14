def linear_search(lst,ele):
    index = 0
    for i in lst:
        if  i == ele:
            return index
        index += 1
    return -1

def bubble_sort(lst):
    for i in range(len(lst)-1,0,-1):
        for j in range(i):
            if lst[j] > lst[j+1]:
                lst[j],lst[j+1] = lst[j+1],lst[j]

def binary_search(lst,key):
    l = 0
    h = len(lst)-1
    while l<=h:
        mid = (l + h) // 2
        if lst[mid] == key :
            return mid
        elif lst[mid] > key:
            h = mid - 1
        else:
            l = mid + 1
    return -1


 def rec_bin_search(lst,key,l,h):
    if l<=h:
        mid = (l + h) // 2
        if lst[mid] == key :
            return mid
        elif key > lst[mid]:
           return rec_bin_search(lst,mid + 1,h,key)
        else:
            return rec_bin_search(lst,l,mid-1,key)
    return -1   
        
l = [3,4,5,6,2]
bubble_sort(l)
print(l)


lst = [1,2,3,4,5,6]
ele = 3
res = linear_search(lst,ele) 
if res== -1:
    print(f"Element is not found")
else:
    print(f"Element is found at position {res}")

lst_1 = [1,2,3,4,5,6]
ele = 3
res = binary_search(lst_1,ele) 
if res== -1:
    print(f"Element is not found")
else:
    print(f"Element is found at position {res}")



