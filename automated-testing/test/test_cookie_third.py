from selenium import webdriver
import time
import json
import pickle

# 填写webdriver的保存目录
driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")

# 记得写完整的url 包括http和https
# driver.get("https://www.hackerrank.com/login")

# 程序打开网页后20秒内手动登陆账户
driver.get("file:///usr/local/home/u200601/Code/CS440/mule-system2/bin/login-test.html")
# driver.get("file:///home/enming/Code/CS440/mule-system2/bin/login-test.html")
driver.find_element_by_id("data").clear()
driver.find_element_by_id("data").send_keys(
    '{targetURL: "https://localhost/login", secret: "test_LTI_SECRET",oauth_consumer_key: "test_LTI_KEY",user_id: "1000",context_id: "1000",         lis_person_contact_email_primary: "some.user@email.ie", context_title: "Test Course Space (2018-19)",roles: "Instructor", tool_consumer_instance_guid: "2019.localhost", lis_person_name_full: "Some User", custom_role: "lecturer"} '
)
driver.find_element_by_id("testbutton").click()
driver.find_element_by_xpath("/html/body/button[2]").click()

driver.refresh()


with open("common/cookie/cookie.pkl", "w") as cookief:
    # 将cookies保存为json格式
    cookief.write(json.dumps(driver.get_cookies()))
# with open("common/cookie/cookie.pkl", "wb") as filehandler:
#     pickle.dump(driver.get_cookies(), filehandler)

time.sleep(2)

driver.close()

# 填写webdriver的保存目录
driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")

# 记得写完整的url 包括http和https
driver.get("https://localhost")

try:
    driver.find_element_by_id("details-button").click()
    driver.find_element_by_id("proceed-link").click()
except:
    print("no safty problem")
driver.get("https://localhost")
# 首先清除由于浏览器打开已有的cookies
driver.delete_all_cookies()

# with open("common/cookie/cookie.pkl", "r") as cookiesfile:
#     cookies = pickle.load(cookiesfile)
#     for cookie in cookies:
#         driver.add_cookie(cookie)
cookies = json.loads(open("common/cookie/cookie.pkl").read())
for cookie in cookies:
    print(cookie)
    driver.add_cookie(cookie)
# with open("common/cookie/cookie.pkl", "r") as cookief:
#     #使用json读取cookies 注意读取的是文件 所以用load而不是loads
#     cookieslist = json.load(cookief)

# 方法1 将expiry类型变为int
# for cookie in cookieslist:
#     #并不是所有cookie都含有expiry 所以要用dict的get方法来获取
#     if isinstance(cookie.get("expiry"), float):
#        cookie["expiry"] = int(cookie["expiry"])
#     driver.add_cookie(cookie)

# 方法2删除该字段
# for cookie in cookieslist:
#     # 该字段有问题所以删除就可以  浏览器打开后记得刷新页面 有的网页注入cookie后仍需要刷新一下
#     if "expiry" in cookie:
#         del cookie["expiry"]
#     driver.add_cookie(cookie)

driver.get("https://localhost/")
driver.refresh()


# Overview
# the reason cause login with cookie problem
# -not file format
# -not browser
# -driver close too quickly may cause get_cookies havn't finished
# -write and read method will effect the result w & r are allowed instead if wb & rb(on Ubuntu)
# -cookie life-circle will not effect the code
# -json.dumps and json.load are necessary
# -driver.delete_all_cookies() seometimes is needed



# setTimeout(function(){debugger},3000)