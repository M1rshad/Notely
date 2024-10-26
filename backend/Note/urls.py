from django.urls import path
from .views import NoteView, NoteDetailView, SearchView, CustomTokenObtainPairView, CustomTokenRefreshView, LogoutView, RegisterView

urlpatterns = [
    path('notes/', NoteView.as_view(), name='notes'),
    path('notes/<slug:slug>', NoteDetailView.as_view(), name='notes-detail'),
    path('search-notes/', SearchView.as_view(), name='search-notes'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
]