'''
https://github.com/samlopezf/Postcode-API-Lookup-Validation-Python-3-Implementation-Tutorial/blob/master/postcode-api-tutorial.py
'''

import urllib.request as myRequest
import json

xpostcode =  "nn84tj"

def loadJsonResponse(url):
    return json.loads(myRequest.urlopen(url).read())['result']

def queryPostcode(postcode):
    url = 'https://api.postcodes.io/postcodes?q={}'.format(postcode)
    return loadJsonResponse(url)
    
myLat = (queryPostcode(xpostcode)[0]['latitude'])
myLong = (queryPostcode(xpostcode)[0]['longitude'])
