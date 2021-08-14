try:
    num1 = int(input("Enter the num1"))
    num2 = int(input("Enter the num2"))
    print(num1 ** num2)
    print(num1 / num2)
    print(f"Sum is:"+num1+num2)

except ZeroDivisionError:
    print(f"num2 cannot be zero...")
except ValueError:
    print(f"Please enter only numbers....")
except Exception as e:
    print(f"Something went wrong : {e}")    