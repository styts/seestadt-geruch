from django.conf.urls import url, include
from django.contrib import admin
from django.http import HttpResponse


def home(request):
    return HttpResponse('')


urlpatterns = [
    url(r'^$', home),
    url(r'^admin/', admin.site.urls),
    url(r'^smell/', include('geruch.urls'))
]
