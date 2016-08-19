from __future__ import unicode_literals
import datetime
from decimal import Decimal

from django.db import models


class Report(models.Model):
    name = models.CharField(max_length=120)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    time_user = models.DateTimeField()  # what the user specified
    time_added = models.DateTimeField(auto_now_add=True)  # what the server had
    floor = models.IntegerField(default=0)
    message = models.TextField()

    @classmethod
    def create(cls, data):
        return cls.objects.create(
            name=data['name'],
            latitude=Decimal(data['latitude']),
            longitude=Decimal(data['longitude']),
            time_user=datetime.datetime.fromtimestamp(int(data['time_user'])),
            floor=int(data['floor']),
            message=data['message'],
        )
