try:
    f = open("data.txt","W")
    f.write("Hello World \r\n Good Morning \r\n")   # \r\n------->add new line for windows \n for linux
except FileNotFoundError:
    print(f"File not found")
finally:
    f.close()


num = 90
try:
    num /= 10 
except TypeError as e:
    print(e)
finally:
    print(f"finally block executed")