#!/usr/bin/env python3
"""Read-only Walmart Canada Global API health checks. No customer data output."""
import argparse, base64, datetime as dt, json, os, sys
import urllib.error, urllib.parse, urllib.request, uuid
HOSTS = {'sandbox':'https://sandbox.walmartapis.com','production':'https://marketplace.walmartapis.com'}
class WalmartError(RuntimeError): pass
class WalmartReadOnly:
    def __init__(self, client_id, client_secret, env='sandbox'):
        if env not in HOSTS: raise ValueError('Bad environment')
        if not client_id or not client_secret: raise WalmartError('Missing credentials')
        self.id,self.secret,self.base,self.token=client_id,client_secret,HOSTS[env],None
    def _read(self,req):
        try:
            with urllib.request.urlopen(req,timeout=25) as r:
                return json.loads(r.read(5000000).decode('utf-8'))
        except urllib.error.HTTPError as e: raise WalmartError(f'HTTP {e.code} from Walmart') from None
        except (ValueError,urllib.error.URLError,TimeoutError) as e: raise WalmartError(f'Network or JSON error: {type(e).__name__}') from None
    def authorize(self):
        encoded=base64.b64encode(f'{self.id}:{self.secret}'.encode()).decode()
        req=urllib.request.Request(self.base+'/v3/token',data=b'grant_type=client_credentials',headers={
            'Authorization':'Basic '+encoded,'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
            'WM_QOS.CORRELATION_ID':str(uuid.uuid4()),'WM_SVC.NAME':'Walmart Marketplace'
        },method='POST')
        self.token=self._read(req).get('access_token')
        if not self.token: raise WalmartError('Token response had no access_token')
    def get(self,path,query=None):
        if path not in ('/v3/items','/v3/inventories','/v3/orders'): raise WalmartError('Blocked API path')
        if not self.token: self.authorize()
        url=self.base+path+('?' + urllib.parse.urlencode(query) if query else '')
        req=urllib.request.Request(url,headers={
            'WM_SEC.ACCESS_TOKEN':self.token,'WM_QOS.CORRELATION_ID':str(uuid.uuid4()),
            'WM_SVC.NAME':'Walmart Marketplace','WM_GLOBAL_VERSION':'3.1',
            'WM_MARKET':'CA','Accept':'application/json'
        },method='GET')
        return self._read(req)
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--environment',choices=list(HOSTS),default=os.getenv('WALMART_ENV','sandbox'))
    ap.add_argument('--check-only',action='store_true');args=ap.parse_args()
    cid,sec=os.getenv('WALMART_CLIENT_ID',''),os.getenv('WALMART_CLIENT_SECRET','')
    if not cid or not sec: print('STATUS=WAITING_FOR_SELLER_APPROVAL_AND_API_CREDENTIALS');return 0
    if args.environment=='production' and os.getenv('WALMART_PRODUCTION_READY')!='true':
        print('STATUS=PRODUCTION_BLOCKED_UNTIL_EXPLICIT_ENABLEMENT');return 0
    if args.check_only: print('STATUS=CREDENTIALS_PRESENT_NOT_VALIDATED');return 0
    c=WalmartReadOnly(cid,sec,args.environment)
    try:
        c.authorize()
        lastweek=(dt.datetime.now(dt.timezone.utc)-dt.timedelta(days=7)).strftime('%Y-%m-%d')
        tasks=[('catalog','/v3/items',{'limit':20,'offset':0}),
               ('inventory','/v3/inventories',{'limit':50}),
               ('orders','/v3/orders',{'createdStartDate':lastweek,'limit':50})]
        good,failed=[],[]
        for name,path,query in tasks:
            try: c.get(path,query);good.append(name)
            except WalmartError as e: failed.append(name+'='+str(e))
        print('STATUS='+('CONNECTED_READ_ONLY' if not failed else 'PARTIAL_API_FAILURE'))
        print('API_CHECKS_PASSED='+','.join(good))
        for f in failed: print('API_FAILURE='+f)
        return 0 if not failed else 2
    except WalmartError as e:
        print('STATUS=AUTHENTICATION_OR_CONNECTIVITY_FAILURE');print('API_FAILURE='+str(e));return 2
if __name__=='__main__':sys.exit(main())
