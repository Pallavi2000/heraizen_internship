import csv

class Stock:
    def  __init__(self,name,symbol,exchange,price):
        self.name = name
        self.symbol = symbol
        self.exchange = exchange
        self.price = price
    
    def __str__(self):
        return f"{self.name}, {self.symbol}, {self.exchange}, {self.price}"


def clean_init_get():
    stock_lst = []
    try:
        with open("stock_price.csv") as f:
            data = csv.reader(F,delimiter=",")
            line = 0
            for d in data:
                if line == 0:
                    line += 1
                    continue
                stock_lst.append(Stock(*d))
        for s in stock_lst:
            if "k"in s.price:
                s.price = float(s.price.strip().replace("k","") * 1000
            else:
                s.price = float(s.price.strip())
            print(s)
    except Exception as e:
        print('{},value{!r}'.format(err.args[0],err))
    
    return stock_lst

def max_min_stock_price():
    st_lst = clean_init_get()
    pass

def  show_stock_price(price):
    st_lst = clean_init_get()
    f = filter(lambda x:x.price <= price,st_lst)
    if f:
        show_stock_info(list(f))
    else:
        print(f"No stock found for a given price : {price}")

    

def show_stock_info(lst):
    for l in lst:
        print(l)

price = int(input("Enter the price "))
show_stock_price(5000)



