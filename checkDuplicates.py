import json

f = open("C:/Users/Justin Jaro/Downloads/TaxButler-AmazonOrders (25).json", encoding='utf-8')

data = json.load(f)
  
# Iterating through the json
# list

for i in data['Orders']:
    for ii in data['Orders']:
        count = 0
        if i['OrderId'] == ii['OrderId']:
            count += 1
            if count > 1:
                print(i)
  
# Closing file
f.close()