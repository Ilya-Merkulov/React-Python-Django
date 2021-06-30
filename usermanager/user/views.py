from user.models import Groups, User
from .serializers import GroupsSerializer, UserSerializer


from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse



# Create your views here.

@csrf_exempt
def group(request, id = 0):
    if request.method == 'GET':
        groups = Groups.objects.all()
        groups_serializer = GroupsSerializer(groups, many=True)
        return JsonResponse(groups_serializer.data, safe=False)

    elif request.method == 'POST':
        group_data = JSONParser().parse(request)
        group_serializer = GroupsSerializer(data=group_data)
        if group_serializer.is_valid():
            group_serializer.save()
            return JsonResponse("Group added", safe=False)
        return JsonResponse("Failed to add Group", safe=False)

    elif request.method == 'PUT':
        groups_data = JSONParser().parse(request)
        group = Groups.objects.get(id=groups_data['id'])
        group_serializer = GroupsSerializer(group, data=groups_data)
        if group_serializer.is_valid():
            group_serializer.save()
            return JsonResponse('Group updating!!', safe=False)
        return JsonResponse('Failed to update Group!!!', safe=False)

    elif request.method == "DELETE":
        group = Groups.object.get(id=id)
        group.delete()
        return JsonResponse('Delete!!', safe=False)



@csrf_exempt
def user(request, id=0):
    if request.method == 'GET':
        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("User added", safe=False)
        return JsonResponse("Failed to add User", safe=False)

    elif request.method == 'PUT':
        users_data = JSONParser().parse(request)
        user = User.objects.get(id=users_data['id'])
        user_serializer = UserSerializer(user, data=users_data)
        if  user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse('User updating!!', safe=False)
        return JsonResponse('Failed to update User!!!', safe=False)

    elif request.method == "DELETE":
        user = User.objects.get(id=id)
        user.delete()
        return JsonResponse('Delete!!', safe=False)




def index(request):
    return HttpResponse("<h1>hi</h1>")


def name(request):
    return HttpResponse("<h1>My name in Ilya</h1>")
