"""program to accept an input string from the user 
and determine the vowels in the string and 
calculate the number of vowels."""
"""Program to count the number of vowels in a string"""

lst = ['a','e','i','o','u']

s = input("Enter a string : ")
s = s.lower()

res = list(filter(lambda x:x in lst,s))

print(f"All the vowels in the given string {s} is {res}")

print(f"Vowel count = {len(res)}")
