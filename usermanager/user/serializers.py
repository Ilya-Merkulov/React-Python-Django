from rest_framework import serializers
from user.models import Groups, User


class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = (
            'id',
            'GroupName',
            'GroupDescription')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'UserName',
            'GroupId',
            'DateOfCreating')
