
while True:
    print(f"1.Check the stmt assertive or interrogative 2.Exit")
    ch=int(input())
    if ch == 1:
        str = input()
        if str.endwith('?'):
            print(f"Interogative")
        else:
            print(f"Assertive")
    else:
        break