'''
https://github.com/samlopezf/Postcode-API-Lookup-Validation-Python-3-Implementation-Tutorial/blob/master/postcode-api-tutorial.py
'''

import urllib.request as req
import json

xpostcode = 'NN82DF'

def loadJsonResponse(url):
    return json.loads(req.urlopen(url).read())['result']

def queryPostcode(postcode):
    url = 'https://api.postcodes.io/postcodes?q={}'.format(postcode)
    return loadJsonResponse(url)

print(queryPostcode(xpostcode))