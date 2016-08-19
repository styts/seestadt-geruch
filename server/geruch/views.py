from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Report


@csrf_exempt
def index(request):  # noqa
    if request.method == 'GET':
        # return list of all reports
        response = JsonResponse(list(Report.objects.all().values()),
                                safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'POST':
        Report.create(request.POST)
        response = JsonResponse({})
        response['Access-Control-Allow-Origin'] = '*'
        return response
