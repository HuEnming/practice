from setting_language import setting_language
from initialize_driver import init_driver
from initialize_driver import login_mule
from editor import editor_in_zh
from monacoreact import monacoreact_in_zh
from workbook import workbook_in_zh
import pytest


class Test_mule:
    def setup__class(self):
        self.driver = init_driver()
        login_mule(self.driver)
        setting_language(self.driver)

    def setup(self):
        # self.driver = init_driver()
        # login_mule(self.driver)
        # setting_language(self.driver)
        self.driver.refresh()
    
    # def setting_language(self):

    def test_editor(self):
        editor_in_zh(self.driver)

    def test_monacoreact(self):
        monacoreact_in_zh(self.driver)

    def test_workbook(self):
        workbook_in_zh(self.driver)

    def teardown(self):
        self.driver.refresh()
        #self.driver.quit()

    def teardown__class(self):
        self.driver.close()
