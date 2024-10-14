from rest_framework import serializers
from .views import Note

class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = '__all__'