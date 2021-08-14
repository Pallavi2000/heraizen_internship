lst = [[1,2,3],[5,6,7],[12,14,19]]

res = []
for i in lst:
	res.extend(i)
max1 = max(res)
min1= min(res)
print(f"minimum value element in the array is {min1}")
print(f"maximum value element in the array is {max1}")

maxrow,minrow = [],[]

for i in lst:
	max1 = max(i)
	min1 = min(i)
	maxrow.append(max1)
	minrow.append(min1)

print(f"elements with minimum values row-wise: {minrow}")
print(f"elements with maximum values row-wise: {maxrow}")