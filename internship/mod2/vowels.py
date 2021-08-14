s1=input("Enter a string ")
lst=['a','e','i','o','u']
s1=s1.lower()

res=list(filter(lambda x:x in lst,s1))

print(f"Vowel List: {res} and total no. of vowels={len(res)}")
