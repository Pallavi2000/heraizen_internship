def cost_vote(age):
    assert age >=18, f"Age should't  be less than 18, it was:{age}"
    print(f"Thank you for voting.....")

try:
    age = int(input("Enter your age"))
    cost_vote(age)
except AssertionError as a:
    print(a)
else:
    print(f"You entered a valid age : {age}")

finally:
    print(f"End.....")
