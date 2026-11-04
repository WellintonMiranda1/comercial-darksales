"""Execute: python -m unittest discover -s tests -v"""
import unittest
from business_rules import commission_amount, contract_total, next_cycle, projected_renewal

class TestCommissions(unittest.TestCase):
    def test_monthly(self):
        self.assertEqual(commission_amount(29900, 1, .10), 2990)
    def test_semiannual_one_time(self):
        self.assertEqual(contract_total(29900, 6), 179400)
        self.assertEqual(commission_amount(29900, 6, .15), 26910)
    def test_annual_one_time(self):
        self.assertEqual(contract_total(29900, 12), 358800)
        self.assertEqual(commission_amount(29900, 12, .20), 71760)
    def test_decimal_rounding(self):
        self.assertEqual(commission_amount(1999, 1, .10), 200)

class TestCycles(unittest.TestCase):
    def test_monthly_thirty_days(self):
        self.assertEqual(next_cycle('2026-11-03', 'monthly'), '2026-12-03')
    def test_semiannual_calendar(self):
        self.assertEqual(next_cycle('2026-11-03', 'semiannual'), '2027-05-03')
    def test_annual_calendar(self):
        self.assertEqual(next_cycle('2026-11-03', 'annual'), '2027-11-03')
    def test_forecast(self):
        self.assertEqual(projected_renewal('2027-05-03', 'semiannual','2027-05-01','2027-06-01'), '2027-05-03')
        self.assertIsNone(projected_renewal('2027-05-03', 'semiannual','2027-06-01','2027-07-01'))

if __name__=='__main__':
    unittest.main()
