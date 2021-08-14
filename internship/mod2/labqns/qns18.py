product = {}
while True:
    print(f"1.Add 2.Display 3.Search 4.Exit")
    ch = input("Enter a choice")
    if ch == 1:
        print(f"Enter product id and value price")
        pro_id = int(input())
        price = int(input())
        product[pro_id] = price
    elif ch == 2:
        if product == {}:
            print(f"No products")
        else:
            for k,v in product.items():
                print(f"Product id: {pro_id} --- value price {price} ")
    elif ch == 3:
        se = int(input("Enter the product id which to be searched"))
        if product.get(se):
            print(f"Product with :")