from django.urls import path
from .views import NoteView, NoteDetailView

urlpatterns = [
    path('notes', NoteView.as_view(), name='notes'),
    path('notes/<slug:slug>', NoteDetailView.as_view(), name='notes-detail'),
]