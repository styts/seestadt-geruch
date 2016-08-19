from django.test import TestCase
from .models import Report
from decimal import Decimal


class ReportTestCase(TestCase):
    def test_create(self):
        report = Report.create({
            'name': 'Max',
            'latitude': '43.3434343',
            'longitude': '3.34343433',
            'time_user': '1234567891',
            'floor': '4',
            'message': 'Es riecht schrecklich!!!'
            })
        self.assertEqual(report.name, 'Max')
        self.assertEqual(report.latitude, Decimal('43.3434343'))
        self.assertEqual(report.longitude, Decimal('3.34343433'))
