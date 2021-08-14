import re

data = "Pllavi is in 560070 works at Banglore and krish is 522612"
lst = re.findall(r"\d{6}+",data)
print(lst)

data1 = "Pallavi is in 560070 works at Mangalore and Rajani is in 534006 at Bangalore"
lst1 = re.findall(r"at\s+([A-Z]*)\s?",data1)
""" *----->zeo or more occurance
 ?------>Zero or more occurance
 \s----->space
 +------>one or more occurance
 \d----->digit
 [A-z]----->character match"""
 