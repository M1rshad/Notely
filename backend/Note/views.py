from django.shortcuts import render, get_object_or_404
from .models import Note
from .serializers import NoteSerializer, UserRegistrationSerializer
from django.db.models import Q
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            # Call the parent class's post method
            response = super().post(request, *args, **kwargs)
            tokens = response.data 

            # Extract the access and refresh tokens
            access_token = tokens.get('access')
            refresh_token = tokens.get('refresh')

            # Create a new response object
            res = Response()
            res.data = {'success': True}

            # Set cookies for the access and refresh tokens
            if access_token:
                res.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=True,  # Set to False in development if using HTTP, True in production (HTTPS)
                    samesite='None',
                    path='/'
                )

            if refresh_token:
                res.set_cookie(
                    key='refresh_token',
                    value=refresh_token,
                    httponly=True,
                    secure=True,
                    samesite='None',
                    path='/'
                )
            return res
        
        except Exception as e:
            # Return a failure response in case of an error
            return Response({'success': False, 'error': str(e)}, status=400)
        

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data 
            access_token = tokens.get('access')
            
            res = Response()
            res.data = {'refresh': True}

            if access_token:
                res.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=True,  
                    samesite='None',
                    path='/'
                )


            return res

        except Exception as e:
            return Response({'refresh': False, 'error': str(e)}, status=400)
        

class LogoutView(APIView):
    def post(self, request):
        try:
            res =  Response()
            res.data = {'success': True}
            res.delete_cookie('access_token', path='/', samesite='None')
            res.delete_cookie('refresh_token', path='/', samesite='None')
            return res

        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=400)
        

class RegisterView(APIView):

    permission_classes=[AllowAny]

    def post(self, request):
        _data = request.data 
        serializer = UserRegistrationSerializer(data=_data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    

class NoteView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        notes = Note.objects.filter(user=request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request):
        _data = request.data 
        serializer = NoteSerializer(data=_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)


class NoteDetailView(APIView):
    def get(self, request, slug):
        note = get_object_or_404(Note, slug=slug)
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def put(self, request, slug):
        note = get_object_or_404(Note, slug=slug)
        _data = request.data
        serializer = NoteSerializer(note,data=_data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def delete(self, request, slug):
        note = get_object_or_404(Note, slug=slug)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SearchView(APIView):
    def get(self, request):
        query =  request.query_params.get("search")
        notes = Note.objects.filter(Q(title__icontains=query)|Q(body__icontains=query)|Q(category__icontains=query))
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)