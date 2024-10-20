from django.shortcuts import render, get_object_or_404
from .models import Note
from .serializers import NoteSerializer
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class NoteView(APIView):
    def get(self, request):
        notes = Note.objects.all()
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