'''
https://github.com/samlopezf/Postcode-API-Lookup-Validation-Python-3-Implementation-Tutorial/blob/master/postcode-api-tutorial.py
'''

import urllib.request as myRequest
import json

# get variable from html input from
xpostcode = 


# load json request
def loadJsonResponse(url):
    return json.loads(myRequest.urlopen(url).read())['result']

# get query postcode information as list from postcodeIO
def queryPostcode(postcode):
    url = 'https://api.postcodes.io/postcodes?q={}'.format(postcode)
    return loadJsonResponse(url)
    
# pass returned values from list into variables
myLat = (queryPostcode(xpostcode)[0]['latitude'])
myLong = (queryPostcode(xpostcode)[0]['longitude'])


# post arguments to jquery leaflet.js 
