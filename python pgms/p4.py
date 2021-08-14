#Minimum Loss.
def minimumLoss(price):
    minimumLossObtained = None
    for i in range(0,len(price)):
        for j in range(i+1,len(price)):
            if price[i] > price[j]:
                if minimumLossObtained == None or minimumLossObtained > (price[i] - price[j]):
                    minimumLossObtained = price[i] - price[j]
    return minimumLossObtained
if __name__ == '__main__':
    n = int(input())
    price = list(map(int, input().split()))
    result = minimumLoss(price)
    print(result)
    