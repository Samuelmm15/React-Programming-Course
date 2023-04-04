# 29 lesson Notes

At this lesson, we are going to learn how to create a REST API using Django REST Framework.

At the first time, we need to create a .gitignore into de project folder of the backend, because we don't want to upload the virtual environment and the database to the repository. 
We need to add the important files, so we are going to create a .gitignore file and add the template from internet.

To obtain an example of gitignore templates we can go to [toptal-page](https://www.toptal.com/developers/gitignore) to generate an example of gitignore file.

At this time, we need to intall the framework, so at the directory of the backed, we install
the neccesary packages to create the REST API.

```bash
pip install django-rest-framework
```

To intall all the neccesary packages in the requirements.txt file, we can use the next command:

```bash
pip freeze > requirements.txt
```

To install all the packages into the new created virtual environment, we can use the next command:

```bash
pip install -r requirements.txt
```

## Starting the creation of the backed with Django

At the first time, we need to create a file called `model.py`. That is going to contain the models of the database.

When we coded the models, we need to create the migrations to create the database. To do that, we need to run the next command:

```bash
python manage.py makemigrations <<application-name>>
```

This gerates an error because we need to create the application. To do that, we need to go to the file `settings.py` and add the application to the `INSTALLED_APPS` list.

```python
INSTALLED_APPS = [
    '<<application-name>>'
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api'
]
```

To finish the creation of the database, we need to run the next command:

```bash
python manage.py migrate
```

**Second**, we need to add the path into the file `urls.py` to the application.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls'))
]
```

**Third**, we need to create a file called `views.py` to create the views of the application.
In this file, we need to use another new file that we are going to call `serializers.py` to create the serializers of the application.
