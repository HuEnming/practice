from selenium import webdriver
import time
import json

# 填写webdriver的保存目录
driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")

# 记得写完整的url 包括http和https
driver.get("https://www.hackerrank.com/login")

# 程序打开网页后20秒内手动登陆账户
driver.find_element_by_xpath("//input[@id='input-1']").send_keys("infunig1986")
driver.find_element_by_xpath('//*[@id="input-2"]').send_keys("TestUserAccount")
driver.find_element_by_xpath(
    '//*[@id="content"]/div/div/div[2]/div[2]/div/div/div[2]/div/div/div[2]/div[1]/form/div[4]/button/div/span'
).click()

with open("common/cookie/testcookie.txt", "w") as cookief:
    # 将cookies保存为json格式
    cookief.write(json.dumps(driver.get_cookies()))

driver.close()

# 填写webdriver的保存目录
driver = webdriver.Firefox(executable_path="common/web_driver/geckodriver")

# 记得写完整的url 包括http和https
driver.get("https://www.hackerrank.com/settings/profile")
# 首先清除由于浏览器打开已有的cookies
driver.delete_all_cookies()

with open("common/cookie/testcookie.txt", "r") as cookief:
    # 使用json读取cookies 注意读取的是文件 所以用load而不是loads
    cookieslist = json.load(cookief)

    # 方法1 将expiry类型变为int
    for cookie in cookieslist:
        # 并不是所有cookie都含有expiry 所以要用dict的get方法来获取
        if isinstance(cookie.get("expiry"), float):
            cookie["expiry"] = int(cookie["expiry"])
        driver.add_cookie(cookie)

    # 方法2删除该字段
    # for cookie in cookieslist:
    #     #该字段有问题所以删除就可以  浏览器打开后记得刷新页面 有的网页注入cookie后仍需要刷新一下
    #     if 'expiry' in cookie:
    #         del cookie['expiry']
    #     driver.add_cookie(cookie)

driver.refresh()
