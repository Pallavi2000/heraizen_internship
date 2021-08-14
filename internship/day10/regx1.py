import re

data = "House number 197 and pincode 56700"
res = re.search(r"\d+",data)  # only consider first occurance
print(data[res.start():res.end()]) # start()---starting index and end()----ending index
print(res.group())

data_1 = "blue shape red toy green"
data_1 = re.sub('red|blue|green','color',data_1)
print(data_1)

data_2 = "1001 DBMS 20   1002 JS 23   1003 SQL 15"
data_2 = re.findall(r'(\d{4})\s([A-z]*)\s+(\d{2})',data_2)
print(data_2)

data_3 = "Ananya and Amy are good friends latha and smitha are relatives"
lst = re.findall(r'\bA[a-z]{4,}',data_3)
print(lst)

data_4 = "krishna.t@wipro.com lakshman.a@spaneos.com lakshman.a@heraizen.edu"
lst_1 = re.findall('@([a-z]+).',data_4)
print(lst_1)

data_5 = "Learning- Python, is fun. Python_programming is, easy"
lst_2 = re.sub(r",|-|","",data_5)
print(lst_2)
