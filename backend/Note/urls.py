from django.urls import path
from .views import NoteView, NoteDetailView, SearchView, CustomTokenObtainPairView, CustomTokenRefreshView, LogoutView, RegisterView

urlpatterns = [
    path('notes', NoteView.as_view(), name='notes'),
    path('notes/<slug:slug>', NoteDetailView.as_view(), name='notes-detail'),
    path('search-notes/', SearchView.as_view(), name='search-notes'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/register/', RegisterView.as_view(), name='register'),
]