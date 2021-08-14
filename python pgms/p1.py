#Activity Selection

#Sorting the activity arrays
def sortTheActivity(start, end):
    for i in range(len(start)):
        for j in range(len(start) - i - 1):
            if start[j] > start[j + 1]:
                start[j], start[j + 1] = start[j + 1], start[j]
                end[j], end[j + 1] = end[j + 1], end[j]
    
    return start, end

testCases = int(input())
maxNonOverlapAct = 0

for i in range(testCases):
    activityStartTimes = []
    activityEndTimes = []

    totalActivities = int(input())

    for j in range(0,totalActivities):
        activityStartTimes.append(int(input()))

    for k in range(0,totalActivities):
        activityEndTimes.append(int(input()))
    
    activityStartTimes, activityEndTimes = sortTheActivity(activityStartTimes, activityEndTimes)
    j = 0

    #Finding out the maximum non over lapping activites
    while j + 1 < len(activityStartTimes):
        if activityEndTimes[j] <= activityStartTimes[j + 1]:
            maxNonOverlapAct += 1
            j += 1

        else:
            if activityEndTimes[j] > (activityEndTimes[j + 1] - (activityStartTimes[j] - activityStartTimes[j + 1])):
                del activityStartTimes[j]
                del activityEndTimes[j]
            else:
                del activityStartTimes[j + 1]
                del activityEndTimes[j + 1]

    print(maxNonOverlapAct + 1)