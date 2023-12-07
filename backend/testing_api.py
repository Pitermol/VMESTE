import json

import requests

s = requests.Session()
f = open("logo192.png", "rb")

files = {'avatar': f}
print(f)
ans = s.post("http://localhost:3010/api/registration", headers={"Accept": "application/json",
                                                                "Content-Type": "application/json",
                                                                "authorization": "123qwe"},
             data=json.dumps({"email": "ppp@gmail.com", "login": "pppp", "password": "password123"}), files=files)
s.close()

print(ans.json())
