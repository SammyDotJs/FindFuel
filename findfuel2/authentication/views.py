from django.shortcuts import render

from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class RegisterNewUser(APIView):
    def post(self,request):
        username = request.data.get("username")
        email = request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        
        try:
            user  = User.objects.create_user(
                username = username,
                password = "random123",
                email = email,
                first_name = first_name,
                last_name= last_name,
            )
            user.set_password(password)
            user.save()
            print("{} created successfully".format(user.username))
            return Response({"message":"User created"})
        except:
            if User.objects.filter(username=username).exists():
                return Response({"message": "Username already taken"}, status=400)
            

class greeting(APIView):
    permission_classes = ( IsAuthenticated, )

    def get(self,request):
        content = {'message': 'Hello, {}!'.format(request.user.first_name)}
        return Response(content)