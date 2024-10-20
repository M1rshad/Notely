from django.urls import path
from .views import NoteView, NoteDetailView, SearchView

urlpatterns = [
    path('notes', NoteView.as_view(), name='notes'),
    path('notes/<slug:slug>', NoteDetailView.as_view(), name='notes-detail'),
    path('search-notes/', SearchView.as_view(), name='search-notes'),
]